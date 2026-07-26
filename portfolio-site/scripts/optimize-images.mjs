/**
 * One-off dev script: re-encode the deck's stills as WebP at the size they are
 * actually displayed at. The output is committed; re-run it only when a source
 * export changes.
 *
 *   npm run optimize:images
 *
 * Why: the mockups come out of the design tool at 3456x1944. That is 6.7
 * megapixels a piece, and a browser decodes each one to ~27MB of bitmap before
 * it can paint a 1138px-wide frame — eight of those is ~200MB of decode work
 * that no connection speed helps with. Downscaling to the largest size the
 * layout can ask for (plus headroom for a 2x display) is the fix; WebP is the
 * bonus on top.
 *
 * Widths below are derived from the CSS, not guessed:
 *   screens    the runway frame caps at min(100%, (100svh - 260px) * 16/9),
 *              which tops out at the 1376px content width -> 2048 covers it.
 *   wireframes .wf-frame is min(58vw, 720px, height-derived) -> 1440 is 2x.
 *   story      four frames across 1376px is ~322px each -> 1000 is >2x.
 *   details    already small and shown near 1:1; format only, no resize.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync, unlinkSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import ffmpeg from 'ffmpeg-static'

const root = path.dirname(fileURLToPath(import.meta.url))
const pub = path.resolve(root, '../public')

/** @type {{dir: string, match: RegExp, width: number | null, quality: number}[]} */
const JOBS = [
  // The money shots — the fidelity budget goes here.
  { dir: 'screens', match: /^(overview|music|track-drawer|audience)\.png$/, width: 2048, quality: 85 },
  // Detail crops and the compare poster: shown near their natural size.
  { dir: 'screens', match: /^(detail-.*|compare-empty)\.png$/, width: null, quality: 88 },
  // Grey boxes compress to nothing; they only have to stay legible.
  { dir: 'process', match: /\.png$/, width: 1440, quality: 82 },
  // Illustrations — soft gradients, so they take a lower quality without it showing.
  { dir: 'story', match: /\.jpg$/, width: 1000, quality: 80 },
]

let before = 0
let after = 0

for (const job of JOBS) {
  const dir = path.join(pub, job.dir)
  for (const file of readdirSync(dir).filter((f) => job.match.test(f))) {
    const input = path.join(dir, file)
    const output = path.join(dir, file.replace(/\.(png|jpg)$/, '.webp'))

    const filters = job.width ? ['-vf', `scale=${job.width}:-2:flags=lanczos`] : []
    execFileSync(
      ffmpeg,
      [
        '-y', '-loglevel', 'error',
        '-i', input,
        ...filters,
        '-c:v', 'libwebp',
        '-quality', String(job.quality),
        '-compression_level', '6',
        '-preset', 'picture',
        '-frames:v', '1',
        output,
      ],
      { stdio: 'inherit' },
    )

    const inKB = statSync(input).size / 1024
    const outKB = statSync(output).size / 1024
    before += inKB
    after += outKB
    console.log(
      `${job.dir}/${file.padEnd(34)} ${Math.round(inKB).toString().padStart(5)} KB → ` +
        `${Math.round(outKB).toString().padStart(4)} KB`,
    )

    // The source export stays in Images/ (and in git history); the deck only
    // ever ships the WebP.
    unlinkSync(input)
  }
}

console.log(
  `\nTotal ${Math.round(before)} KB → ${Math.round(after)} KB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`,
)
