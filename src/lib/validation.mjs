export function hotelToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function isDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function nextDate(value) {
  if (!isDate(value)) return '';
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function validateStay(data, today = hotelToday()) {
  const errors = {};
  if (!isDate(data.checkIn) || data.checkIn < today) errors.checkIn = 'Choose today or a future check-in date.';
  if (!isDate(data.checkOut) || !isDate(data.checkIn) || data.checkOut <= data.checkIn) {
    errors.checkOut = 'Check-out must be after check-in.';
  }
  const guests = typeof data.guests === 'string' || typeof data.guests === 'number' ? Number(data.guests) : NaN;
  if (!Number.isInteger(guests) || guests < 1 || guests > 10) errors.guests = 'Choose between 1 and 10 guests.';
  return errors;
}

export function validateEnquiry(input, type, today = hotelToday()) {
  const data = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  const errors = {};
  const clean = {};
  const field = (key, min, max, message) => {
    const value = typeof data[key] === 'string' ? data[key].trim() : '';
    if (value.length < min || value.length > max) errors[key] = message;
    clean[key] = value;
    return value;
  };
  field('name', 2, 100, 'Enter a name between 2 and 100 characters.');
  const email = field('email', 3, 254, 'Enter a valid email address.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (data.website) errors.root = 'Unable to process this request.';

  if (type === 'booking') {
    const phone = field('phone', 7, 30, 'Enter a valid phone number.');
    if (!/^\+?[\d ()-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.replace(/\D/g, '').length > 15) {
      errors.phone = 'Enter a valid phone number with 7–15 digits.';
    }
    Object.assign(errors, validateStay(data, today));
    clean.checkIn = data.checkIn;
    clean.checkOut = data.checkOut;
    clean.guests = Number(data.guests);
    field('roomSlug', 1, 100, 'Choose a room.');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(clean.roomSlug)) errors.roomSlug = 'Choose a valid room.';
  } else {
    field('message', 10, 2000, 'Enter a message between 10 and 2,000 characters.');
  }
  return { data: clean, errors };
}

export function enquiryResolver(type) {
  return (values) => {
    const result = validateEnquiry(values, type);
    return {
      values: Object.keys(result.errors).length ? {} : { ...result.data, website: values.website || '' },
      errors: Object.fromEntries(Object.entries(result.errors).map(([key, message]) => [key, { type: 'validate', message }])),
    };
  };
}
