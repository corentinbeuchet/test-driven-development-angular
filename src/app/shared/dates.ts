/**
 * Outils de dates pour le kata (fournis, et testés dans dates.spec.ts).
 * Les dates sont des chaînes ISO « AAAA-MM-JJ » : pas d'heure, pas de fuseau horaire,
 * donc pas de surprise quand l'heure d'été change.
 */
const DAY_IN_MS = 24 * 60 * 60 * 1000;

/** Nombre de jours de `from` à `to` (négatif si `to` est avant `from`). */
export function daysBetween(from: string, to: string): number {
  return Math.round((toUtc(to) - toUtc(from)) / DAY_IN_MS);
}

/** `true` pour une vraie date « AAAA-MM-JJ » (refuse '', '2026-02-30', '01/10/2026'…). */
export function isIsoDate(value: string | null | undefined): value is string {
  if (value == null || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(toUtc(value));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

/** Ajoute des jours à une date ISO (pratique dans les tests). */
export function addDays(date: string, days: number): string {
  return new Date(toUtc(date) + days * DAY_IN_MS).toISOString().slice(0, 10);
}

function toUtc(date: string): number {
  const [year, month, day] = date.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}
