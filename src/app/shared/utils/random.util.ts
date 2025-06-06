/**
 * Returns an integer between min (inclusive) and max (exclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
