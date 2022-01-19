import React, { useState, createContext, ReactNode } from 'react'
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

const getItems = (items: typeof services, search: string) =>
  fuzzy({
    haystack: items.sort((a, b) => alphabeticAscending(a.label, b.label)),
    needle: search,
    getSearchTerms: (item) => [item.label],
  })

const CategoriesList = ({ item }: { item: Item }) => {
  const categoriesLabels = item.categories.map((c) => categories[c].label)

  return (
    <>
      {categoriesLabels.map((label) => (
        <span className="category" key={label}>
          #{label}
        </span>
      ))}
    </>
  )
}

const ListSection: React.FC<{
  title: string
  items: FuzzyResult<typeof services[0]>[]
}> = ({ title, items }) => {
  const foundItems = items

  if (!foundItems.length) return null

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {foundItems.map(({ item, match }) => (
          <li key={item.label}>
            <FuzzyDecorator string={item.label} atIndexes={match.indexes} />
            &nbsp;
            <CategoriesList item={item} />
          </li>
        ))}
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
