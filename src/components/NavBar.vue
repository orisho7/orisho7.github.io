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

@media (max-width: 768px) {
  .nav-list {
    gap: clamp(0.6rem, 2.5vw, 1.5rem);
  }
  .nav-btn {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
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
}
</style>
