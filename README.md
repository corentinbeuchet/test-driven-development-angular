# test-driven-development-angular

Dans ce TP, vous n'allez pas seulement écrire des tests : vous allez les écrire **avant** le code, et laisser les tests guider la conception. C'est le **TDD** (*Test Driven Development*), ici en TypeScript et Angular. C'est le même TP que [test-driven-development](https://github.com/corentinbeuchet/test-driven-development) (Java) : si vous l'avez fait, comparez !

```text
   ┌──────────┐      ┌──────────┐      ┌────────────┐
   │  ROUGE   │ ───▶ │   VERT   │ ───▶ │  REFACTOR  │ ──┐
   │ un test  │      │ le code  │      │  nettoyer  │   │
   │qui échoue│      │ minimal  │      │ tests verts│   │
   └──────────┘      └──────────┘      └────────────┘   │
        ▲                                               │
        └───────────────────────────────────────────────┘
```

## Ce que vous devez comprendre et savoir faire

- Enchaîner des cycles **rouge → vert → refactor** courts, sans jamais écrire de code qu'aucun test n'exige
- Laisser les tests faire émerger la conception (paramètres, types, noms)
- Écrire un scénario d'acceptation (Gherkin, exécuté par Playwright) **avant** la fonctionnalité, puis la construire en TDD : la **double boucle**
- Prendre du recul : que devient le TDD quand une IA écrit le code, les tests… ou tout, en vibe coding ?

## Prérequis

| Outil | Version |
|---|---|
| Node.js | 24 (LTS) : `node -v` doit afficher `v24.x` |
| Angular / Vitest | 22 / 5, installés par `npm ci` |
| Playwright / playwright-bdd | 1.63 / 9, installés par `npm ci` ; puis `npx playwright install chromium` (partie 2) |
| Un assistant IA | celui de votre choix (partie 3) |

## Démarrer

1. Créez un dépôt **vide** sur votre compte GitHub, puis :

```bash
git clone https://github.com/corentinbeuchet/test-driven-development-angular.git
cd test-driven-development-angular
git remote set-url origin https://github.com/<votre-compte>/test-driven-development-angular.git
git push -u origin main
npm ci
npm test
```

2. Protégez `main` : Pull Request obligatoire et check `test` requis (le nom du job de la CI).

## Contenu

| Partie | Sujet | Durée indicative |
|---|---|---|
| [Partie 1](PARTIE1_Kata.md) | Kata : les pénalités de retard, cycle par cycle | 2 h 30 |
| [Partie 2](PARTIE2_Double_boucle.md) | Double boucle : scénario Gherkin + TDD avec Angular | 3 h |
| [Partie 3](PARTIE3_TDD_et_IA.md) | TDD et IA : vibe coding, tests d'abord, tests après | 2 h 30 |

## Les commandes du projet

| Commande | Rôle |
|---|---|
| `npm test` | tests unitaires (Vitest), relancés à chaque modification : idéal pour le TDD |
| `npm test -- --include src/app/fees` | seulement les tests d'un dossier |
| `npm run e2e` | scénarios d'acceptation (Gherkin + Playwright) |
| `npm start` | l'application sur http://localhost:4200 |

## Comment votre travail est évalué

Le TDD se voit dans l'**historique Git**. Pour chaque cycle, faites un commit par étape :

| Étape | Préfixe du commit | État de la CI |
|---|---|---|
| Rouge | `test: …` | rouge (c'est normal !) |
| Vert | `feat: …` | vert |
| Refactor | `refactor: …` (seulement s'il y a quelque chose à nettoyer) | vert |

Un `git log --oneline` qui alterne `test:` / `feat:` / `refactor:` montre que vous avez vraiment travaillé en TDD. Un seul gros commit final ne le montre pas.

## Structure du projet

```text
.
├── src/app/
│   ├── shared/dates.ts        # outils de dates fournis (et testés)
│   ├── fees/                  # partie 1 : le kata (à créer)
│   ├── loans/                 # partie 2 : les emprunts (catalogue fourni)
│   ├── reservation/           # partie 3 : le ticket de réservation (interface fournie)
│   └── renewal/               # partie 3 : RenewalPolicy, écrit sans tests
└── e2e/
    ├── features/              # partie 2 : les scénarios en français (Gherkin)
    └── steps/                 # partie 2 : vos définitions d'étapes
```
