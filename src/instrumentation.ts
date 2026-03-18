export async function register() {
  // Bun defines `window = globalThis` server-side, which causes libraries like
  // next-themes to skip their SSR guard and call localStorage.getItem — but
  // Bun's built-in localStorage polyfill is broken (no valid file path).
  // Patch it with a no-op implementation so SSR doesn't crash.
  if (
    typeof localStorage !== 'undefined' &&
    typeof localStorage.getItem !== 'function'
  ) {
    const noopStorage: Storage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    };
    Object.defineProperty(globalThis, 'localStorage', {
      value: noopStorage,
      writable: true,
      configurable: true,
    });
  }
}
