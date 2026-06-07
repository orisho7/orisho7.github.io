<template>
  <canvas ref="canvasRef" class="particle-canvas" aria-hidden="true" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  isDark: { type: Boolean, default: false },
})

const canvasRef = ref(null)

/* ─── Depth layers ───────────────────────────────────────── */
// More stars across all layers, varied sizes for true depth
const LAYERS = [
  // 0: deep-field micro-dust  (1px, barely visible, very slow)
  { count: 180, size: [1, 1], opacity: [0.02, 0.08], speed: [0.0005, 0.0014], returnSpeed: 0.012, friction: 0.92 },
  // 1: background field stars (1-2px, slow drift)
  { count: 110, size: [1, 2], opacity: [0.04, 0.14], speed: [0.0010, 0.0026], returnSpeed: 0.022, friction: 0.89 },
  // 2: mid stars — cross shape (2-3px)
  { count:  60, size: [2, 3], opacity: [0.06, 0.20], speed: [0.0015, 0.0036], returnSpeed: 0.030, friction: 0.86 },
  // 3: foreground bright stars — 4-point (3-5px, glow in dark)
  { count:  28, size: [3, 5], opacity: [0.10, 0.30], speed: [0.0018, 0.0045], returnSpeed: 0.038, friction: 0.83 },
  // 4: accent hero stars — large 4-point with strong glow
  { count:  10, size: [5, 7], opacity: [0.15, 0.40], speed: [0.0008, 0.0018], returnSpeed: 0.018, friction: 0.90 },
]

const MOUSE_REPEL_RADIUS  = 145
const MOUSE_REPEL_FORCE   = 0.07
const MOUSE_ATTRACT_OUTER = 280
const MOUSE_ATTRACT_FORCE = 0.010
const MAX_RIPPLES = 10

let ripples      = []
let prevMouseX   = 0
let prevMouseY   = 0
let ctx          = null
let width        = 0
let height       = 0
let rafId        = null
let particles    = []
let mouse        = { x: -9999, y: -9999 }
let dpr          = 1

/* ─── Color helpers — read once per frame via prop ───────── */
function starRgb()    { return props.isDark ? '220,230,255' : '10,10,22' }
function rippleRgb()  { return props.isDark ? '180,200,255' : '10,10,22' }
function glowRgb()    { return props.isDark ? '180,200,255' : '30,30,60' }

/* ─── Particle factory ───────────────────────────────────── */
function createParticle(layer) {
  const x    = Math.random() * width
  const y    = Math.random() * height
  const size = layer.size[0] + Math.random() * (layer.size[1] - layer.size[0])

  return {
    x, y, ox: x, oy: y,
    vx: 0, vy: 0,
    size,
    baseOpacity:   layer.opacity[0] + Math.random() * (layer.opacity[1] - layer.opacity[0]),
    // twinkle — each star pulses independently
    twinklePhase:  Math.random() * Math.PI * 2,
    twinkleFreq:   0.0003 + Math.random() * 0.0014,
    twinkleAmp:    0.25 + Math.random() * 0.5,
    // drift
    phaseX:        Math.random() * Math.PI * 2,
    phaseY:        Math.random() * Math.PI * 2,
    freqX:         layer.speed[0] + Math.random() * (layer.speed[1] - layer.speed[0]),
    freqY:         layer.speed[0] + Math.random() * (layer.speed[1] - layer.speed[0]),
    returnSpeed:   layer.returnSpeed,
    friction:      layer.friction,
  }
}

function initParticles() {
  particles = []
  for (const layer of LAYERS) {
    for (let j = 0; j < layer.count; j++) {
      particles.push(createParticle(layer))
    }
  }
}

/* ─── Resize ─────────────────────────────────────────────── */
function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  dpr    = Math.min(window.devicePixelRatio || 1, 2)
  width  = canvas.clientWidth
  height = canvas.clientHeight
  canvas.width  = width  * dpr
  canvas.height = height * dpr
  ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  particles.forEach(p => { p.x = p.ox = Math.random() * width; p.y = p.oy = Math.random() * height })
}

/* ─── Ripple ─────────────────────────────────────────────── */
function emitRipple(x, y, strength) {
  if (ripples.length >= MAX_RIPPLES) ripples.shift()
  ripples.push({ x, y, radius: 0, maxRadius: 90 + strength * 130, strength, life: 1 })
}

/* ─── Star drawing ───────────────────────────────────────── */
// Draws a genuine star shape scaled to the particle's size.
// size < 1.5 → single pixel
// 1.5–2.5   → tiny cross (3×1 + 1×3)
// 2.5+      → 4-point star path with optional glow in dark mode

