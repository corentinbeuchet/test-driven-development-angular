/**
 * Partie 3 : les réservations de livres.
 * Les règles métier sont dans PARTIE3_TDD_et_IA.md (le « ticket »).
 * L'implémentation attendue s'appelle InMemoryReservationService,
 * dans reservation/in-memory-reservation-service.ts, avec un constructeur sans paramètre.
 */
export interface ReservationService {
  /** Le système d'emprunt signale qu'un abonné vient d'emprunter un livre. */
  markBorrowed(isbn: string, member: string): void;

  /** Le livre est rendu à la bibliothèque. */
  markReturned(isbn: string): void;

  /** L'abonné qui a actuellement le livre, ou `undefined` s'il n'est pas emprunté. */
  borrowerOf(isbn: string): string | undefined;

  /** Réserve un livre. Lève ReservationRefusedError si une règle l'interdit. */
  reserve(isbn: string, member: string): void;

  /** Annule une réservation. Lève ReservationRefusedError si elle n'existe pas. */
  cancel(isbn: string, member: string): void;

  /** La file d'attente du livre, dans l'ordre des réservations. */
  queue(isbn: string): readonly string[];
}
