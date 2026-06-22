<template>
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <ul class="nav-list" role="list">
      <li
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
      >
        <button
          :id="`nav-${item.id}`"
          class="nav-btn"
          :class="{ 'nav-btn--active': activeSection === item.id }"
          :aria-current="activeSection === item.id ? 'page' : undefined"
          @click="$emit('navigate', item.id)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>

    <!-- LinkedIn icon -->
    <a
      id="nav-linkedin"
      class="linkedin-link"
      href="https://www.linkedin.com/in/abdullrazaq-naqsho/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile"
    >
      <svg class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
  </nav>
</template>

<script setup>
defineProps({
  activeSection: { type: String, required: true },
  navItems:      { type: Array,  required: true },
})
defineEmits(['navigate'])
</script>

<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  /* bottom fade */
  background: linear-gradient(to top, var(--color-bg) 55%, transparent);
  transition: background 0.45s ease;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3.5vw, 2.8rem);
  list-style: none;
}

.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-nav-inactive);
  padding: 0.3rem 0;
  position: relative;
  transition: color 0.28s ease;
  /* crisp pixel-like cursor */
  cursor: pointer;
}

/* Expanding underline */
.nav-btn::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-nav-active);
  transition: width 0.38s cubic-bezier(0.65, 0, 0.35, 1);
}

.nav-btn:hover {
  color: var(--color-text-secondary);
}

.nav-btn--active {
  color: var(--color-nav-active);
}

.nav-btn--active::after {
  width: 100%;
}

.nav-item {
  flex-shrink: 0;
}

/* ─── LinkedIn icon ───────────────────────────────────────── */
.linkedin-link {
  position: absolute;
  right: 1.6rem;
  display: flex;
  align-items: center;
  color: var(--color-nav-inactive);
  transition: color 0.28s ease, transform 0.22s ease;
}

.linkedin-link:hover {
  color: var(--color-nav-active);
  transform: translateY(-2px);
}

.linkedin-icon {
  width: 15px;
  height: 15px;
}

@media (max-width: 768px) {
  .nav-list {
    gap: clamp(0.6rem, 2.5vw, 1.5rem);
  }
  .nav-btn {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
  }
  .linkedin-link {
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .nav-list {
    gap: 0.5rem;
  }
  .nav-btn {
    font-size: 0.52rem;
    letter-spacing: 0.08em;
  }
  .linkedin-link {
    right: 0.6rem;
  }
}
</style>
