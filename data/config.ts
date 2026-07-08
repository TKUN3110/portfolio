/**
 * data/config.ts
 * ─────────────────────────────────────────────────────────────
 * Master config for the portfolio.
 * To personalise the site, edit the values in this file only.
 * Every component imports from here — nothing is hard-coded elsewhere.
 */

export interface KanjiEntry {
  text?: string;
  translation?: string;
}

export interface KanjiConfig {
  navLogo?: KanjiEntry;
  navStamp?: KanjiEntry;
  heroStamp?: KanjiEntry;
  heroBlossom?: KanjiEntry;
  aboutEnso?: KanjiEntry;
  skillsWanted?: KanjiEntry;
  skillsStamp?: KanjiEntry;
  skillsSubtitle?: KanjiEntry;
  projectsKanji?: KanjiEntry;
  experienceKanji?: KanjiEntry;
  contactKanji?: KanjiEntry;
  projectCards?: Record<string, KanjiEntry>;
  projectsFeatured?: KanjiEntry;
  footerStamp?: KanjiEntry;
  footerBackToTop?: KanjiEntry;
  contactSuccess?: KanjiEntry;
  contactName?: KanjiEntry;
  contactEmail?: KanjiEntry;
  contactMessage?: KanjiEntry;
}

export const siteConfig = {
  // ── Personal Identity ────────────────────────────────────────
  name: 'Tejas Salunke',
  title: 'AI Engineer',
  bio: "I'm Tejas, an AI enthusiast and Computer Engineering student building intelligent systems to solve real-world problems. I enjoy bringing ideas to life through code, with specific interests in biology, AI research, Computer Vision, and Large Language Models.",

  // ── Hero section ─────────────────────────────────────────────
  greeting: { text: 'こんにちは、', translation: 'Hello / Good Afternoon' } as KanjiEntry,
  roles: ['LLMs', 'Computer Vision', 'Building Intelligent Systems'],

  // ── Music Tooltips ───────────────────────────────────────────
  musicTooltips: {
    muted: { text: '🔇 ミュート中', translation: 'Muted' },
    pause: { text: '一時停止', translation: 'Pause' },
    play: { text: '音楽を再生', translation: 'Play Music' },
  } as Record<string, KanjiEntry>,

  // ── Japanese Calligraphy / Kanji ─────────────────────────────
  // Every Japanese character in the portfolio is here.
  // Comment out or delete a line to hide that element.
  kanji: {

    navLogo: { text: '', translation: '' },
    // navStamp: { text: '', translation: 'Artisan (Hanko seal)' },
    heroStamp: { text: '履歴書', translation: 'Resume / CV' },
    heroBlossom: { text: '咲', translation: 'Bloom / Blossom' },

    // ── About section ──────────────────────────────────────────
    aboutEnso: { text: '私', translation: 'Me / Myself / I' },

    // ── Skills section ─────────────────────────────────────────
    skillsWanted: { text: '賢者', translation: 'Sage / Wise Person (>ᴗ•) !' },
    skillsStamp: { text: '技', translation: 'Skill / Technique' },
    skillsSubtitle: { text: '専門知識', translation: 'Specialized Knowledge / Expertise Data' },

    // ── Section watermarks & stamps ────────────────────────────
    projectsKanji: { text: '作', translation: 'Create / Works' },
    experienceKanji: { text: '歴', translation: 'History / Journey' },
    contactKanji: { text: '信', translation: 'Message / Trust' },

    // ── Per-project card watermarks ────────────────────────────
    // Keys must match the project `id` in data/projects.ts
    projectCards: {
      'breast-cancer-pipeline': { text: '診', translation: 'Diagnose' },
      'eco-sentry': { text: '護', translation: 'Protect / Eco' },
      'genomic-classifier': { text: '基', translation: 'Genome / Base' },
    } as Record<string, KanjiEntry>,

    // ── Extras & Translations ──────────────────────────────────
    projectsFeatured: { text: '名作', translation: 'Featured / Masterpiece' },
    footerBackToTop: { text: '帰る', translation: 'Return to top' },
    contactSuccess: { text: '送信完了', translation: 'Submission Completed' },
    contactName: { text: 'お名前', translation: 'Your Name' },
    contactEmail: { text: '連絡先', translation: 'Email Address' },
    contactMessage: { text: '内容', translation: 'Message Content' },

    // ── Footer ─────────────────────────────────────────────────
    // footerStamp:  { text: '', translation: 'Signature seal' },
  } as KanjiConfig,

  resumeUrl: '/resume.pdf', // Drop your PDF into /public as resume.pdf

  // ── Social Links ─────────────────────────────────────────────
  socials: {
    github: 'https://github.com/TKUN3110',
    linkedin: 'https://linkedin.com/in/tkun3110',
    email: 'tejas.salunke@somaiya.edu',
  },

  // ── Site / SEO Metadata ──────────────────────────────────────
  url: 'https://tejas-salunke.com',
  siteDescription: 'Portfolio of Tejas Salunke, AI Engineer specializing in Computer Vision, LLMs, and building intelligent software systems, themed in a traditional Japanese sumi-e aesthetic.',
  keywords: ['AI Engineer', 'Computer Vision', 'LLMs', 'Tejas Salunke', 'Deep Learning', 'PyTorch', 'Next.js Portfolio'],

  // ── Navigation ───────────────────────────────────────────────
  navItems: [
    { name: 'HOME', id: 'home' },
    { name: 'ABOUT', id: 'about' },
    { name: 'SKILLS', id: 'skills' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'EXPERIENCE', id: 'experience' },
    { name: 'CONTACT', id: 'contactme' },
  ],

  // Section IDs used by scroll detection (must match navItems ids + any extras)
  sections: ['home', 'about', 'skills', 'projects', 'experience', 'contactme'],

  // ── Layout Constants ─────────────────────────────────────────
  navbarHeight: 80, // px — used for scroll offset calculations throughout the site
};

export type SiteConfig = typeof siteConfig;
