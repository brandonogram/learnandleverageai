'use client';

import posthog from 'posthog-js';
import { useEffect } from 'react';

const POSTHOG_KEY = 'phc_f0x9z3Y8FCegigCHteagGt0yiE3ks6zdJvUo2nvRfBL';
const POSTHOG_HOST = 'https://us.i.posthog.com';

let posthogInitialized = false;

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (posthogInitialized) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });

  posthogInitialized = true;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return <>{children}</>;
}

export { posthog };
