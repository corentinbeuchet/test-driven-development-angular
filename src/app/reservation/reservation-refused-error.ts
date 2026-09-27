/** Levée quand une règle du ticket interdit la réservation. Le message est le motif. */
export class ReservationRefusedError extends Error {
  override readonly name = 'ReservationRefusedError';
}
