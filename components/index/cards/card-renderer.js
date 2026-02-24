import dynamic from 'next/dynamic'

const cache = {}

// webpackInclude scopes the context to only bundle cards listed in cards.json,
// preventing webpack from scanning all 37 files in this directory.
// Add new card names to the regex when adding entries to cards.json.
function resolveCard(componentPath) {
  if (!cache[componentPath]) {
    cache[componentPath] = dynamic(() =>
      import(
        /* webpackInclude: /\/(osint|som|athena|highway|shipwrecked|pizza)\.js$/ */
        `./${componentPath}`
      )
    )
  }
  return cache[componentPath]
}

export default function CardRenderer({ cards }) {
  return cards.map((card, idx) => {
    const Card = resolveCard(card.component)
    return <Card key={idx} />
  })
}
