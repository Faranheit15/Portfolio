'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  HONEYPOT_FIELD,
  MIN_MESSAGE_WORDS,
  countWords,
} from '@/lib/contact-spam';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import Chat from '../svgs/Chat';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z
    .string()
    .min(10, {
      message: 'Phone number must be at least 10 characters.',
    })
    .regex(/^[\+]?[1-9][\d]{0,15}$/, {
      message: 'Please enter a valid phone number.',
    }),
  message: z
    .string()
    .min(10, {
      message: 'Message must be at least 10 characters.',
    })
    .max(1000, {
      message: 'Message must not exceed 1000 characters.',
    })
    .refine((message) => countWords(message) >= MIN_MESSAGE_WORDS, {
      message: 'Please write a few words about what you would like to discuss.',
    }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Archive the submission in Netlify Forms. This has to happen in the browser
 * and target the static public/__forms.html: Netlify only accepts form posts
 * to static files, and posts from the API route ran in a serverless function
 * that froze before they completed (and looked like server spam to Akismet).
 */
function submitToNetlifyForms(data: ContactFormValues, honeypot: string) {
  return fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'form-name': 'contact',
      ...data,
      [HONEYPOT_FIELD]: honeypot,
    }).toString(),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Netlify Forms responded ${response.status}`);
    }
  });
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Spam signals checked by /api/contact: bots fill the hidden honeypot and
  // submit far faster than a person can type.
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    const honeypot = honeypotRef.current?.value ?? '';

    // Runs alongside the Telegram delivery below; it's a backup archive, so a
    // failure is logged but doesn't change what the visitor sees.
    const netlifyArchive = submitToNetlifyForms(data, honeypot).catch((error) =>
      console.error('Netlify Forms submission failed:', error),
    );

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          [HONEYPOT_FIELD]: honeypot,
          fillTimeMs: startedAtRef.current
            ? Date.now() - startedAtRef.current
            : 0,
        }),
      });

      const result = await response.json();
      await netlifyArchive;

      if (response.ok) {
        toast.success('Message sent successfully!');
        form.reset();
        startedAtRef.current = Date.now();
      } else {
        toast.error(
          result.error || 'Failed to send message. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>Send me a message</CardTitle>
        <CardDescription>
          Fill out the form below and I will get back to you as soon as
          possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot: off-screen and skipped by keyboard and screen
                readers, so only bots fill it. */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
              <input
                ref={honeypotRef}
                id={HONEYPOT_FIELD}
                name={HONEYPOT_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (123) xxx-xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me about your project or just say hello..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-fit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending your message...
                </>
              ) : (
                <>
                  <Chat className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
