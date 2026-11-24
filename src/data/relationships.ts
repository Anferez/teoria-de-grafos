export const people = ['Rodrigo', 'Cho', 'Arturo', 'Nicolas', 'Samuel'] as const

export type Person = (typeof people)[number]

export const relationships: readonly (readonly [Person, Person])[] = [
  ['Rodrigo', 'Cho'],
  ['Rodrigo', 'Arturo'],
  ['Cho', 'Arturo'],
  ['Arturo', 'Nicolas'],
  ['Nicolas', 'Samuel'],
  ['Samuel', 'Rodrigo'],
  ['Samuel', 'Arturo'],
]

export function follows(from: Person, to: Person) {
  return relationships.some(([source, target]) => source === from && target === to)
}
