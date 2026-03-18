import { systemPrompt } from '@/config/ChatPrompt';
import { createParser } from 'eventsource-parser';
import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const GEMINI_MODELS = [
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
];

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        parts: z.array(z.object({ text: z.string() })),
      }),
    )
    .optional()
    .default([]),
});

function sanitizeInput(input: string): string {
  const injectionPatterns = [
    /ignore previous instructions/gi,
    /system prompt/gi,
    /you are now/gi,
    /act as/gi,
    /pretend to be/gi,
    /ignore all previous/gi,
    /forget everything/gi,
    /new instructions/gi,
    /override/gi,
    /bypass/gi,
    /hack/gi,
    /exploit/gi,
    /inject/gi,
    /prompt injection/gi,
    /system message/gi,
    /role play/gi,
    /character/gi,
    /persona/gi,
    /behave as/gi,
    /respond as/gi,
  ];

  let sanitized = input;
  injectionPatterns.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, '[REDACTED]');
  });
  sanitized = sanitized.trim().replace(/\s+/g, ' ');
  if (sanitized.length > 2000) sanitized = sanitized.substring(0, 2000);
  return sanitized;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIP) return realIP;
  if (cfConnectingIP) return cfConnectingIP;
  return 'unknown';
}

function checkRateLimit(clientIP: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  clientData.count++;
  rateLimitStore.set(clientIP, clientData);
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
  };
}

async function tryGeminiModel(
  model: string,
  apiKey: string,
  requestBody: object,
): Promise<Response | null> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) return response;
    console.warn(`Gemini model ${model} returned ${response.status}, trying next...`);
    return null;
  } catch (err) {
    console.warn(`Gemini model ${model} fetch error:`, err);
    return null;
  }
}

async function streamGeminiResponse(
  response: Response,
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
): Promise<void> {
  const parser = createParser({
    onEvent: (event) => {
      try {
        const data = JSON.parse(event.data);
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
          );
        }
      } catch {
        // skip unparseable events
      }
    },
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    parser.feed(decoder.decode(value));
  }
}

async function streamGroqResponse(
  groq: Groq,
  messages: Groq.Chat.ChatCompletionMessageParam[],
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder,
): Promise<void> {
  const chatStream = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    max_tokens: 512,
    temperature: 0.7,
    stream: true,
  });

  for await (const chunk of chatStream) {
    const text = chunk.choices[0]?.delta?.content ?? '';
    if (text) {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ text })}\n\n`),
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: RATE_LIMIT_WINDOW / 1000,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        },
      );
    }

    const body = await request.json();
    const validatedData = chatSchema.parse(body);
    const sanitizedMessage = sanitizeInput(validatedData.message);

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!geminiApiKey && !groqApiKey) {
      console.error('No AI API keys configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 },
      );
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let handled = false;

          // --- Try Gemini models in order ---
          if (geminiApiKey) {
            const geminiRequestBody = {
              contents: [
                {
                  parts: [{ text: systemPrompt }],
                  role: 'user',
                },
                {
                  parts: [
                    {
                      text: 'I understand. I will act as your portfolio assistant.',
                    },
                  ],
                  role: 'model',
                },
                ...validatedData.history.map((msg) => ({
                  role: msg.role,
                  parts: msg.parts.map((part) => ({
                    text:
                      msg.role === 'user'
                        ? sanitizeInput(part.text)
                        : part.text,
                  })),
                })),
                {
                  parts: [{ text: sanitizedMessage }],
                  role: 'user',
                },
              ],
              generationConfig: {
                maxOutputTokens: 512,
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
              },
            };

            for (const model of GEMINI_MODELS) {
              const geminiResponse = await tryGeminiModel(
                model,
                geminiApiKey,
                geminiRequestBody,
              );
              if (geminiResponse) {
                console.log(`Using Gemini model: ${model}`);
                await streamGeminiResponse(
                  geminiResponse,
                  controller,
                  encoder,
                );
                handled = true;
                break;
              }
            }
          }

          // --- Fall back to Groq ---
          if (!handled) {
            if (!groqApiKey) {
              throw new Error(
                'All Gemini models failed and GROQ_API_KEY is not set',
              );
            }
            console.log('Falling back to Groq');
            const groq = new Groq({ apiKey: groqApiKey });
            const groqMessages: Groq.Chat.ChatCompletionMessageParam[] = [
              { role: 'system', content: systemPrompt },
              ...validatedData.history.map((msg) => ({
                role: (msg.role === 'model' ? 'assistant' : 'user') as
                  | 'user'
                  | 'assistant',
                content: msg.parts
                  .map((p) =>
                    msg.role === 'user' ? sanitizeInput(p.text) : p.text,
                  )
                  .join(''),
              })),
              { role: 'user', content: sanitizedMessage },
            ];
            await streamGroqResponse(groq, groqMessages, controller, encoder);
          }

          controller.enqueue(encoder.encode('data: {"done": true}\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`,
            ),
          );
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
