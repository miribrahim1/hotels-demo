import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry, validateStay, hotelToday, isDate, nextDate } from '../src/lib/validation.mjs';
import { allowEnquiry } from '../src/lib/rate-limit.mjs';
import { resolveSiteUrl } from '../src/lib/site-config.mjs';
import { withRoomImage } from '../src/lib/room-images.mjs';

const today = '2026-09-09';
const booking = { name: ' Demo Guest ', email: 'guest@example.com', phone: '+91 90000 00000', guests: '2', checkIn: today, checkOut: '2026-09-10', roomSlug: 'classic-twin-room' };

test('valid bookings are normalized, with unexpected fields discarded', () => {
  const result = validateEnquiry({ ...booking, type: 'admin', admin: true }, 'booking', today);
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.name, 'Demo Guest');
  assert.equal(result.data.guests, 2);
  assert.equal(result.data.admin, undefined);
  assert.equal(result.data.type, undefined);
});

test('past dates, impossible dates, same-day and reversed stays are rejected', () => {
  for (const checkIn of ['2026-09-08', '2026-02-30', 'not-a-date']) assert.ok(validateStay({ ...booking, checkIn }, today).checkIn);
  for (const checkOut of ['2026-09-08', today, '2026-02-30', '']) assert.ok(validateStay({ ...booking, checkOut }, today).checkOut);
});

test('calendar handles leap days, month rollover and hotel timezone', () => {
  assert.equal(isDate('2028-02-29'), true);
  assert.equal(isDate('2026-02-29'), false);
  assert.equal(nextDate('2026-12-31'), '2027-01-01');
  assert.equal(hotelToday(new Date('2026-09-08T19:00:00Z')), today);
});

test('guest count must be an integer between 1 and 10', () => {
  for (const guests of ['', 0, -1, 1.5, 11, Infinity, 'hello', true, []]) assert.ok(validateStay({ ...booking, guests }, today).guests);
});

test('names, email, phone and room slug are checked on server-compatible validation', () => {
  for (const [key, value] of [['name', '  '], ['name', 'a'.repeat(101)], ['email', 'bad@@example.com'], ['phone', 'abcdefg'], ['phone', '+1234567890123456'], ['roomSlug', '../../admin']]) {
    assert.ok(validateEnquiry({ ...booking, [key]: value }, 'booking', today).errors[key]);
  }
  for (const input of [null, undefined, [], 42]) assert.ok(Object.keys(validateEnquiry(input, 'booking', today).errors).length);
});

test('contact messages and honeypot are validated', () => {
  const input = { name: 'Demo Guest', email: 'guest@example.com', message: 'A sample hotel enquiry.' };
  assert.deepEqual(validateEnquiry(input, 'contact').errors, {});
  for (const message of [' ', 'short', 'x'.repeat(2001)]) assert.ok(validateEnquiry({ ...input, message }, 'contact').errors.message);
  assert.ok(validateEnquiry({ ...input, website: 'spam' }, 'contact').errors.root);
});

test('rate limiter blocks repeated attempts and expires the window', () => {
  for (let i = 0; i < 5; i++) assert.equal(allowEnquiry('test-user', 1000), true);
  assert.equal(allowEnquiry('test-user', 1000), false);
  assert.equal(allowEnquiry('another-user', 1000), true);
  assert.equal(allowEnquiry('test-user', 601001), true);
});

test('deployment metadata uses public URLs instead of localhost', () => {
  assert.equal(resolveSiteUrl({}), 'http://localhost:3000');
  assert.equal(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://hotel.example/path/' }), 'https://hotel.example');
  assert.equal(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'http://localhost:3000', VERCEL_PROJECT_PRODUCTION_URL: 'demo.vercel.app' }), 'https://demo.vercel.app');
  assert.equal(resolveSiteUrl({ VERCEL_ENV: 'preview', VERCEL_URL: 'preview.vercel.app', VERCEL_PROJECT_PRODUCTION_URL: 'demo.vercel.app' }), 'https://preview.vercel.app');
  assert.throws(() => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'javascript:alert(1)' }));
});

test('room imagery replaces original placeholders and preserves CMS changes', () => {
  assert.equal(withRoomImage({ slug: 'classic-twin-room', image: '/images/hero/02-lobby.png' }).image, '/images/rooms/classic-twin-room.png');
  assert.equal(withRoomImage({ slug: 'classic-twin-room', image: '/images/new-room.png' }).image, '/images/new-room.png');
  assert.equal(withRoomImage(null), null);
});


test('Netlify metadata uses the production or preview URL and replaces localhost', () => {
  assert.equal(resolveSiteUrl({ NETLIFY: 'true', URL: 'https://verandah.netlify.app' }), 'https://verandah.netlify.app');
  assert.equal(resolveSiteUrl({ NETLIFY: 'true', CONTEXT: 'deploy-preview', URL: 'https://verandah.netlify.app', DEPLOY_PRIME_URL: 'https://deploy-preview-1--verandah.netlify.app' }), 'https://deploy-preview-1--verandah.netlify.app');
  assert.equal(resolveSiteUrl({ NETLIFY: 'true', NEXT_PUBLIC_SITE_URL: 'http://localhost:3000', URL: 'https://verandah.netlify.app' }), 'https://verandah.netlify.app');
  assert.equal(resolveSiteUrl({ NETLIFY: 'true', NEXT_PUBLIC_SITE_URL: 'https://custom.example', URL: 'https://verandah.netlify.app' }), 'https://custom.example');
});
