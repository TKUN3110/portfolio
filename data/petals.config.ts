/**
 * data/petals.config.ts
 * ─────────────────────────────────────────────────────────────
 * All tuneable constants for the SakuraPetals canvas animation.
 * Adjust here to change density, speed, burst frequency, etc.
 */

export const PETAL_CONFIG = {
  // ── Petal Counts ─────────────────────────────────────────────
  /** Number of petals at the very top of the page (scrollY = 0) */
  countTop:    45,
  /** Number of petals once fully scrolled past the hero */
  countBottom: 22,

  // ── Burst Effect ─────────────────────────────────────────────
  /** Extra petals injected during a burst gust */
  burstExtra: 28,
  /** Minimum delay between bursts (ms) */
  burstIntervalMin: 8_000,
  /** Maximum delay between bursts (ms) */
  burstIntervalMax: 18_000,
  /** How fast burstFactor decays per frame (~3 s at 60 fps) */
  burstDecayRate: 0.005,
  /** Opacity multiplier added at peak burst (×1 + this) */
  burstBoostMultiplier: 0.5,
  /** Reduces burst count proportionally when scrolled (0 = no reduction, 1 = full) */
  burstScrollReduction: 0.7,

  // ── Scroll Fade ──────────────────────────────────────────────
  /** Scroll distance (px) over which petals fade from top to bottom settings */
  scrollFadeDistance: 600,

  // ── Opacity (per-petal baseOpacity) ──────────────────────────
  /** [min, max] opacity at top of page */
  opacityTop:    [0.5,  0.9]  as [number, number],
  /** [min, max] opacity at bottom of scroll range */
  opacityBottom: [0.25, 0.55] as [number, number],

  // ── Color Alpha (embedded in rgba strings) ───────────────────
  /** [min, max] alpha for pink petals at top */
  alphaPinkTop:    [0.7,  0.9]  as [number, number],
  /** [min, max] alpha for pink petals at bottom */
  alphaPinkBottom: [0.35, 0.55] as [number, number],
  /** [min, max] alpha for crimson petals at top */
  alphaRedTop:     [0.6,  0.8]  as [number, number],
  /** [min, max] alpha for crimson petals at bottom */
  alphaRedBottom:  [0.25, 0.45] as [number, number],

  // ── Petal Shape & Size ───────────────────────────────────────
  /** Minimum petal radius (px) */
  sizeMin: 4,
  /** Maximum petal radius (px) — actual r = random(0, sizeMax-sizeMin) + sizeMin */
  sizeMax: 10,

  // ── Physics ──────────────────────────────────────────────────
  /** Minimum fall speed factor (d) */
  fallSpeedMin: 0.4,
  /** Maximum fall speed factor (d) */
  fallSpeedMax: 1.0,
  /** Base vertical fall velocity added on top of d×1.2 */
  fallBaseVelocity: 0.5,
  /** Horizontal sway amplitude multiplier */
  swayAmplitude: 0.4,

  // ── Mouse Interaction ────────────────────────────────────────
  /** Radius around cursor that petals are repelled from (px) */
  mouseRepelRadius: 180,
  /** Strength of position repulsion force */
  mouseRepelForce: 5,
  /** Strength of velocity-carried repulsion */
  mouseVelocityFactor: 0.15,
};

export type PetalConfig = typeof PETAL_CONFIG;
