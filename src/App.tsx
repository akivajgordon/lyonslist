import React, { useState, createContext, ReactNode, useContext } from 'react'
import fuzzy, { FuzzyResult } from './fuzzy'
import { items, services, recommendations, Item, categories } from './data'

const alphabeticAscending = (item: string, other: string) =>
  item.toLowerCase().localeCompare(other.toLowerCase())

const SearchContext = createContext('')

const FuzzyDecorator: React.FC<{ string: string; atIndexes: number[] }> = ({
  string,
  atIndexes,
}) => {
  let indexesIndex = 0
  return (
    <>
      {string.split('').map((char, i) => {
        if (atIndexes[indexesIndex] !== i) return char

        ++indexesIndex
        return <strong key={i}>{char}</strong>
      })}
    </>
  )
}

const getSearchTerms = (isCategorySearch: boolean) => (item: Item) =>
  isCategorySearch
    ? item.categories.map((c) => categories[c].label)
    : [item.label]

const getItems = (items: typeof services, search: string) => {
  const isCategorySearch = search.startsWith('#')
  return fuzzy({
    haystack: items.sort((a, b) => alphabeticAscending(a.label, b.label)),
    needle: isCategorySearch ? search.slice(1) : search,
    getSearchTerms: getSearchTerms(isCategorySearch),
  })
}

const CategoriesList = ({
  item,
  fuzziness,
}: {
  item: Item
  fuzziness: {
    match: { index: number; indexes: number[] }
    isCategorySearch: boolean
  }
}) => {
  const categoriesLabels = item.categories.map((c) => categories[c].label)

  return (
    <>
      {categoriesLabels.map((label, i) => {
        return (
          <>
            <span className="category" key={label}>
              #
              {fuzziness.isCategorySearch && i === fuzziness.match.index ? (
                <FuzzyDecorator
                  string={label}
                  atIndexes={fuzziness.match.indexes}
                />
              ) : (
                label
              )}
            </span>
            &nbsp;
          </>
        )
      })}
    </>
  )
}

const ListSection: React.FC<{
  title: string
  items: FuzzyResult<typeof services[0]>[]
}> = ({ title, items }) => {
  const search = useContext(SearchContext)
  const isCategorySearch = search.startsWith('#')
  const foundItems = items

  if (!foundItems.length) return null

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {foundItems.map(({ item, match }) => {
          console.log(match.index)
          const searchTerms = getSearchTerms(isCategorySearch)(item)

          return (
            <li key={item.label}>
              {isCategorySearch ? (
                item.label
              ) : (
                <FuzzyDecorator string={item.label} atIndexes={match.indexes} />
              )}
              &nbsp;
              <CategoriesList
                item={item}
                fuzziness={{ match, isCategorySearch }}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

const NoResults = () => <div className="note">😞 No results</div>

const Stack = ({ children }: { children: ReactNode }) => {
  return <div className="stack">{children}</div>
}

function App() {
  const [search, setSearch] = useState('')

  const filteredItems = getItems(items, search)
  const filteredServices = getItems(services, search)
  const filteredRecommendations = getItems(recommendations, search)

  const noResults = ![
    ...filteredItems,
    ...filteredServices,
    ...filteredRecommendations,
  ].length

  return (
    <SearchContext.Provider value={search}>
      <Stack>
        <h1>lyonslist</h1>
        <div>
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <p className="typography muted">
            Tip: start with <code>#</code> to filter by category.
          </p>
        </div>
        {noResults ? (
          <NoResults />
        ) : (
          <>
            <ListSection title="Items" items={filteredItems} />
            <ListSection title="Skills and Services" items={filteredServices} />
            <ListSection
              title="Recommendations"
              items={filteredRecommendations}
            />
          </>
        )}
      </Stack>
    </SearchContext.Provider>
  )
}

export default App
