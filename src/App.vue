<template>
  <div class="app-root" :class="{ dark: isDark }" role="main">

    <!-- Particle layer — always behind everything -->
    <ParticleCanvas :isDark="isDark" />

    <!-- Dark mode toggle -->
    <button
      id="theme-toggle"
      class="theme-toggle"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggleDark"
    >
      <span class="toggle-icon" aria-hidden="true">{{ isDark ? '○' : '●' }}</span>
    </button>

    <!-- Single animated viewport -->
    <div class="viewport" aria-live="polite" aria-atomic="true">
      <TransitionGroup
        name="section"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <component
          :is="currentComponent"
          :key="activeSection"
          class="section-wrapper"
          :data-section="activeSection"
        />
      </TransitionGroup>
    </div>

    <!-- Navigation -->
    <NavBar
      :active-section="activeSection"
      :nav-items="NAV_ITEMS"
      @navigate="navigateTo"
    />

    <!-- Section position dots -->
    <div class="position-dots" aria-hidden="true">
      <span
        v-for="item in NAV_ITEMS"
        :key="item.id"
        class="dot"
        :class="{ 'dot--active': activeSection === item.id }"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

import ParticleCanvas      from './components/ParticleCanvas.vue'
import NavBar              from './components/NavBar.vue'
import HomeSection         from './components/HomeSection.vue'
import ProjectsSection     from './components/ProjectsSection.vue'
import SkillsSection       from './components/SkillsSection.vue'
import ExperienceSection   from './components/ExperienceSection.vue'
import ContactSection      from './components/ContactSection.vue'

/* ─── Nav config ─────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'home',       label: 'Home'       },
  { id: 'projects',   label: 'Projects'   },
  { id: 'skills',     label: 'Skills'     },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact'    },
]

const SECTION_MAP = {
  home:       HomeSection,
  projects:   ProjectsSection,
  skills:     SkillsSection,
  experience: ExperienceSection,
  contact:    ContactSection,
}

/* ─── Dark mode ──────────────────────────────────────────── */
const isDark = ref(false)

function applyTheme(dark) {
  isDark.value = dark
  localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light')
}

function toggleDark() {
  applyTheme(!isDark.value)
}

/* ─── Section state ──────────────────────────────────────── */
const activeSection = ref('home')
const direction     = ref(1)
let isTransitioning = false

const currentComponent = computed(() => SECTION_MAP[activeSection.value])

/* ─── Core navigate ──────────────────────────────────────── */
function navigateTo(sectionId) {
  if (sectionId === activeSection.value || isTransitioning) return
  const currentIdx = NAV_ITEMS.findIndex(n => n.id === activeSection.value)
  const nextIdx    = NAV_ITEMS.findIndex(n => n.id === sectionId)
  direction.value  = nextIdx > currentIdx ? 1 : -1
  activeSection.value = sectionId
}

function navigateNext() {
  const idx = NAV_ITEMS.findIndex(n => n.id === activeSection.value)
  if (idx < NAV_ITEMS.length - 1) navigateTo(NAV_ITEMS[idx + 1].id)
}

function navigatePrev() {
  const idx = NAV_ITEMS.findIndex(n => n.id === activeSection.value)
  if (idx > 0) navigateTo(NAV_ITEMS[idx - 1].id)
}

/* ─── Scroll navigation ──────────────────────────────────── */
const SCROLL_COOLDOWN_MS = 820
const SCROLL_THRESHOLD   = 50
let scrollAccum      = 0
let scrollCooldown   = false
let scrollTimer      = null

function handleWheel(e) {
  e.preventDefault()
  if (scrollCooldown) return
  const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
  const norm  = e.deltaMode === 1 ? delta * 40 : e.deltaMode === 2 ? delta * 800 : delta
  scrollAccum += norm
  if (Math.abs(scrollAccum) >= SCROLL_THRESHOLD) {
    scrollAccum > 0 ? navigateNext() : navigatePrev()
    scrollAccum  = 0
    scrollCooldown = true
    scrollTimer = setTimeout(() => { scrollCooldown = false }, SCROLL_COOLDOWN_MS)
  }
}

