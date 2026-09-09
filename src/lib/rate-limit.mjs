// Best-effort per-process protection. Use a shared limiter/WAF for multi-instance live deployments.
const attempts = new Map();
const windowMs = 10 * 60 * 1000;

export function allowEnquiry(key, now = Date.now()) {
  for (const [id, value] of attempts) {
    if (value.expires <= now) attempts.delete(id);
  }
  const current = attempts.get(key);
  if (current && current.count >= 5) return false;
  if (!current && attempts.size >= 5000) return false;
  attempts.set(key, { count: (current?.count || 0) + 1, expires: current?.expires || now + windowMs });
  return true;
}
