/**
 * Resolves a public-folder path against Vite's configured base path.
 * Use for any `/screens/...`, `/process/...`, `/video/...`, `/images/...` reference
 * written outside index.html — Vite only rewrites `base` automatically for
 * paths it parses at build time (index.html, imported assets), not for raw
 * strings in JSX. Without this, absolute paths 404 whenever the site is
 * deployed under a subpath (e.g. GitHub Pages project sites).
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