function drawStar(cx, cy, size, opacity) {
  const dark = props.isDark
  ctx.fillStyle = `rgba(${starRgb()},${opacity})`

  if (size < 1.5) {
    // --- single bright pixel ---
    ctx.fillRect(Math.round(cx - 0.5), Math.round(cy - 0.5), 1, 1)
    return
  }

  if (size < 2.5) {
    // --- tiny cross / + ---
    const x = Math.round(cx)
    const y = Math.round(cy)
    ctx.fillRect(x - 1, y,     3, 1)  // horizontal
    ctx.fillRect(x,     y - 1, 1, 3)  // vertical
    return
  }

  // --- 4-point star with narrow waist ---
  const outerR = size * 1.9
  const innerR = size * 0.28
  const spikes = 4

  // Glow halo in dark mode for larger stars
  if (dark && opacity > 0.22) {
    ctx.shadowBlur  = outerR * (size > 4 ? 4.5 : 3)
    ctx.shadowColor = `rgba(${glowRgb()},${Math.min(opacity * 0.7, 0.6)})`
  }

  ctx.beginPath()
  for (let i = 0; i < spikes * 2; i++) {
    const r     = i % 2 === 0 ? outerR : innerR
    const angle = (i * Math.PI / spikes) - Math.PI / 2
    if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
    else          ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
  }
  ctx.closePath()
  ctx.fill()

  // Reset shadow after each draw (cheap)
  if (dark) {
    ctx.shadowBlur  = 0
    ctx.shadowColor = 'transparent'
  }
}

/* ─── Animation loop ─────────────────────────────────────── */
function loop(ts) {
  rafId = requestAnimationFrame(loop)
  ctx.clearRect(0, 0, width, height)

  // ── Ripple rings ──
  const rCol = rippleRgb()
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i]
    r.radius += 3.2
    r.life   -= 0.022
    if (r.life <= 0 || r.radius > r.maxRadius) { ripples.splice(i, 1); continue }
    ctx.beginPath()
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${rCol},${r.life * r.strength * (props.isDark ? 0.18 : 0.07)})`
    ctx.lineWidth   = 0.6
    ctx.stroke()
  }

  // ── Stars ──
  for (const p of particles) {
    // drift
    p.ox += Math.cos(ts * p.freqX + p.phaseX) * p.freqX * 5
    p.oy += Math.sin(ts * p.freqY + p.phaseY) * p.freqY * 5
    if (p.ox < -80) p.ox = width  + 80
    if (p.ox > width  + 80) p.ox = -80
    if (p.oy < -80) p.oy = height + 80
    if (p.oy > height + 80) p.oy = -80

    // mouse forces
    const dx   = p.x - mouse.x
    const dy   = p.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < MOUSE_REPEL_RADIUS && dist > 0.5) {
      const t = 1 - dist / MOUSE_REPEL_RADIUS
      p.vx += (dx / dist) * t * MOUSE_REPEL_FORCE * 14
      p.vy += (dy / dist) * t * MOUSE_REPEL_FORCE * 14
    } else if (dist < MOUSE_ATTRACT_OUTER && dist > MOUSE_REPEL_RADIUS) {
      const t = 1 - (dist - MOUSE_REPEL_RADIUS) / (MOUSE_ATTRACT_OUTER - MOUSE_REPEL_RADIUS)
      p.vx -= (dx / dist) * t * MOUSE_ATTRACT_FORCE * 5
      p.vy -= (dy / dist) * t * MOUSE_ATTRACT_FORCE * 5
    }

    // ripple shell forces
    for (const r of ripples) {
      const rdx   = p.x - r.x
      const rdy   = p.y - r.y
      const rdist = Math.sqrt(rdx * rdx + rdy * rdy)
      const shell = Math.abs(rdist - r.radius)
      if (shell < 24 && rdist > 0.5) {
        const push = (1 - shell / 24) * r.life * r.strength * 0.5
        p.vx += (rdx / rdist) * push
        p.vy += (rdy / rdist) * push
      }
    }

    // spring + friction
    p.vx += (p.ox - p.x) * p.returnSpeed
    p.vy += (p.oy - p.y) * p.returnSpeed
    p.vx *= p.friction
    p.vy *= p.friction
    p.x  += p.vx
    p.y  += p.vy

    // twinkle
    const tw  = 0.5 + p.twinkleAmp * (0.5 + 0.5 * Math.sin(ts * p.twinkleFreq + p.twinklePhase))
    const opa = Math.min(p.baseOpacity * tw, props.isDark ? 0.90 : 0.60)

    drawStar(p.x, p.y, p.size, opa)
  }
}

/* ─── Mouse / touch ──────────────────────────────────────── */
function onMouseMove(e) {
  const vdx = e.clientX - prevMouseX
  const vdy = e.clientY - prevMouseY
  const vel = Math.sqrt(vdx * vdx + vdy * vdy)
  if (vel > 20) emitRipple(e.clientX, e.clientY, Math.min(vel / 55, 1))
  prevMouseX = e.clientX
  prevMouseY = e.clientY
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onMouseLeave()  { mouse.x = -9999; mouse.y = -9999 }
function onTouchMove(e)  { if (e.touches.length) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY } }
function onTouchEnd()    { mouse.x = -9999; mouse.y = -9999 }

/* ─── Lifecycle ──────────────────────────────────────────── */
onMounted(() => {
  resize()
  initParticles()
  rafId = requestAnimationFrame(loop)
  window.addEventListener('resize',     resize,       { passive: true })
  window.addEventListener('mousemove',  onMouseMove,  { passive: true })
  window.addEventListener('mouseleave', onMouseLeave, { passive: true })
  window.addEventListener('touchmove',  onTouchMove,  { passive: true })
  window.addEventListener('touchend',   onTouchEnd,   { passive: true })
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize',     resize)
  window.removeEventListener('mousemove',  onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('touchmove',  onTouchMove)
  window.removeEventListener('touchend',   onTouchEnd)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
