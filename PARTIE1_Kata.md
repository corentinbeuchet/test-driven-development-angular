# Partie 1 — Kata : les pénalités de retard

⏱️ Durée indicative : 2 h 30

Un **kata** est un petit exercice que l'on répète pour acquérir un geste. Ici, le geste est le cycle **rouge → vert → refactor**.

La bibliothèque veut calculer la pénalité d'un livre rendu en retard. Les règles vont arriver **une par une**, comme dans un vrai projet : ne lisez pas l'étape suivante avant d'avoir terminé la précédente.

## Mise en place

- Travaillez sur une branche `kata` et ouvrez une Pull Request vers `main` à la fin.
- Tout se passe dans `src/app/fees/`.
- Les montants sont en **centimes** (`number` entier), jamais en euros décimaux : `0.1 + 0.2` ne vaut pas `0.3` en JavaScript.
- Les dates sont des chaînes `'AAAA-MM-JJ'`. Utilisez les outils fournis dans `src/app/shared/dates.ts` : `daysBetween(from, to)`, `addDays(date, n)`, `isIsoDate(value)`.
- Lancer les tests en continu : `npm test -- --include src/app/fees` (ils se relancent à chaque enregistrement)

## Les trois règles du TDD

1. N'écrivez **aucun code de production** sans un test qui échoue.
2. N'écrivez **que ce qu'il faut** de test pour échouer (une erreur de compilation est un échec).
3. N'écrivez **que ce qu'il faut** de code pour faire passer le test.

## Étape 1 — Rendu à temps

> Un livre rendu à la date prévue, ou avant, ne coûte rien.

Écrivez le premier test dans `src/app/fees/late-fee-calculator.spec.ts`. La classe `LateFeeCalculator` n'existe pas encore : c'est le test qui va la faire naître.

```ts
import { LateFeeCalculator } from './late-fee-calculator';

describe('LateFeeCalculator', () => {
  it('ne coûte rien quand le livre est rendu à temps', () => {
    const calculator = new LateFeeCalculator();

    const fee = calculator.feeInCents('2026-10-01', '2026-10-01');

    expect(fee).toBe(0);
  });
});
```

- 🔴 Le test ne compile pas : `test: rendu à temps, pas de pénalité`
- 🟢 Créez la classe et la méthode. Le code le plus simple qui passe est… `return 0;`. Oui, vraiment. `feat: …`
- 🔵 Rien à nettoyer ? Passez directement à l'étape suivante.

## Étape 2 — Chaque jour de retard coûte 0,50 €

> 1 jour de retard → 50 centimes, 3 jours → 150 centimes.

Le `return 0;` ne tient plus : c'est le test qui vous force à écrire le vrai calcul (`daysBetween`).

💡 Un test paramétré (`it.each`) évite de copier-coller le même test pour 1, 2, 3 jours :

```ts
it.each([
  [1, 50],
  [3, 150],
])('%i jour(s) de retard : %i centimes', (daysLate, expected) => {
  // ...
});
```

## Étape 3 — Plafond de 10 €

> Quel que soit le retard, la pénalité ne dépasse jamais 1 000 centimes.

Testez **la frontière** : 19 jours (950), 20 jours (1 000), 21 jours (toujours 1 000).

## Étape 4 — Les abonnés premium ont 3 jours de grâce

> Pour un abonné premium, les 3 premiers jours de retard sont gratuits : 4 jours de retard → 50 centimes.

Il faut maintenant savoir qui rend le livre : ajoutez un paramètre `memberType: MemberType`, avec `type MemberType = 'standard' | 'premium'`.

🔵 Refactor : vos anciens tests ne compilent plus. Mettez-les à jour (`'standard'`) : c'est le prix, et l'intérêt, d'une conception qui évolue.

## Étape 5 — Les nouveautés coûtent le double

> Un livre de la catégorie nouveauté coûte 1 € par jour de retard. Le plafond reste de 10 €, et les 3 jours de grâce des abonnés premium s'appliquent aussi aux nouveautés.

Ajoutez `category: BookCategory` (`'standard' | 'new-release'`).

🔵 Refactor obligatoire : `feeInCents(dueDate, returnDate, memberType, category)` a trop de paramètres. Regroupez ce qui décrit l'emprunt dans une interface :

```ts
export interface Loan {
  readonly dueDate: string;
  readonly memberType: MemberType;
  readonly category: BookCategory;
}

feeInCents(loan: Loan, returnDate: string): number
```

Les tests doivent rester verts pendant **tout** le refactor.

## Étape 6 — Une date de retour absente est une erreur

> `feeInCents(loan, '')`, `feeInCents(loan, null)` ou une date impossible (`'2026-02-30'`) lèvent une erreur « Date de retour absente ou invalide ».

- 🔴 `feeInCents(loan, null)` ne compile pas : TypeScript refuse `null` pour un `string`. C'est le test qui vous oblige à décider : élargissez le type du paramètre à `string | null | undefined` (une date peut manquer quand elle vient d'un formulaire ou d'une API).
- 💡 `expect(() => ...).toThrow('Date de retour absente ou invalide')`, et `isIsoDate` est fourni.

## ✅ Terminé quand…

- [ ] Les 6 règles sont couvertes par des tests, frontières comprises (0, 1, 20, 21 jours…)
- [ ] `git log --oneline` montre les cycles `test:` → `feat:` → `refactor:`
- [ ] Aucune ligne de `LateFeeCalculator` n'existe sans un test qui l'a exigée
- [ ] La CI est verte sur la Pull Request
