// Astro's `base` config isn't automatically applied to hardcoded href/src strings in
// templates -- only to Astro's own routing/asset URLs. This threads it through by hand
// via Astro's auto-populated `import.meta.env.BASE_URL`, so switching hosts (subpath vs.
// domain root) is a single env var change (BASE_PATH), not a per-file edit.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
