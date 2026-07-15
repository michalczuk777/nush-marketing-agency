import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(rootDir, 'nush-agency', 'dist');
const port = Number(process.env.PORT || 3000);

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

const server = createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method || '')) {
    response.setHeader('Allow', 'GET, HEAD');
    sendResponse(response, request.method, 405, 'Method Not Allowed', 'text/plain; charset=utf-8');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  } catch {
    sendResponse(response, request.method, 400, 'Bad Request', 'text/plain; charset=utf-8');
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
