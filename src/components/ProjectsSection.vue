<template>
  <section class="section projects-section" aria-labelledby="projects-heading">
    <div class="section-content">
      <span class="section-eyebrow">Selected Work</span>
      <h2 id="projects-heading">Projects</h2>

      <div class="section-scroll">
        <ul class="project-list" role="list">
          <li v-for="(project, i) in projects" :key="project.title" class="project-item">
            <div class="project-header">
              <div class="project-title-row">
                <h3 class="project-name">{{ project.title }}</h3>
                <div class="project-meta">
                  <a
                    v-if="project.link"
                    :href="project.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                    :aria-label="`View ${project.title} live`"
                  >Live ↗</a>
                  <span v-if="project.year" class="project-year">{{ project.year }}</span>
                </div>
              </div>
              <ul class="project-bullets">
                <li v-for="bullet in project.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="divider" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Robin',
    year: '2026',
    link: 'https://github.com/orisho7/Robin_CLI',
    bullets: [
      'Lightweight, real-time observability agent and CLI dashboard streaming live system metrics via Server-Sent Events (SSE).',
      'Interactive Bubble Tea terminal UI with auto-reconnect, persistent setup wizard, and built-in system stress testing capabilities.',
      'Supports seamless monitoring of local and remote servers with zero-config public tunneling integration.',
    ],
    tags: ['Go', 'CLI', 'TUI', 'SSE'],
  },
  {
    title: 'AI-Assisted Goal Management System',
    year: '2024',
    bullets: [
      'Structured goal-tracking ecosystem using Flutter, Node.js, and a dedicated Go-based AI service for long-term behavioral analysis.',
      'Scalable three-tier architecture with clear service boundaries managing AI orchestration, product logic, and MongoDB data persistence.',
      'LLM-driven daily reflections and progress summarization with cost-efficient model processing and modular API contracts.',
    ],
    tags: ['Go', 'Flutter', 'Node.js', 'MongoDB', 'OLLAMA', 'JWT'],
  },
  {
    title: 'Rush',
    year: '2024',
    link: 'https://rush-page.vercel.app/',
    bullets: [
      'High-performance Go-based dependency orchestrator designed to accelerate builds through smart caching and distributed execution.',
    ],
    tags: ['Go', 'CLI', 'Caching'],
  },
  {
    title: 'VoiceMemo',
    year: '2024',
    link: 'https://github.com/orisho7/Mic',
    bullets: [
      'Modern, feature-rich C# audio recording utility featuring real-time speech-to-text transcription powered by the Vosk engine.',
      'Designed custom circular wave visualizers, volume indicators, and settings persistence via NAudio and Vosk.',
      'Implements sample rate configuration, recording timers, and structured error handling for high-fidelity audio workflows.',
    ],
    tags: ['C#', '.NET', 'NAudio', 'Vosk', 'Audio Processing'],
  },
  {
    title: 'GameRank',
    year: '2023',
    link: 'https://game-rank-orisho.vercel.app/',
    bullets: [
      'Distraction-free, ad-free gaming ranking platform with clean functionality and intuitive design for daily use.',
      'Focused on streamlined user experiences and seamless browser integration.',
    ],
    tags: ['PHP', 'SQL', 'JavaScript'],
  },
]
</script>

<style scoped>
.projects-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--section-padding);
}

.project-list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.project-item {
  display: flex;
  flex-direction: column;
}

.project-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.75rem 0;
}

.project-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-shrink: 0;
}

.project-link {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  text-decoration: none;
  border: 1px solid var(--color-border);
  padding: 0.35rem 0.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  /* crisp pixel-like cursor */
  cursor: pointer;
}

.project-link:hover {
  color: var(--color-bg);
  background: var(--color-text-primary);
  border-color: var(--color-text-primary);
  transform: translateY(-1px);
}

.project-link:active {
  transform: translateY(0);
}

.project-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--color-text-primary);
  text-transform: uppercase;
}

.project-year {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.project-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0;
}

.project-bullets li {
  font-size: 0.875rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  font-weight: 400;
  padding-left: 1rem;
  position: relative;
}

.project-bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.15rem;
}
</style>
