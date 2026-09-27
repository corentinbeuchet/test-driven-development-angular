/** Le catalogue de la bibliothèque (partie 2). Les scénarios Cucumber utilisent ces ISBN. */
export interface CatalogueBook {
  readonly isbn: string;
  readonly title: string;
}

export const CATALOGUE: readonly CatalogueBook[] = [
  { isbn: '9780132350884', title: 'Clean Code' },
  { isbn: '9780134685991', title: 'Effective Java' },
  { isbn: '9780201485677', title: 'Refactoring' },
  { isbn: '9780134494166', title: 'Clean Architecture' },
  { isbn: '9780201633610', title: 'Design Patterns' },
];
