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
    const foundItems = items.filter((item) =>
      item.toLowerCase().startsWith(query)
    )

    if (!foundItems.length) {
      itemsEl.innerHTML = `<p>No matches :(</p>`
      return
    }

    itemsEl.innerHTML = foundItems.map((item) => `<li>${item}</li>`).join('')
  }

  searchEl.addEventListener('input', (e) => {
    const query = e.target.value
    renderItems(query)
  })

  renderItems('')
})
