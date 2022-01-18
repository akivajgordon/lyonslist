import React, { useState, createContext, useContext } from 'react'
import fuzzy from './fuzzy'

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
  'Dentist recommendation',
  'Electrician recommendation',
  'Ethernet cable',
  'Fax machine',
  'Flour (all-purpose and bread)',
  'Garlic powder',
  'Halloween candy',
  'Hand truck',
  'Impact driver',
  'JKHA Handbook',
  'Kettle',
  'Key copy recommendation',
  'Land survey company recommendation',
  'Monkey wrench',
  'Non-dairy (soy) milk',
  'Olive oil',
  'Pack n play',
  'Pareve chocolate chips',
  'Pediatrician recommendation',
  'Pipe wrench',
  'Plumber recommendation',
  'Power cord for old-school Norelco shaver',
  'Printer',
  'Printer recommendation',
  'Referee shirt',
  'Ricotta cheese',
  'Rosemary',
  'Sidewalk chalk',
  'Slim fit car seats',
  'Socket wrench set',
  'Star tool that comes with a Ring',
  'Toothpicks',
  'Umbrella stroller',
  'Willlingness to pilot test a survey for people with kids ages 6-10 who attend day camp',
  'Vegatable oil',
  'Yeast',
]

const services = ['Notary public']

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
        return <strong>{char}</strong>
      })}
    </>
  )
}

const ListSection: React.FC<{ title: string; items: string[] }> = ({
  title,
  items,
}) => {
  const search = useContext(SearchContext)
  const foundItems = fuzzy({
    haystack: items.sort(alphabeticAscending),
    needle: search,
  })

  return (
    <>
      <h3>{title}</h3>
      {foundItems.length ? (
        <ul>
          {foundItems.map(({ item, match }) => (
            <li key={item}>
              <FuzzyDecorator string={item} atIndexes={match.indexes} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches :(</p>
      )}
    </>
  )
}

function App() {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={search}>
      <h1>lyonslist</h1>
      <input
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ListSection title="Items" items={items} />
      <ListSection title="Skills and Services" items={services} />
    </SearchContext.Provider>
  )
}

export default App
