/**
 * Partie 3 : ce code a été écrit SANS tests.
 * Ne le corrigez pas tout de suite : lisez d'abord PARTIE3_TDD_et_IA.md.
 */
export class RenewalPolicy {
  canRenew(renewalsSoFar: number, overdue: boolean, reservedByAnotherMember: boolean): boolean {
    if (reservedByAnotherMember) {
      return false;
    }
    return renewalsSoFar <= 2;
  }
}
