<template>
  <section class="section experience-section" aria-labelledby="experience-heading">
    <div class="section-content">
      <span class="section-eyebrow">Work & Education</span>
      <h2 id="experience-heading">Experience</h2>

      <div class="section-scroll">
        <ol class="timeline" role="list">
          <li
            v-for="(item, i) in timeline"
            :key="item.title + item.org"
            class="timeline-item"
          >
            <div class="timeline-marker" aria-hidden="true">
              <div class="marker-dot" :class="{ 'marker-dot--edu': item.type === 'edu' }" />
              <div v-if="i < timeline.length - 1" class="marker-line" />
            </div>
            <div class="timeline-body">
              <span class="timeline-period">{{ item.period }}</span>
              <h3 class="timeline-role">{{ item.title }}</h3>
              <span class="timeline-company">{{ item.org }}</span>
              <ul v-if="item.bullets" class="timeline-bullets">
                <li v-for="b in item.bullets" :key="b">{{ b }}</li>
              </ul>
              <div v-if="item.tags" class="timeline-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
const timeline = [
  {
    type: 'work',
    title: 'Community Leader',
    org: 'Google Developer Group on Campus',
    period: '2025 — Ongoing',
    bullets: [
      'Organizes technical events, workshops, and developer community initiatives focused on Google technologies.',
      'Leads student engagement and industry collaboration to strengthen practical skills and hands-on project experience.',
    ],
    tags: ['Community', 'Leadership', 'Google Technologies'],
  },
  {
    type: 'work',
    title: 'Flutter Programmer',
    org: 'Kharja · Remote',
    period: '2024/02 — 2024/04',
    bullets: [
      'Full-stack Flutter developer specializing in dynamic UI, real-time database integration, and seamless end-to-end data flow.',
    ],
    tags: ['Flutter', 'Dart', 'Firebase'],
  },
  {
    type: 'edu',
    title: 'B.Sc. Software Engineering',
    org: 'Mustaqbal University, Buraidah',
    period: '2023 — 2028',
    bullets: [
      'GPA: 4.85 — Undergraduate, currently enrolled.',
    ],
    tags: ['GPA 4.85', 'Undergraduate'],
  },
]
</script>

<style scoped>
.experience-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--section-padding);
}

.timeline {
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.timeline-item {
  display: flex;
  gap: 1.5rem;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 0.3rem;
}

.marker-dot {
  width: 4px;
  height: 4px;
  background: var(--color-text-primary);
  flex-shrink: 0;
}

.marker-dot--edu {
  background: var(--color-text-muted);
  outline: 1px solid var(--color-text-muted);
  outline-offset: 2px;
}

.marker-line {
  flex: 1;
  width: 1px;
  background: var(--color-border);
  margin-top: 0.5rem;
  min-height: 2rem;
}

.timeline-body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-bottom: 2.25rem;
  flex: 1;
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.timeline-role {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 0.1rem;
}

.timeline-company {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.timeline-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.25rem;
}

.timeline-bullets li {
  font-size: 0.85rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  font-weight: 400;
  padding-left: 1rem;
  position: relative;
}

.timeline-bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}
</style>
