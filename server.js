import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(rootDir, 'nush-agency', 'dist');
const port = Number(process.env.PORT || 3000);
const contactTo = process.env.CONTACT_TO || 'kontakt@nush.pl';
const contactFrom = process.env.CONTACT_FROM || process.env.SMTP_USER || contactTo;
const smtpTransporter = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })
  : null;
const contactRateLimit = new Map();
const contactRateWindowMs = 15 * 60 * 1000;
const contactRateMax = 5;
const maxContactBodyBytes = 32 * 1024;

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

function securityHeaders(contentType) {
  return {
    'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; upgrade-insecure-requests",
    'Content-Type': contentType,
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };
}

function getSafeFile(pathname) {
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const candidate = path.resolve(distDir, relativePath);
  const relativeToDist = path.relative(distDir, candidate);
  if (relativeToDist.startsWith('..') || path.isAbsolute(relativeToDist)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    const indexFile = path.join(candidate, 'index.html');
    if (existsSync(indexFile) && statSync(indexFile).isFile()) return indexFile;
  }
  return null;
}

function sendResponse(response, method, statusCode, body, contentType) {
  response.writeHead(statusCode, securityHeaders(contentType));
  if (method !== 'HEAD') response.end(body);
  else response.end();
}

function sendJson(response, method, statusCode, payload) {
  const headers = securityHeaders('application/json; charset=utf-8');
  headers['Cache-Control'] = 'no-store';
  response.writeHead(statusCode, headers);
  if (method !== 'HEAD') response.end(JSON.stringify(payload));
  else response.end();
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    let bodyBytes = 0;

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      bodyBytes += Buffer.byteLength(chunk);
      if (bodyBytes <= maxContactBodyBytes) body += chunk;
    });
    request.on('end', () => {
      if (bodyBytes > maxContactBodyBytes) {
        reject(Object.assign(new Error('Request body too large'), { statusCode: 413 }));
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error('Invalid JSON'), { statusCode: 400 }));
      }
    });
    request.on('error', reject);
  });
}

function getClientIp(request) {
  return request.headers['x-forwarded-for']?.toString().split(',')[0].trim()
    || request.headers['x-real-ip']?.toString()
    || request.socket.remoteAddress
    || 'unknown';
}

function isRateLimited(request) {
  const now = Date.now();
  const ip = getClientIp(request);
  const recentRequests = (contactRateLimit.get(ip) || []).filter((timestamp) => now - timestamp < contactRateWindowMs);
  if (recentRequests.length >= contactRateMax) {
    contactRateLimit.set(ip, recentRequests);
    return true;
  }
  recentRequests.push(now);
  contactRateLimit.set(ip, recentRequests);
  return false;
}

function validateContactPayload(payload) {
  const values = {
    name: typeof payload?.name === 'string' ? payload.name.trim() : '',
    email: typeof payload?.email === 'string' ? payload.email.trim() : '',
    site: typeof payload?.site === 'string' ? payload.site.trim() : '',
    message: typeof payload?.message === 'string' ? payload.message.trim() : '',
    website: typeof payload?.website === 'string' ? payload.website.trim() : '',
  };
  const hasHeaderBreak = Object.values(values).some((value) => /[\r\n]/.test(value));
  if (values.website) return { honeypot: true, values };
  if (hasHeaderBreak || values.name.length < 2 || values.name.length > 120) return { error: 'Podaj poprawne imię i nazwisko.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) return { error: 'Podaj poprawny adres e-mail.' };
  if (values.site.length > 2048) return { error: 'Adres strony jest zbyt długi.' };
  if (values.message.length > 5000) return { error: 'Wiadomość jest zbyt długa.' };
  return { values };
}

async function handleContact(request, response) {
  if (request.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    sendJson(response, request.method, 415, { error: 'Nieprawidłowy format danych.' });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(request);
  } catch (error) {
    sendJson(response, request.method, error.statusCode || 400, { error: 'Nie udało się odczytać formularza.' });
    return;
  }

  const validation = validateContactPayload(payload);
  if (validation.honeypot) {
    sendJson(response, request.method, 200, { ok: true });
    return;
  }
  if (validation.error) {
    sendJson(response, request.method, 422, { error: validation.error });
    return;
  }
  if (isRateLimited(request)) {
    sendJson(response, request.method, 429, { error: 'Zbyt wiele prób. Spróbuj ponownie za kilka minut.' });
    return;
  }
  if (!smtpTransporter) {
    sendJson(response, request.method, 503, { error: 'Formularz kontaktowy jest chwilowo niedostępny.' });
    return;
  }

  const { name, email, site, message } = validation.values;
  try {
    await smtpTransporter.sendMail({
      from: contactFrom,
      to: contactTo,
      replyTo: email,
      subject: `Nowe zapytanie z nush.pl: ${name}`,
      text: [
        'Nowe zapytanie z formularza nush.pl',
        '',
        `Imię i nazwisko: ${name}`,
        `E-mail: ${email}`,
        `Strona WWW: ${site}`,
        message ? `\nWiadomość:\n${message}` : '',
      ].filter(Boolean).join('\n'),
    });
    sendJson(response, request.method, 200, { ok: true });
  } catch (error) {
    console.error('Contact form delivery failed', error instanceof Error ? error.message : 'unknown error');
    sendJson(response, request.method, 502, { error: 'Nie udało się wysłać formularza. Spróbuj ponownie.' });
  }
}

const server = createServer(async (request, response) => {

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  } catch {
    sendResponse(response, request.method, 400, 'Bad Request', 'text/plain; charset=utf-8');
    return;
  }

  if (pathname === '/api/contact') {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      sendResponse(response, request.method, 405, 'Method Not Allowed', 'text/plain; charset=utf-8');
      return;
    }
    await handleContact(request, response);
    return;
  }

  if (!['GET', 'HEAD'].includes(request.method || '')) {
    response.setHeader('Allow', 'GET, HEAD');
    sendResponse(response, request.method, 405, 'Method Not Allowed', 'text/plain; charset=utf-8');
    return;
  }

  const filePath = getSafeFile(pathname);
  if (!filePath) {
    sendResponse(response, request.method, 404, 'Not Found', 'text/plain; charset=utf-8');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extension] || 'application/octet-stream';
  const headers = securityHeaders(contentType);
  const isHashedAsset = pathname.startsWith('/assets/');
  headers['Cache-Control'] = extension === '.html'
    ? 'no-cache'
    : isHashedAsset
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=3600';
  response.writeHead(200, headers);
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(filePath).on('error', () => {
    if (!response.headersSent) sendResponse(response, request.method, 500, 'Internal Server Error', 'text/plain; charset=utf-8');
    else response.destroy();
  }).pipe(response);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`NUSH production server listening on port ${port}`);
});
