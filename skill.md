# HARMlANA Agent Skills

This project uses a lightweight skills file to keep work consistent, fast, and high‑quality. The intent is to codify the standards used for Harmiana’s public website while staying flexible.

## 1) Frontend Design (Anthropic)
Follow the Anthropic Frontend Design skill guidelines:
- Avoid generic, template‑like UI.
- Use intentional typography and spacing.
- Create a strong visual identity (colors, motion, texture).
- Prefer bold, memorable layouts over default stacks.

## 2) Site Goals & UX Principles
- Clear, minimal navigation: Home, Privacy, Terms, About.
- Fast, accessible, and readable on mobile first.
- Content should be brand‑confident: short, direct, human.
- French translation must be first‑class, not an afterthought.

## 3) Internationalization (Required)
- EN/FR only unless explicitly expanded.
- All UI strings must exist in both locales.
- Never hardcode English strings inside components.
- Route structure must stay `/{lang}/...`.
- Language switcher must preserve the current route when possible.

## 4) SEO & App Store Compliance
- Privacy Policy and Terms pages must be present and reachable.
- Include a visible support contact on site footer.
- Use clean URLs; avoid hash routing.

## 5) Testing & Quality Gates
- Minimum checks before pushing:
  - `npm run build`
  - `npm run preview` (manual smoke)
- If changes touch routing or translations, verify EN and FR routes in browser.
- If changes touch layout, check mobile width (375px) and desktop (1440px).

## 6) Git & Commit Rules
- Use short, descriptive commits.
- Recommended format: `type: summary` (e.g., `feat: add legal pages`)
- No large refactors without a separate commit and clear description.
- Keep commits focused to one intent.

## 7) Content Standards
- Tone: confident, minimal, premium.
- Avoid clichés and filler language.
- Keep lines short; prefer short paragraphs and bullet lists when possible.

## 8) Accessibility
- Sufficient contrast for all text.
- Avoid tiny fonts; minimum 14px body text.
- All interactive elements must have visible focus states.

## 9) Build & Deployment
- Use Vite for dev and build.
- Deploy via Cloudflare Pages when ready.

