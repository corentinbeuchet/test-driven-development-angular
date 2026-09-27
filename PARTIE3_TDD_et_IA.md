# Partie 3 — TDD et IA : qui écrit la spécification ?

⏱️ Durée indicative : 2 h 30

Le TDD est une bonne pratique reconnue. Mais aujourd'hui, un assistant IA écrit du code **et** des tests en quelques secondes. Beaucoup de développeurs vont plus loin : ils décrivent ce qu'ils veulent, acceptent ce que l'IA propose, lancent, et recommencent jusqu'à ce que « ça marche », sans plan et sans relire. C'est le **vibe coding**.

Cette partie vous fait vivre trois façons de travailler avec l'IA, sur des règles métier précises, puis vous demande votre avis argumenté. Il n'y a pas de « bonne réponse » attendue, mais une réponse **appuyée sur ce que vous avez mesuré**.

## Le ticket : réserver un livre

Les expériences A et B implémentent le même ticket. L'interface `ReservationService` est fournie dans `src/app/reservation/reservation-service.ts`. Votre implémentation doit s'appeler `InMemoryReservationService`, dans `src/app/reservation/in-memory-reservation-service.ts`, avec un constructeur sans paramètre : c'est elle que les tests de recette utiliseront.

> **En tant qu'abonné, je veux réserver un livre déjà emprunté, pour l'avoir dès qu'il revient.**
>
> 1. On ne peut réserver qu'un livre actuellement emprunté. Sinon : « Livre disponible : empruntez-le ».
> 2. On ne peut pas réserver un livre qu'on a soi-même emprunté : « Vous avez déjà ce livre ».
> 3. On ne peut pas réserver deux fois le même livre : « Déjà réservé ».
> 4. Un abonné a au plus 2 réservations en cours : « Trop de réservations ».
> 5. File d'attente : premier arrivé, premier servi.
> 6. Quand le livre est rendu, le premier de la file l'emprunte automatiquement et sort de la file. S'il n'y a personne, le livre redevient disponible.
> 7. Annuler une réservation retire l'abonné de la file. Annuler une réservation qui n'existe pas : « Aucune réservation ».
>
> Chaque refus lève une `ReservationRefusedError` (fournie) avec le message indiqué.

## Expérience A : vibe coding (20 minutes chrono)

Sur une branche `vibe`, implémentez le ticket **uniquement en discutant avec l'IA**. Les règles du jeu :

- donnez le ticket à l'IA (copier-coller) et acceptez ce qu'elle propose ;
- pas de plan, pas de mode plan : on demande, on accepte, on relance ;
- vous n'écrivez **aucun test** vous-même ;
- vous ne lisez pas le code en détail (un coup d'œil pour voir s'il compile, c'est tout) ;
- au bout de 20 minutes, on s'arrête. Commit `feat: réservation (vibe coding)`.

Ensuite :

1. Sans relire le code, écrivez dans `REPONSES_IA.md` comment votre implémentation gère le **retour d'un livre** (règle 6).
2. Votre enseignant vous donne les **tests de recette** (`reservation.acceptance.spec.ts`). Copiez-les dans `src/app/reservation/` et lancez `npm test -- --watch=false`.
3. Notez le nombre de tests en échec, puis relisez le code : votre explication du point 1 était-elle juste ?

Ne corrigez rien : cette branche est une expérience. Ouvrez-la en Pull Request **brouillon** (draft) pour qu'on la voie, sans la merger.

## Expérience B : vos tests, le code de l'IA

Repartez de `main` sur une branche `tdd-ia` (sans le code de l'expérience A).

1. Écrivez **vous-même** les tests du ticket, dans `in-memory-reservation-service.spec.ts` (rouge). Commit `test: …`.
2. Donnez à l'IA **uniquement l'interface et vos tests**, et demandez-lui le code qui les fait passer. Commit `feat: …` en indiquant dans le message que le code vient de l'IA.
3. Relisez le code produit, ligne par ligne. Corrigez-le en TDD si besoin.
4. Ajoutez les tests de recette et lancez-les. Combien échouent cette fois ? Aviez-vous oublié des cas ?

C'est cette branche que vous mergez (CI verte).

## Expérience C : votre code, les tests de l'IA

Le projet contient aussi `src/app/renewal/renewal-policy.ts`, écrit **sans tests**. La règle métier est la suivante :

> Un emprunt peut être prolongé si **toutes** ces conditions sont vraies : le livre n'est **pas en retard**, il a été prolongé **moins de 2 fois**, et **aucun autre abonné** ne l'a réservé.

1. **Sans lire la règle ci-dessus**, donnez le code de `RenewalPolicy` à l'IA et demandez-lui d'écrire les tests. Ajoutez-les, lancez-les. Commit `test: tests générés par l'IA`.
2. Les tests passent-ils ? Maintenant, comparez-les à la règle métier. Que remarquez-vous ?
3. Écrivez vous-même les tests qui découlent de la règle, corrigez le code (cycles rouge → vert).

## À rendre : `REPONSES_IA.md` dans votre Pull Request

1. Complétez ce tableau :

| | A · vibe coding | B · vos tests + IA |
|---|---|---|
| Tests de recette en échec | | |
| Temps passé | | |
| Pouvez-vous expliquer chaque ligne du code ? (oui / en partie / non) | | |

2. Dans l'expérience C, les tests générés ont-ils trouvé les bugs ? Pourquoi ?
3. Dans chaque expérience, **qui** a écrit la spécification : vous, l'IA, ou personne ?
4. Mergeriez-vous la version « vibe coding » dans le `main` de votre entreprise ? Pour quels usages le vibe coding vous semble-t-il acceptable (prototype, script jetable…) ?
5. Votre avis : avec l'IA, le TDD est-il **plus** utile (les tests deviennent la spécification que l'on donne à l'IA), **moins** utile (on lit au lieu d'écrire), ou en train de changer de forme ? Argumentez.

## ✅ Terminé quand…

- [ ] La branche `vibe` existe (Pull Request brouillon), avec le résultat des tests de recette
- [ ] La branche `tdd-ia` est mergée, CI verte, tests de recette compris
- [ ] `RenewalPolicy` respecte la règle métier, prouvée par vos tests
- [ ] `REPONSES_IA.md` répond aux 5 questions
