# language: fr

Fonctionnalité: Emprunter un livre
  En tant qu'abonné de la bibliothèque
  Je veux emprunter un livre disponible
  Afin de le lire chez moi

  @wip
  Scénario: un abonné emprunte un livre disponible
    Étant donné le livre "9780132350884" disponible
    Quand "alice" emprunte le livre "9780132350884"
    Alors l'emprunt est accepté
    Et le livre "9780132350884" n'est plus disponible

  @wip
  Scénario: un livre déjà emprunté ne peut pas l'être une seconde fois
    Étant donné le livre "9780132350884" emprunté par "bob"
    Quand "alice" emprunte le livre "9780132350884"
    Alors l'emprunt est refusé avec le motif "Livre déjà emprunté"

  @wip
  Scénario: un abonné ne peut pas avoir plus de 3 emprunts en cours
    Étant donné "alice" a déjà 3 emprunts en cours
    Et le livre "9780134685991" disponible
    Quand "alice" emprunte le livre "9780134685991"
    Alors l'emprunt est refusé avec le motif "Trop d'emprunts en cours"

  @wip
  Scénario: un livre inconnu ne peut pas être emprunté
    Quand "alice" emprunte le livre "9780000000000"
    Alors l'emprunt est refusé avec le motif "Livre inconnu"
