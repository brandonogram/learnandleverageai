import twilio from "twilio";

const TWILIO_PUBLIC_ORIGIN = "https://learnandleverageai.com";

type TwilioFormParams = Record<string, string | string[]>;

export function parseTwilioForm(rawBody: string): TwilioFormParams {
  const parsed = new URLSearchParams(rawBody);
  const params: TwilioFormParams = {};
  for (const key of new Set(parsed.keys())) {
    const values = parsed.getAll(key);
    params[key] = values.length === 1 ? values[0] : values;
  }
  return params;
}

export function publicTwilioUrl(requestUrl: string): string {
  const url = new URL(requestUrl);
  return `${TWILIO_PUBLIC_ORIGIN}${url.pathname}${url.search}`;
}

export function validateTwilioFormRequest(request: Request, rawBody: string): {
  valid: boolean;
  status: 200 | 403 | 503;
  params: TwilioFormParams;
} {
  const params = parseTwilioForm(rawBody);
  const authToken = process.env.TWILIO_LLAI_AUTH_TOKEN;
  const signature = request.headers.get("x-twilio-signature");
  if (!authToken) return { valid: false, status: 503, params };
  if (!signature) return { valid: false, status: 403, params };
  const valid = twilio.validateRequest(authToken, signature, publicTwilioUrl(request.url), params);
  return { valid, status: valid ? 200 : 403, params };
}
