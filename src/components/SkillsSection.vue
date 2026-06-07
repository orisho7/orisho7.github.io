<template>
  <section class="section skills-section" aria-labelledby="skills-heading">
    <div class="section-content">
      <span class="section-eyebrow">Expertise</span>
      <h2 id="skills-heading">Skills</h2>

      <div class="section-scroll">
        <div class="skills-grid">

          <div v-for="category in skillCategories" :key="category.name" class="skill-category">
            <h3 class="skill-cat-title">{{ category.name }}</h3>
            <ul class="skill-list" role="list">
              <li v-for="skill in category.skills" :key="skill.name" class="skill-item">
                <span class="skill-name">{{ skill.name }}</span>
                <div
                  class="skill-bar-track"
                  role="progressbar"
                  :aria-valuenow="skill.level"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :aria-label="`${skill.name}: ${skill.level}%`"
                >
                  <div class="skill-bar-fill" :style="{ width: skill.level + '%' }" />
                </div>
                <span class="skill-pct">{{ skill.level }}</span>
              </li>
            </ul>
          </div>

          <div class="soft-skills">
            <h3 class="skill-cat-title">Soft Skills</h3>
            <ul class="tag-list" role="list">
              <li v-for="s in softSkills" :key="s" class="tag">{{ s }}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'Go (Golang)', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Dart',       level: 78 },
      { name: 'Python',     level: 70 },
      { name: 'PHP / SQL',  level: 68 },
    ],
  },
  {
    name: 'Frameworks & Databases',
    skills: [
      { name: 'Flutter',          level: 82 },
      { name: 'Node.js / Express',level: 78 },
      { name: 'MongoDB',          level: 75 },
      { name: 'MySQL',            level: 70 },
    ],
  },
  {
    name: 'Tools & Architecture',
    skills: [
      { name: 'Git / GitHub',     level: 88 },
      { name: 'OLLAMA / LLM APIs',level: 72 },
      { name: 'JWT Auth',         level: 80 },
      { name: 'System Design',    level: 78 },
    ],
  },
]

const softSkills = [
  'Problem Solving',
  'Attention to Detail',
  'Communication',
  'Time Management',
  'Team Player',
  'Independent Work',
]
</script>

<style scoped>
.skills-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--section-padding);
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  width: 100%;
}

.skill-cat-title {
  margin-bottom: 1.1rem;
}

.skill-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-name {
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  width: 180px;
  flex-shrink: 0;
}

.skill-bar-track {
  flex: 1;
  height: 1px;
  background: var(--color-border);
  position: relative;
  overflow: hidden;
}

.skill-bar-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--color-text-primary);
  transition: width 1.4s cubic-bezier(0.65, 0, 0.35, 1);
}

.skill-pct {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  width: 24px;
  text-align: right;
  flex-shrink: 0;
}

.soft-skills .tag-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
