import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import mapDots from '../../data/worldMapDots.json'
import './ConstellationField.css'

/**
 * The site's one WebGL moment — ambient, not choreographed. A faint field of
 * gold points seeded from Trumpet's OWN world-map dataset (the Audience
 * screen's dot map), loosened into an organic starfield: each point is
 * jittered off the source lattice, given random depth (so nearer points
 * render larger), its own brightness and drift rhythm. Points ease away from
 * the cursor and settle back.
 *
 * Rules it obeys:
 *  - prefers-reduced-motion → the component never mounts (see Opening.tsx).
 *  - touch devices → drift only, no pointer force, half the points.
 *  - delta-time animation (identical at 60Hz and 144Hz), no THREE.Clock.
 *  - full disposal on unmount.
 */
const GOLD = new THREE.Color('#e3b53a') // --main

/** Soft round sprite so points render as faint glows, not squares. */
function makeSprite(): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.5, 'rgba(255,255,255,0.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

export function ConstellationField() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const source: number[][] = mapDots.points
    // Thin the lattice (it's dense) — more aggressively on touch devices.
    const points = source.filter((_, i) => i % (coarse ? 3 : 2) === 0)
    const count = points.length

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    host.appendChild(renderer.domElement)

    // Seed positions from the 0–100 map space onto a wide plane (≈2:1),
    // biased right so the headline column stays quiet. The jitter is what
    // dissolves the source grid into something organic — the world-map
    // silhouette survives only as a loose density pattern.
    const MAP_W = 19
    const MAP_H = 10.5
    const OFFSET_X = 2.2
    const base = new Float32Array(count * 3)
    const phase = new Float32Array(count * 2)
    const speed = new Float32Array(count * 2)
    const amp = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const [mx, my] = points[i]
      base[i * 3] = (mx / 100 - 0.5) * MAP_W + OFFSET_X + (Math.random() - 0.5) * 1.1
      base[i * 3 + 1] = (0.5 - my / 100) * MAP_H + (Math.random() - 0.5) * 1.1
      base[i * 3 + 2] = (Math.random() - 0.5) * 5 // depth → natural size variety
      phase[i * 2] = Math.random() * Math.PI * 2
      phase[i * 2 + 1] = Math.random() * Math.PI * 2
      speed[i * 2] = 0.15 + Math.random() * 0.35
      speed[i * 2 + 1] = 0.15 + Math.random() * 0.35
      amp[i] = 0.04 + Math.random() * 0.08
      // Per-point brightness so the field shimmers instead of reading flat.
      const b = 0.35 + Math.random() * 0.75
      colors[i * 3] = GOLD.r * b
      colors[i * 3 + 1] = GOLD.g * b
      colors[i * 3 + 2] = GOLD.b * b
    }
    const positions = new Float32Array(base)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const texture = makeSprite()
    const material = new THREE.PointsMaterial({
      size: 0.11,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    scene.add(new THREE.Points(geometry, material))

    // Visible world-plane extents at z=0 — needed to convert cursor px → units.
    let halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
    let halfW = halfH
    const setSize = () => {
      const { clientWidth: w, clientHeight: h } = host
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
      halfW = halfH * camera.aspect
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(host)

    // Cursor in world units; parked far away until the pointer moves.
    const cursor = { x: 1e6, y: 1e6 }
    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      cursor.x = ((e.clientX - r.left) / r.width - 0.5) * 2 * halfW
      cursor.y = (0.5 - (e.clientY - r.top) / r.height) * 2 * halfH
    }
    const onPointerLeave = () => {
      cursor.x = 1e6
      cursor.y = 1e6
    }
    if (!coarse) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
    }

    // Per-point eased displacement away from the cursor. Quadratic falloff so
    // the effect breathes at the edges instead of switching on.
    const dispX = new Float32Array(count)
    const dispY = new Float32Array(count)
    const RADIUS = 2.8
    const PUSH = 0.5

    const pos = geometry.attributes.position as THREE.BufferAttribute
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const t = now / 1000
      const ease = 1 - Math.exp(-5 * dt)

      for (let i = 0; i < count; i++) {
        const bx = base[i * 3]
        const by = base[i * 3 + 1]

        let tx = 0
        let ty = 0
        const dx = bx - cursor.x
        const dy = by - cursor.y
        const d2 = dx * dx + dy * dy
        if (d2 < RADIUS * RADIUS) {
          const d = Math.sqrt(d2) || 0.0001
          const falloff = 1 - d / RADIUS
          const f = falloff * falloff * PUSH
          tx = (dx / d) * f
          ty = (dy / d) * f
        }
        dispX[i] += (tx - dispX[i]) * ease
        dispY[i] += (ty - dispY[i]) * ease

        pos.setXY(
          i,
          bx + dispX[i] + Math.sin(t * speed[i * 2] + phase[i * 2]) * amp[i],
          by + dispY[i] + Math.cos(t * speed[i * 2 + 1] + phase[i * 2 + 1]) * amp[i],
        )
      }
      pos.needsUpdate = true

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (!coarse) {
        window.removeEventListener('pointermove', onPointerMove)
        document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      }
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
      host.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={hostRef} className="constellation" aria-hidden="true" />
}
