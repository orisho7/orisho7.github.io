<template>
  <section class="section contact-section" aria-labelledby="contact-heading">
    <div class="section-content">
      <span class="section-eyebrow">Get In Touch</span>
      <h2 id="contact-heading">Contact</h2>

      <p class="contact-intro">
        Systems-oriented engineer open to backend, full-stack, and AI-integrated
        roles. Based in Qassim, Unayzah — available remotely worldwide.
      </p>

      <ul class="contact-links" role="list">
        <li v-for="link in contactLinks" :key="link.label" class="contact-link-item">
          <a
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="contact-link"
            :aria-label="link.ariaLabel"
          >
            <span class="contact-link-label">{{ link.label }}</span>
            <span class="contact-link-value">{{ link.display }}</span>
            <span class="contact-link-arrow" aria-hidden="true">↗</span>
          </a>
          <div class="divider" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const contactLinks = [
  {
    label: 'Email',
    display: 'abdullrazaq.nq13@gmail.com',
    href: 'mailto:abdullrazaq.nq13@gmail.com',
    ariaLabel: 'Send email to Abdullrazaq',
    external: false,
  },
  {
    label: 'Phone',
    display: '+966 539 063 539',
    href: 'tel:+966539063539',
    ariaLabel: 'Call Abdullrazaq',
    external: false,
  },
  {
    label: 'GitHub',
    display: 'github.com/orisho7',
    href: 'https://github.com/orisho7',
    ariaLabel: 'GitHub profile',
    external: true,
  },
  {
    label: 'LinkedIn',
    display: 'abdullrazaq-naqsho',
    href: 'https://www.linkedin.com/in/abdullrazaq-naqsho/',
    ariaLabel: 'LinkedIn profile',
    external: true,
  },
]
</script>

<style scoped>
.contact-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--section-padding);
}

.contact-intro {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  font-weight: 400;
  max-width: 480px;
}

.contact-links {
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.contact-link-item {
  display: flex;
  flex-direction: column;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 0;
  text-decoration: none;
  transition: all 0.22s ease;
}

.contact-link:hover .contact-link-value { color: var(--color-text-primary); }
.contact-link:hover .contact-link-arrow { transform: translate(3px, -3px); }

.contact-link-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  width: 68px;
  flex-shrink: 0;
}

.contact-link-value {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  flex: 1;
  transition: color 0.22s ease;
}

.contact-link-arrow {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  transition: transform 0.28s cubic-bezier(0.65, 0, 0.35, 1);
  display: inline-block;
}
</style>
