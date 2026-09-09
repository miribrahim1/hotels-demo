const replacements = {
  'executive-pool-suite': '/images/hero/04-pool.png',
  'family-garden-suite': '/images/hero/05-garden.png',
  'classic-twin-room': '/images/hero/02-lobby.png',
  'presidential-night-suite': '/images/hero/06-hero-night.png',
};

export function withRoomImage(room) {
  if (!room) return room;
  // Replace only the original demo placeholders; preserve future CMS image updates.
  return replacements[room.slug] === room.image
    ? { ...room, image: `/images/rooms/${room.slug}.png` }
    : room;
}
