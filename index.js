const items = [
  'Booster seat',
  'Impact driver',
  'Kettle',
  'Star tool that comes with a Ring',
  'Land survey company recommendation',
  'Barley',
  'Brandy',
  'Air mattress',
  'Hand truck',
  'Slim fit car seats',
]

document.addEventListener('DOMContentLoaded', () => {
  const searchEl = document.querySelector('#search')
  const itemsEl = document.querySelector('#items')

  const renderItems = (query) => {
    const isEmptyQuery = (query || '').length === 0
    const foundItems = isEmptyQuery
      ? items
          .sort((item, other) =>
            item.toLowerCase().localeCompare(other.toLowerCase())
          )
          .map((i) => ({ item: i }))
      : fuzzy(items, query)

    if (!foundItems.length) {
      itemsEl.innerHTML = `<p>No matches :(</p>`
      return
    }

    itemsEl.innerHTML = foundItems
      .map(
        ({ item, match }) =>
          `<li>${
            isEmptyQuery
              ? item
              : decorateString({
                  string: item,
                  atIndexes: match.indexes,
                  withDecoration: strongify,
                })
          }</li>`
      )
      .join('')
  }

  searchEl.addEventListener('input', (e) => {
    const query = e.target.value
    renderItems(query)
  })

  renderItems('')
})

const decorateString = ({ string, atIndexes, withDecoration }) => {
  let indexesIndex = 0
  return string
    .split('')
    .map((char, i) => {
      if (atIndexes[indexesIndex] !== i) return char

      ++indexesIndex
      return withDecoration(char)
    }, '')
    .join('')
}

const strongify = (c) => `<strong>${c}</strong>`

const hasEveryCharacterInOrder = (needle) => (item) =>
  new RegExp(needle.split('').join('.*'), 'i').test(item)

const matchIndexes = (needle, match) => {
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

const indexScore = (needle, match) => {
  const indexes = matchIndexes(needle, match)

  return indexes.map((index) => index - indexes[0]).reduce((a, b) => a + b, 0)
}

const bestMatch = (needle, getSearchTerms) => (candidate) => {
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

  if (!isFinite(minScore)) return { score: minScore }

  return {
    score: minScore,
    item: candidate,
    match: {
      index,
      indexes: matchIndexes(needle, getSearchTerms(candidate)[index]),
    },
  }
}

const fuzzy = (haystack, needle, getSearchTerms = (x) => [x]) =>
  haystack
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