/* ─── Touch / swipe ──────────────────────────────────────── */
let touchStartX = 0
let touchStartY = 0
let touchStartT = 0
let isSwiping   = false

function handleTouchStart(e) {
  if (e.touches.length !== 1) return
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  touchStartT = Date.now()
  isSwiping   = false
}

function handleTouchMove(e) {
  if (e.touches.length !== 1) return
  const dx = e.touches[0].clientX - touchStartX
  const dy = e.touches[0].clientY - touchStartY
  if (!isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) isSwiping = true
  if (isSwiping) e.preventDefault()
}

function handleTouchEnd(e) {
  if (!isSwiping) return
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY
  if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) && Date.now() - touchStartT < 600) {
    dx < 0 ? navigateNext() : navigatePrev()
  }
  isSwiping = false
}

/* ─── Keyboard ───────────────────────────────────────────── */
function handleKeyDown(e) {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown')       { e.preventDefault(); navigateNext() }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')     { e.preventDefault(); navigatePrev() }
}

/* ─── GSAP transition hooks ──────────────────────────────── */
function onBeforeEnter(el) {
  isTransitioning = true
  gsap.set(el, { xPercent: direction.value * 100, opacity: 1, position: 'absolute' })
}

function onEnter(el, done) {
  gsap.to(el, {
    xPercent: 0,
    duration: 0.78,
    ease: 'expo.out',
    onComplete: () => {
      gsap.set(el, { position: '', clearProps: 'xPercent' })
      isTransitioning = false
      done()
    },
  })
}

function onLeave(el, done) {
  gsap.to(el, {
    xPercent: -direction.value * 100,
    duration: 0.68,
    ease: 'expo.in',
    onComplete: done,
  })
}

/* ─── Lifecycle ──────────────────────────────────────────── */
onMounted(() => {
  // Restore saved preference, else check system preference
  const saved = localStorage.getItem('portfolio-theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  window.addEventListener('wheel',      handleWheel,      { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true  })
  window.addEventListener('touchmove',  handleTouchMove,  { passive: false })
  window.addEventListener('touchend',   handleTouchEnd,   { passive: true  })
  window.addEventListener('keydown',    handleKeyDown)
})

onUnmounted(() => {
  if (scrollTimer) clearTimeout(scrollTimer)
  window.removeEventListener('wheel',      handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove',  handleTouchMove)
  window.removeEventListener('touchend',   handleTouchEnd)
  window.removeEventListener('keydown',    handleKeyDown)
})
</script>

<style>
/* ─── App root — owns the dark/light background ─────────── */
.app-root {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--color-bg);
  color: var(--color-text-primary);
  transition: background 0.45s ease, color 0.45s ease;
}

/* ─── Viewport ───────────────────────────────────────────── */
.viewport {
  position: relative;
  width: 100%;
  height: calc(100% - var(--nav-height));
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.section-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
}

.section {
  width: 100%;
  height: 100%;
}

.section-enter-active,
.section-leave-active {
  position: absolute;
  inset: 0;
}

/* ─── Theme toggle button ────────────────────────────────── */
.theme-toggle {
  position: fixed;
  top: 1.4rem;
  right: 1.6rem;
  z-index: 200;
  background: var(--color-toggle-bg);
  border: 1px solid var(--color-border);
  color: var(--color-toggle-fg);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
}

.theme-toggle:hover {
  transform: scale(1.08);
}

.toggle-icon {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1;
  transition: opacity 0.25s ease;
  user-select: none;
}

/* ─── Position dots ──────────────────────────────────────── */
.position-dots {
  position: fixed;
  left: 50%;
  bottom: calc(var(--nav-height) + 10px);
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 90;
}

.dot {
  display: block;
  width: 3px;
  height: 3px;
  background: var(--color-dot-inactive);
  transition: background 0.3s ease, transform 0.35s ease;
}

.dot--active {
  background: var(--color-dot-active);
  transform: scaleX(2.6);
}
</style>
