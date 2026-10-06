// Deterministic gradient picked from the title so each card always gets the
// same colours across renders and page loads.
const GRADIENTS = [
  'from-violet-600 via-purple-600 to-indigo-700',
  'from-blue-600 via-cyan-500 to-teal-600',
  'from-emerald-500 via-teal-500 to-cyan-600',
  'from-rose-500 via-pink-500 to-fuchsia-600',
  'from-amber-500 via-orange-500 to-red-600',
  'from-indigo-600 via-blue-500 to-sky-600',
  'from-fuchsia-600 via-violet-500 to-purple-700',
  'from-teal-500 via-emerald-500 to-green-600',
] as const;

function gradientForTitle(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0; // convert to 32-bit int
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

/** Image fallback: a title-seeded gradient with the first letter as an anchor. */
export function TitleGradient({ title }: { title: string }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradientForTitle(title)} flex h-full w-full items-center justify-center`}
    >
      <span className="text-7xl font-black text-white/20 select-none">
        {title.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
