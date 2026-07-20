/**
 * One-off dev script: re-encode the raw compare walkthrough into a
 * scrub-friendly mp4 (dense keyframes so scroll-driven currentTime seeks are
 * smooth, muted, faststart for streaming). The output is committed; this only
 * needs re-running when the source video changes.
 *
 *   npm run encode:video
 */
import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import ffmpeg from 'ffmpeg-static'

const root = path.dirname(fileURLToPath(import.meta.url))
const input = path.resolve(root, '../../Images/Videos/trumpet_compare.mp4')
const output = path.resolve(root, '../public/video/trumpet-compare-scrub.mp4')

// -g 12 @ 30fps = a keyframe every 0.4s; -sc_threshold 0 keeps the cadence
// exact. If scrubbing still stutters, drop to -g 6 and accept the size bump.
const args = [
  '-y',
  '-i', input,
  '-an',
  '-vf', 'scale=1440:-2:flags=lanczos,fps=30',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '23',
  '-pix_fmt', 'yuv420p',
  '-g', '12',
  '-keyint_min', '12',
  '-sc_threshold', '0',
  '-movflags', '+faststart',
  output,
]

console.log(`Encoding\n  ${input}\n→ ${output}\n`)
execFileSync(ffmpeg, args, { stdio: 'inherit' })

const mb = statSync(output).size / 1024 / 1024
console.log(`\nDone — ${mb.toFixed(1)} MB${mb > 10 ? '  ⚠ over the 10 MB budget: retry with crf 25 or scale=1280' : ''}`)
