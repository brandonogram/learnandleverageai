import { NextRequest, NextResponse } from 'next/server';

/**
 * LinkedIn Lead Gen Form webhook — receives leads from Zapier
 * and forwards them to the main workshop-register endpoint.
 *
 * Zapier maps LinkedIn fields → this endpoint → GHL + email + SMS
 */

const WEBHOOK_SECRET = process.env.LINKEDIN_WEBHOOK_SECRET || 'llai-linkedin-2026';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Optional: verify webhook secret (pass as query param ?secret=xxx)
    const secret = req.nextUrl.searchParams.get('secret');
    if (secret && secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // Map LinkedIn Lead Gen Form fields (via Zapier) to our registration format
    // LinkedIn fields: first_name, last_name, email, job_title, company_name, phone_number
    const firstName = body.first_name || body.firstName || '';
    const lastName = body.last_name || body.lastName || '';
    const fullName = body.full_name || `${firstName} ${lastName}`.trim();
    const email = body.email || body.Email || '';
    const phone = body.phone_number || body.phone || '';
    const jobTitle = body.job_title || body.jobTitle || '';
    const companyName = body.company_name || body.companyName || body.company || '';

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Forward to the main registration endpoint
    const baseUrl = req.nextUrl.origin;
    const registerRes = await fetch(`${baseUrl}/api/workshop-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone,
        company_name: companyName,
        job_title: jobTitle,
        source: 'linkedin-lead-gen',
        registered_at: new Date().toISOString(),
        utm_source: 'linkedin',
        utm_medium: 'paid',
        utm_campaign: 'workshop-april2',
      }),
    });

    const result = await registerRes.json();

    return NextResponse.json({
      success: true,
      name: fullName,
      email,
      company: companyName,
      jobTitle,
      source: 'linkedin',
      ghl_result: result,
    });
  } catch (err) {
    console.error('LinkedIn lead webhook error:', err);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
