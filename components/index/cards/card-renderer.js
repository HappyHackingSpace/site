import dynamic from 'next/dynamic'

const cache = {}

// webpackInclude scopes the context to only bundle cards listed in cards.json,
// preventing webpack from scanning all 37 files in this directory.
// Add new card names to the regex when adding entries to cards.json.
// ssr: false prevents hydration mismatches from Emotion + Million.js interaction.
// All cards are below the fold so client-only rendering has no UX impact.
function resolveCard(componentPath) {
  if (!cache[componentPath]) {
    cache[componentPath] = dynamic(
      () =>
        import(
          /* webpackInclude: /\/(vulnerable-target|communityHub|githubmon|awesome-hackathon|osint|som|athena|highway|shipwrecked|pizza)\.js$/ */
          `./${componentPath}`
        ),
      { ssr: false }
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
