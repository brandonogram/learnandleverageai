import { createServer } from 'node:http';

const RECOVERY_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Learn &amp; Leverage AI — Temporarily unavailable</title>
    <style>
      :root { color-scheme: light; font-family: system-ui, sans-serif; }
      body { margin: 0; background: #f7f4ed; color: #1c1917; }
      main { max-width: 42rem; margin: 14vh auto; padding: 2rem; }
      h1 { font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1; margin: 0 0 1rem; }
      p { font-size: 1.125rem; line-height: 1.6; }
    </style>
  </head>
  <body>
    <main>
      <h1>We’ll be right back.</h1>
      <p>Learn &amp; Leverage AI is temporarily unavailable while we finish a safety check. Please try again later.</p>
    </main>
  </body>
</html>`;

const API_BODY = JSON.stringify({
  mode: 'quiesced-recovery',
  status: 'unavailable',
  outboundPerformed: false,
});

const SECURITY_HEADERS = Object.freeze({
  'Cache-Control': 'no-store',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
});

function pathnameFor(request) {
  try {
    return new URL(request.url || '/', 'http://recovery.invalid').pathname;
  } catch {
    return '/';
  }
}

export function createRecoveryServer() {
  return createServer((request, response) => {
    const pathname = pathnameFor(request);

    if (pathname === '/healthz') {
      response.writeHead(200, {
        ...SECURITY_HEADERS,
        'Content-Type': 'application/json; charset=utf-8',
      });
      response.end(JSON.stringify({ mode: 'quiesced-recovery', healthy: true }));
      return;
    }

    if (pathname === '/api' || pathname.startsWith('/api/')) {
      response.writeHead(503, {
        ...SECURITY_HEADERS,
        'Content-Type': 'application/json; charset=utf-8',
        'Retry-After': '300',
      });
      response.end(API_BODY);
      return;
    }

    response.writeHead(503, {
      ...SECURITY_HEADERS,
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': '300',
    });
    response.end(request.method === 'HEAD' ? '' : RECOVERY_HTML);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number.parseInt(process.env.PORT || '3000', 10);
  const server = createRecoveryServer();
  server.listen(port, '0.0.0.0', () => {
    process.stdout.write(`quiesced recovery listening on ${port}\n`);
  });
}
