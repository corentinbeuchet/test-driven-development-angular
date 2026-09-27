# Partie 2 — La double boucle : scénario Gherkin + TDD

⏱️ Durée indicative : 3 h

Le kata testait une classe isolée. Dans une vraie application, on part d'un **besoin métier** : c'est la **double boucle**.

```text
 Boucle externe (acceptation)          Boucle interne (unitaire)
 ┌────────────────────────────┐        ┌───────────────────────┐
 │ 1. scénario Gherkin ROUGE  │ ─────▶ │rouge → vert → refactor│ ◀─┐
 │                            │        └───────────┬───────────┘   │
 │ 3. scénario VERT → suivant │ ◀── 2. assez de code ? ── non ─────┘
 └────────────────────────────┘
```

1. Le scénario d'acceptation échoue (boucle externe rouge).
2. Vous construisez le code nécessaire en TDD, test unitaire par test unitaire (boucle interne).
3. Quand le scénario passe, vous passez au suivant.

## Le besoin

Le fichier `e2e/features/emprunter-un-livre.feature` décrit, en français, ce que la bibliothèque attend :

```gherkin
Scénario: un abonné emprunte un livre disponible
  Étant donné le livre "9780132350884" disponible
  Quand "alice" emprunte le livre "9780132350884"
  Alors l'emprunt est accepté
  Et le livre "9780132350884" n'est plus disponible
```

Ce fichier est écrit **avec** le métier : il sert à la fois de spécification, de documentation et de test. Ici, il est exécuté dans un vrai navigateur par [Playwright](https://playwright.dev/), grâce à [playwright-bdd](https://vitalets.github.io/playwright-bdd/) (l'équivalent de Cucumber).

## L'écran attendu

La page d'accueil affiche un formulaire et le catalogue (`src/app/loans/catalogue.ts`). Les étapes du scénario cherchent les éléments **comme un utilisateur** : respectez ces libellés.

| Élément | Ce que Playwright cherche |
|---|---|
| Champ « Abonné » | `page.getByLabel('Abonné')` |
| Champ « ISBN » | `page.getByLabel('ISBN')` |
| Bouton « Emprunter » | `page.getByRole('button', { name: 'Emprunter' })` |
| Message de succès « Emprunt accepté » | `page.getByRole('status')` (un `<p role="status">`) |
| Motif du refus | `page.getByRole('alert')` (un `<p role="alert">`) |
| Statut d'un livre du catalogue : `disponible` ou `emprunté` | `page.getByTestId('statut-9780132350884')` (attribut `data-testid`) |

## Déroulé

Travaillez sur une branche `emprunts`, dans `src/app/loans/` et `e2e/`.

### 1. Boucle externe rouge

- Installez le navigateur une fois : `npx playwright install chromium`
- Retirez le tag `@wip` du **premier** scénario (un seul à la fois) et lancez `npm run e2e`.
- playwright-bdd indique que les étapes ne sont pas définies et **propose leur squelette**. Copiez-les dans `e2e/steps/loan.steps.ts`.
- Écrivez les étapes avec Playwright :
  - `Étant donné` prépare ou vérifie l'état (un livre disponible, un livre déjà emprunté par un autre abonné…) ;
  - `Quand` agit comme l'utilisateur : remplir le formulaire, cliquer sur « Emprunter » ;
  - `Alors` vérifie ce que l'utilisateur voit, avec `expect(...)` de Playwright.
- 💡 Chaque scénario ouvre une page neuve : l'état en mémoire repart de zéro. Ouvrez la page dans un hook : `Before(async ({ page }) => { await page.goto('/'); });` (`Before` vient aussi de `createBdd()`).
- Commit : `test: scénario d'emprunt d'un livre disponible` : **la CI est rouge**, c'est attendu.

### 2. Boucle interne

Le scénario échoue parce que rien n'existe. Construisez en TDD, dans `src/app/loans/loan-service.spec.ts`, un `LoanService` qui :

| Règle | Motif |
|---|---|
| prête un livre disponible | |
| refuse un livre déjà emprunté | `Livre déjà emprunté` |
| refuse un 4ᵉ emprunt en cours pour un même abonné | `Trop d'emprunts en cours` |
| refuse un livre absent du catalogue | `Livre inconnu` |

Un cycle rouge → vert → refactor par règle, avec ses commits. Pas de serveur : une `Map` en mémoire suffit. Un refus lève une `LoanRefusedError` dont le message est le motif.

💡 Ces tests-là n'ont besoin ni de navigateur ni de `TestBed` : `new LoanService()`, et ils tournent en quelques millisecondes.

### 3. Boucle externe verte

Créez le composant de la page (`npx ng generate component loans/loan-page`), qui utilise `LoanService` (`inject(LoanService)`), et affichez-le dans `App`. Relancez `npm run e2e` : le scénario passe, la CI redevient verte. Commit `feat: …`, puis retirez le `@wip` du scénario suivant.

💡 `npm run e2e:ui` ouvre l'interface de Playwright : vous voyez chaque étape s'exécuter dans le navigateur, avec une capture à chaque action.

## ✅ Terminé quand…

- [ ] Les 4 scénarios passent, sans aucun tag `@wip`
- [ ] Chaque règle de `LoanService` a été écrite en TDD (tests unitaires rapides, sans navigateur)
- [ ] L'historique montre la boucle externe rouge **avant** la boucle interne
- [ ] La CI est verte sur la Pull Request
