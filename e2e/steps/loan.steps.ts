import { createBdd } from 'playwright-bdd';

/**
 * Les définitions d'étapes des scénarios Cucumber (partie 2).
 * Lancez `npm run e2e` : pour chaque étape non définie, playwright-bdd affiche
 * le squelette à copier ici.
 */
export const { Given, When, Then } = createBdd();
