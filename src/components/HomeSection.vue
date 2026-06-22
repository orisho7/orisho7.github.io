<template>
  <section class="section home-section" aria-labelledby="home-name">
    <div class="home-inner">

      <div class="home-label" aria-hidden="true">
        <span class="label-line" />
        <span class="label-text">Software Engineer</span>
        <span class="label-line" />
      </div>

      <!-- typed.js targets the span inside; h1 keeps its id for a11y -->
      <h1 id="home-name" class="home-name" aria-label="Abdullrazaq">
        <span ref="typedEl" />
      </h1>

      <p class="home-tagline">System and Back end Developer</p>

      <div class="home-meta">
        <span class="meta-loc">Qassim, Unayzah</span>
      </div>

      <div class="home-explore-hint" aria-hidden="true">
        <span>SWIPE OR SCROLL</span>
        <span class="hint-arrow">➔</span>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Typed from 'typed.js'

const typedEl = ref(null)
let typed = null

onMounted(() => {
  typed = new Typed(typedEl.value, {
    strings: ['Abdullrazaq'],
    typeSpeed: 90,          // ms per character
    startDelay: 400,        // wait before starting
    showCursor: true,
    cursorChar: '|',
    loop: false,
    onComplete(self) {
      // fade out cursor after done — feels cleaner
      setTimeout(() => self.cursor?.classList.add('typed-cursor--done'), 1200)
    },
  })
})

onUnmounted(() => {
  typed?.destroy()
})
</script>

<style scoped>
.home-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  user-select: none;
  width: 100%;
  max-width: min(640px, 90vw);
}

.home-label {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  opacity: 0.5;
}

.label-line {
  display: block;
  width: 28px;
  height: 1px;
  background: currentColor;
}

.label-text {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.home-name {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 8vw, 8.5rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 0.92;
  color: var(--color-text-primary);
  /* Reserve height so layout doesn't jump before typing starts */
  min-height: 1.05em;
  text-align: center;
  width: max-content;
  max-width: 100vw;
}

.home-tagline {
  font-family: var(--font-body);
  font-size: clamp(0.78rem, 1.6vw, 0.96rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

.home-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  margin-top: 0.75rem;
}

.home-explore-hint {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-top: 3.5rem;
  opacity: 0.7;
  align-self: flex-end;
}

.hint-arrow {
  display: inline-block;
  animation: slide-arrow 1.6s infinite ease-in-out;
}

@keyframes slide-arrow {
  0%, 100% { transform: translateX(0); opacity: 0.6; }
  50% { transform: translateX(4px); opacity: 1; }
}
</style>

<!-- Typed.js injects .typed-cursor globally — override it to match the theme -->
<style>
.typed-cursor {
  font-family: var(--font-display);
  font-size: inherit;
  font-weight: 200;
  color: var(--color-text-muted);
  opacity: 1;
  animation: typed-blink 0.75s step-end infinite;
}

/* Fade cursor out once typing is complete */
.typed-cursor--done {
  animation: none;
  opacity: 0;
  transition: opacity 0.8s ease;
}

@keyframes typed-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>
