// Safe default for a publicly shared portfolio. Set to "false" for real enquiries.
export const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';

export function resolveSiteUrl(env = process.env) {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelHost = env.VERCEL_ENV === 'preview'
    ? env.VERCEL_URL
    : env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  const netlifyUrl = env.NETLIFY
    ? (env.CONTEXT && env.CONTEXT !== 'production' ? env.DEPLOY_PRIME_URL || env.URL : env.URL || env.DEPLOY_PRIME_URL)
    : undefined;
  const deployment = netlifyUrl || (vercelHost ? `https://${vercelHost}` : undefined);
  const candidate = configured || deployment || 'http://localhost:3000';
  const url = new URL(candidate);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Set NEXT_PUBLIC_SITE_URL to a valid HTTP(S) site URL.');
  if (deployment && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) return new URL(deployment).origin;
  return url.origin;
}
