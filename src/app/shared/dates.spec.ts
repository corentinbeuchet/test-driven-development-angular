import { addDays, daysBetween, isIsoDate } from './dates';

describe('dates', () => {
  it.each([
    { from: '2026-10-01', to: '2026-10-01', days: 0 },
    { from: '2026-10-01', to: '2026-10-04', days: 3 },
    { from: '2026-10-04', to: '2026-10-01', days: -3 },
    { from: '2026-10-20', to: '2026-11-02', days: 13 }, // passage à l'heure d'hiver le 25 octobre
    { from: '2028-02-28', to: '2028-03-01', days: 2 }, // année bissextile
  ])('de $from à $to : $days jour(s)', ({ from, to, days }) => {
    expect(daysBetween(from, to)).toBe(days);
  });

  it('ajoute des jours', () => {
    expect(addDays('2026-10-01', 21)).toBe('2026-10-22');
    expect(addDays('2026-10-01', -5)).toBe('2026-09-26');
  });

  it.each(['2026-10-01', '2028-02-29'])('accepte la date %s', (date) => {
    expect(isIsoDate(date)).toBe(true);
  });

  it.each(['', '2026-02-30', '2027-02-29', '01/10/2026', '2026-1-1'])('refuse "%s"', (date) => {
    expect(isIsoDate(date)).toBe(false);
  });

  it('refuse une date absente', () => {
    expect(isIsoDate(null)).toBe(false);
    expect(isIsoDate(undefined)).toBe(false);
  });
});
