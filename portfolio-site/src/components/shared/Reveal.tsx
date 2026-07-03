import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Shared scroll-entrance primitives so every section moves with the same
 * rhythm: fade + 20px Y-translate, design.md's snappy easing, fired once when
 * scrolled into view. Under prefers-reduced-motion the variants collapse to an
 * instant, in-place show (content is never hidden from reduced-motion users).
 *
 *   <RevealGroup>            // staggers its <Reveal> children
 *     <Reveal>…</Reveal>
 *     <Reveal>…</Reveal>
 *   </RevealGroup>
 *
 * A standalone <Reveal> also animates on its own if not inside a group.
 */

const EASE = [0.25, 1, 0.5, 1] as const
const DISTANCE = 20

type El = keyof HTMLElementTagNameMap

export function RevealGroup({
  children,
  as = 'div',
  className,
  stagger = 0.08,
  amount = 0.3,
  ...rest
}: {
  children: ReactNode
  as?: El
  className?: string
  stagger?: number
  amount?: number
} & Record<string, unknown>) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div']

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : stagger },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function Reveal({
  children,
  as = 'div',
  className,
  standalone = false,
  amount = 0.4,
  ...rest
}: {
  children: ReactNode
  as?: El
  className?: string
  /** Set when this Reveal is NOT inside a RevealGroup, so it triggers itself. */
  standalone?: boolean
  amount?: number
} & Record<string, unknown>) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as 'div']

  const item: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: DISTANCE },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  }

  const triggerProps = standalone
    ? { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, amount } }
    : {}

  return (
    <MotionTag className={className} variants={item} {...triggerProps} {...rest}>
      {children}
    </MotionTag>
  )
}
