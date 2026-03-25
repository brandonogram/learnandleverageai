/**
 * Analytics utility — fires events to GA4, PostHog, and Meta Pixel.
 * All tracking functions are safe to call server-side (they no-op).
 */

import posthog from 'posthog-js';

// ─── Type helpers ────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// ─── UTM helpers ─────────────────────────────────────────────────────────
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Read UTM parameters from the current URL and sessionStorage.
 * First visit stores them; subsequent pages on the same session reuse them.
 */
export function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const keys: (keyof UTMParams)[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  // Check URL first
  const fromUrl: UTMParams = {};
  let hasUrlParams = false;
  for (const key of keys) {
    const val = params.get(key);
    if (val) {
      fromUrl[key] = val;
      hasUrlParams = true;
    }
  }

  // If we found UTM params in the URL, store them in sessionStorage
  if (hasUrlParams) {
    try {
      sessionStorage.setItem('llai_utm', JSON.stringify(fromUrl));
    } catch {
      // sessionStorage not available
    }
    return fromUrl;
  }

  // Otherwise, try to load from sessionStorage (earlier page in this session had UTMs)
  try {
    const stored = sessionStorage.getItem('llai_utm');
    if (stored) return JSON.parse(stored) as UTMParams;
  } catch {
    // sessionStorage not available
  }

  return {};
}

// ─── PostHog UTM person properties ──────────────────────────────────────
export function setPostHogUTMProperties(utm: UTMParams) {
  if (typeof window === 'undefined') return;
  if (!utm.utm_source) return;

  posthog.register({
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium || '',
    utm_campaign: utm.utm_campaign || '',
    utm_term: utm.utm_term || '',
    utm_content: utm.utm_content || '',
  });
}

// ─── Event dispatchers ──────────────────────────────────────────────────

/** Fire a GA4 event via gtag */
function ga4Event(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
}

/** Fire a PostHog event */
function phEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    posthog.capture(name, properties);
  } catch {
    // posthog not loaded
  }
}

/** Fire a Meta Pixel standard or custom event */
function metaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  try {
    window.fbq?.('track', eventName, params);
  } catch {
    // pixel not loaded
  }
}

// ─── Conversion events ──────────────────────────────────────────────────

export interface RegistrationEventData {
  company?: string;
  job_title?: string;
  ai_skill_level?: string;
  challenge?: string;
}

export function trackWorkshopRegistration(data: RegistrationEventData) {
  // GA4
  ga4Event('workshop_registration', {
    method: 'website',
    value: 0,
    currency: 'USD',
  });

  // PostHog
  phEvent('workshop_registration', {
    company: data.company,
    job_title: data.job_title,
    ai_skill_level: data.ai_skill_level,
    challenge: data.challenge,
  });

  // Meta Pixel (Lead event)
  metaEvent('Lead', {
    content_name: 'Workshop Registration',
    content_category: 'Free Workshop',
  });
}

// ─── Page engagement events ─────────────────────────────────────────────

export function trackFormStarted() {
  ga4Event('form_started', { form_name: 'workshop_registration' });
  phEvent('form_started', { form_name: 'workshop_registration' });
}

export function trackFormFieldCompleted(fieldName: string) {
  ga4Event('form_field_completed', { form_name: 'workshop_registration', field: fieldName });
  phEvent('form_field_completed', { form_name: 'workshop_registration', field: fieldName });
}

export function trackCtaClicked(ctaLabel: string, ctaLocation: string) {
  ga4Event('cta_clicked', { cta_label: ctaLabel, cta_location: ctaLocation });
  phEvent('cta_clicked', { cta_label: ctaLabel, cta_location: ctaLocation });
}

export function trackFaqExpanded(question: string, index: number) {
  ga4Event('faq_expanded', { question, index });
  phEvent('faq_expanded', { question, index });
}

export function trackScrollDepth(percent: number) {
  ga4Event('scroll_depth', { percent, page: '/workshops' });
  phEvent('scroll_depth', { percent, page: '/workshops' });
}

// ─── A/B Test helpers ────────────────────────────────────────────────────

/**
 * Get or assign A/B test variant using PostHog.
 * Stores variant in localStorage for consistency across page loads.
 * Returns 'control' or 'variant' — 50/50 split.
 */
export function getABVariant(testName: string): 'control' | 'variant' {
  if (typeof window === 'undefined') return 'control';

  const storageKey = `llai_ab_${testName}`;

  // Check if already assigned
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'control' || stored === 'variant') return stored;
  } catch {
    // localStorage not available
  }

  // Assign randomly
  const variant = Math.random() < 0.5 ? 'control' : 'variant';

  try {
    localStorage.setItem(storageKey, variant);
  } catch {
    // localStorage not available
  }

  return variant;
}

export function trackABExposure(testName: string, variant: string) {
  phEvent('$experiment_started', {
    experiment: testName,
    variant,
    '$feature_flag': testName,
    '$feature_flag_response': variant,
  });
  ga4Event('experiment_exposure', { test_name: testName, variant });
}
