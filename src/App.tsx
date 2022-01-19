import React, { useState, createContext, ReactNode } from 'react'
import fuzzy, { FuzzyResult } from './fuzzy'

const items = [
  'Air mattress',
  'Banana bread',
  'Barley',
  'Booster seat',
  'Brandy',
  'Cheesecake',
  'Chicken soup net bags',
  'Child water bottle',
  'Cooler bag',
  'Ethernet cable',
  'Fax machine',
  'Flour (all-purpose and bread)',
  'Garlic powder',
  'Halloween candy',
  'Hand truck',
  'Impact driver',
  'JKHA Handbook',
  'Kettle',
  'Monkey wrench',
  'Non-dairy (soy) milk',
  'Olive oil',
  'Pack n play',
  'Pareve chocolate chips',
  'Pipe wrench',
  'Power cord for old-school Norelco shaver',
  'Printer',
  'Referee shirt',
  'Ricotta cheese',
  'Rosemary',
  'Sidewalk chalk',
  'Slim fit car seats',
  'Socket wrench set',
  'Star tool that comes with a Ring',
  'Toothpicks',
  'Umbrella stroller',
  'Vegatable oil',
  'Yeast',
]

const services = [
  'Notary public',
  'Willingness to pilot test a survey for people with kids ages 6-10 who attend day camp',
]

const recommendations = [
  'Dentist',
  'Electrician',
  'Key copy',
  'Land survey company',
  'Pediatrician',
  'Plumber',
  'Printer',
]

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

const getItems = (items: string[], search: string) =>
  fuzzy({
    haystack: items.sort(alphabeticAscending),
    needle: search,
  })
const ListSection: React.FC<{ title: string; items: FuzzyResult[] }> = ({
  title,
  items,
}) => {
  const foundItems = items

  if (!foundItems.length) return null

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {foundItems.map(({ item, match }) => (
          <li key={item}>
            <FuzzyDecorator string={item} atIndexes={match.indexes} />
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
