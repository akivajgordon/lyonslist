enum Category {
  KIDS,
  FOOD,
  CAR,
  ELECTRONICS,
  TOOLS,
}

export const categories: Record<Category, { label: string }> = {
  [Category.KIDS]: { label: 'kids' },
  [Category.FOOD]: { label: 'food' },
  [Category.CAR]: { label: 'car' },
  [Category.ELECTRONICS]: { label: 'electronics' },
  [Category.TOOLS]: { label: 'tools' },
}

export interface Item {
  label: string
  categories: Category[]
}

export const items: Item[] = [
  { label: 'Air mattress', categories: [Category.KIDS] },
  { label: 'Banana bread', categories: [Category.FOOD] },
  { label: 'Barley', categories: [Category.FOOD] },
  { label: 'Booster seat', categories: [Category.KIDS, Category.CAR] },
  { label: 'Brandy', categories: [Category.FOOD] },
  { label: 'Cheesecake', categories: [Category.FOOD] },
  { label: 'Chicken soup net bags', categories: [Category.FOOD] },
  { label: 'Child water bottle', categories: [Category.KIDS] },
  { label: 'Cooler bag', categories: [Category.FOOD] },
  { label: 'Ethernet cable', categories: [Category.ELECTRONICS] },
  { label: 'Fax machine', categories: [Category.ELECTRONICS] },
  { label: 'Flour (all-purpose and bread)', categories: [Category.FOOD] },
  { label: 'Garlic powder', categories: [Category.FOOD] },
  { label: 'Halloween candy', categories: [Category.FOOD] },
  { label: 'Hand truck', categories: [] },
  { label: 'Impact driver', categories: [Category.TOOLS] },
  { label: 'JKHA Handbook', categories: [] },
  { label: 'Kettle', categories: [] },
  { label: 'Monkey wrench', categories: [Category.TOOLS] },
  { label: 'Non-dairy (soy) milk', categories: [Category.FOOD] },
  { label: 'Olive oil', categories: [Category.FOOD] },
  { label: 'Pack n play', categories: [Category.KIDS] },
  { label: 'Pareve chocolate chips', categories: [Category.FOOD] },
  { label: 'Pipe wrench', categories: [Category.TOOLS] },
  {
    label: 'Power cord for old-school Norelco shaver',
    categories: [Category.ELECTRONICS],
  },
  { label: 'Printer', categories: [Category.ELECTRONICS] },
  { label: 'Referee shirt', categories: [] },
  { label: 'Ricotta cheese', categories: [Category.FOOD] },
  { label: 'Rosemary', categories: [Category.FOOD] },
  { label: 'Sidewalk chalk', categories: [Category.KIDS] },
  { label: 'Slim fit car seats', categories: [Category.KIDS, Category.CAR] },
  { label: 'Socket wrench set', categories: [Category.TOOLS] },
  { label: 'Star tool that comes with a Ring', categories: [Category.TOOLS] },
  { label: 'Toothpicks', categories: [Category.FOOD] },
  { label: 'Umbrella stroller', categories: [Category.KIDS] },
  { label: 'Vegatable oil', categories: [Category.FOOD] },
  { label: 'Yeast', categories: [Category.FOOD] },
]

export const services: Item[] = [
  { label: 'Notary public', categories: [] },
  {
    label:
      'Willingness to pilot test a survey for people with kids ages 6-10 who attend day camp',
    categories: [],
  },
]

export const recommendations: Item[] = [
  { label: 'Dentist', categories: [] },
  { label: 'Electrician', categories: [] },
  { label: 'HVAC company', categories: [] },
  { label: 'Key copy', categories: [] },
  { label: 'Land survey company', categories: [] },
  { label: 'Pediatrician', categories: [] },
  { label: 'Plumber', categories: [] },
  { label: 'Printer', categories: [] },
]
