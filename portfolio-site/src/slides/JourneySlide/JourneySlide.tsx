import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { asset } from '../../lib/asset'
import './JourneySlide.css'

/**
 * 04 — User journey. Two storyboards from the field study, each a four-frame
 * arc from frustration to resolution: Maya (pain 03, app-hopping) and Ori
 * (pain 05, comparing from memory) — the two pains the app most directly
 * answers, tagged so the spine from slide 03 stays visible. Frames are the
 * artist's own illustrations; the last two frames of each arc are where
 * Trumpet enters (marked in gold).
 */
/** The shipped frame size (see scripts/optimize-images.mjs); the ratio is what
 *  the layout actually uses — .journey-slide__img sets the same one in CSS. */
const STORY_W = 1000
const STORY_H = 746

type Frame = { src: string; text: string; alt: string; trumpet?: boolean }
type Story = {
  who: string
  friction: string
  /** The research pain (slide 03) this arc dramatises — same tag as slides 10 and 11. */
  pain: string
  frames: Frame[]
}

const STORIES: Story[] = [
  {
    who: 'Maya',
    friction: 'Five apps, no overview',
    pain: '03',
    frames: [
      {
        src: '/story/story-1-1.webp',
        text: 'Maya hops between five apps just to see how her music is doing.',
        alt: 'Maya looks overwhelmed at a screen crowded with separate Spotify, YouTube and search windows, cursors darting between them.',
      },
      {
        src: '/story/story-1-2.webp',
        text: 'Hours vanish gathering and cross-checking the numbers by hand.',
        alt: 'Maya buried in manual data-gathering, copying figures between windows and a spreadsheet.',
      },
      {
        src: '/story/story-1-3.webp',
        text: 'With Trumpet, every channel lands in one real-time view.',
        alt: 'Maya smiling at a single unified dashboard showing one upward trend chart.',
        trumpet: true,
      },
      {
        src: '/story/story-1-4.webp',
        text: 'An instant, clear picture — time and headspace back for the music.',
        alt: 'Maya relaxed and confident, free to focus on creating and promoting her music.',
        trumpet: true,
      },
    ],
  },
  {
    who: 'Ori',
    friction: 'Comparing from memory',
    pain: '05',
    frames: [
      {
        src: '/story/story-2-1.webp',
        text: 'Ori wants to know how his new release stacks up against the last.',
        alt: 'Ori at his studio desk wondering how his new release compares with his previous one.',
      },
      {
        src: '/story/story-2-2.webp',
        text: 'He compares by hand, from memory — the patterns stay hidden.',
        alt: 'Ori comparing track numbers manually, relying on memory, unsure of the trend.',
      },
      {
        src: '/story/story-2-3.webp',
        text: 'With Trumpet, he stacks releases side by side for a direct read.',
        alt: 'Ori pleased, viewing a Trumpet dashboard comparing “Last Single” at 300 streams and “New Song” at 7,500 streams side by side.',
        trumpet: true,
      },
      {
        src: '/story/story-2-4.webp',
        text: 'Clear insight over guesswork — tangible proof of what worked.',
        alt: 'Ori confident, reading a clear side-by-side comparison of his releases.',
        trumpet: true,
      },
    ],
  },
]

export function JourneySlide() {
  return (
    <div className="container container--wide journey-slide">
      <div className="container journey-slide__head">
        <ChapterHeader
          no="04"
          title="From frustration to resolution"
          lede="Two artists, two everyday frictions from the research — and the frame where Trumpet changes each story."
        />
      </div>

      {STORIES.map((story) => (
        <section className="journey-slide__story" key={story.who}>
          <div className="journey-slide__story-head">
            <h3 className="journey-slide__who">{story.who}</h3>
            <span className="journey-slide__friction">{story.friction}</span>
            <span className="journey-slide__pain tnum">Pain {story.pain}</span>
          </div>

          <RevealGroup className="journey-slide__frames" stagger={0.06} amount={0.2}>
            {story.frames.map((f, i) => (
              <Reveal
                as="figure"
                className={`journey-slide__frame${f.trumpet ? ' journey-slide__frame--trumpet' : ''}`}
                key={f.src}
              >
                <div className="journey-slide__img">
                  <img
                    src={asset(f.src)}
                    alt={f.alt}
                    width={STORY_W}
                    height={STORY_H}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="journey-slide__cap">
                  <span className="journey-slide__cap-no tnum">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {f.text}
                </figcaption>
              </Reveal>
            ))}
          </RevealGroup>
        </section>
      ))}
    </div>
  )
}
