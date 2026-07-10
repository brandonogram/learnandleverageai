export const ASSESSMENT_PAYMENT_LINK_ID = 'plink_1TOhDm4ThMqTkeKe2a9I6m5l';
export const ASSESSMENT_AMOUNT_CENTS = 99700;
export const ASSESSMENT_CURRENCY = 'usd';
export const ASSESSMENT_PRODUCT_TYPE = 'assessment';

export const ASSESSMENT_GHL_TAGS = [
  'ai-opportunity-assessment',
  'assessment-paid',
  'assessment-intake-pending',
  'consulting-customer',
  'paid-customer',
] as const;

type CheckoutCustomField = {
  key?: string | null;
  text?: { value?: string | null } | null;
  numeric?: { value?: string | null } | null;
  dropdown?: { value?: string | null } | null;
};

type AssessmentCheckoutSession = {
  livemode?: boolean | null;
  payment_link?: string | { id?: string | null } | null;
  metadata?: Record<string, string> | null;
  amount_total?: number | null;
  currency?: string | null;
  payment_status?: string | null;
};

export function assessmentCheckoutFieldText(fields: CheckoutCustomField[] | null | undefined, key: string): string | null {
  const field = fields?.find((candidate) => candidate.key === key);
  const value = field?.text?.value || field?.numeric?.value || field?.dropdown?.value;
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

export function isPaidAssessmentCheckoutSession(session: AssessmentCheckoutSession): boolean {
  const paymentLinkId = typeof session.payment_link === 'string'
    ? session.payment_link
    : session.payment_link?.id || null;
  return session.livemode === true
    && paymentLinkId === ASSESSMENT_PAYMENT_LINK_ID
    && session.metadata?.product_type === ASSESSMENT_PRODUCT_TYPE
    && session.amount_total === ASSESSMENT_AMOUNT_CENTS
    && session.currency === ASSESSMENT_CURRENCY
    && session.payment_status === 'paid';
}

export function hasPaidAssessmentTags(tags: string[]): boolean {
  return tags.includes('assessment-paid')
    || tags.includes('assessment-purchased')
    || (tags.includes('ai-opportunity-assessment') && tags.includes('paid-customer'));
}
