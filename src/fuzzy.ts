const hasEveryCharacterInOrder = (needle: string) => (item: string) =>
  new RegExp(needle.split('').join('.*'), 'i').test(item)

const matchIndexes = (needle: string, match: string) => {
  const needleChars = needle.split('')
  const matchChars = match.split('')

  const indexes = []
  let needleIndex = 0

  for (let i = 0; i < matchChars.length; i++) {
    if (
      needleChars[needleIndex].toLowerCase() === matchChars[i].toLowerCase()
    ) {
      indexes.push(i)
      ++needleIndex

      if (needleIndex >= needleChars.length) break
    }
  }

  return indexes
}

const indexScore = (needle: string, match: string) => {
  const indexes = matchIndexes(needle, match)

  return indexes.map((index) => index - indexes[0]).reduce((a, b) => a + b, 0)
}

const bestMatch =
  <T>(needle: string, getSearchTerms: (s: T) => string[]) =>
  (candidate: T) => {
    const { minScore, index } = getSearchTerms(candidate)
      .map((term) =>
        hasEveryCharacterInOrder(needle)(term)
          ? indexScore(needle, term)
          : Infinity
      )
      .reduce(
        ({ minScore, index }, score, i) => {
          if (score < minScore) return { minScore: score, index: i }

          return { minScore, index }
        },
        { minScore: Infinity, index: 0 }
      )

    if (!isFinite(minScore))
      return {
        score: minScore,
        item: candidate,
        match: { index, indexes: [0] },
      }

    return {
      score: minScore,
      item: candidate,
      match: {
        index,
        indexes: matchIndexes(needle, getSearchTerms(candidate)[index]),
      },
    }
  }

export interface FuzzyResult<T> {
  item: T
  match: { indexes: number[] }
}

export default <T>({
  haystack,
  needle,
  getSearchTerms,
}: {
  haystack: T[]
  needle: string
  getSearchTerms(o: T): string[]
}): FuzzyResult<T>[] =>
  (needle || '').length
    ? haystack
        .map(bestMatch(needle, getSearchTerms))
        .filter(({ score }) => isFinite(score))
        .sort((match, other) => {
          const matchScore = match.score
          const otherScore = other.score

          const scoreDiff = matchScore - otherScore

          if (scoreDiff === 0) {
            return match.match.indexes[0] - other.match.indexes[0]
          }

          return scoreDiff
        })
    : haystack.map((s) => ({ item: s, match: { indexes: [-1] } }))
