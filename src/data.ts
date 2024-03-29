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
  { label: 'Batteries', categories: [Category.ELECTRONICS] },
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
  { label: 'Jumper cables', categories: [Category.TOOLS] },
  { label: 'Kettle', categories: [] },
  { label: 'Knee scooter', categories: [Category.TOOLS] },
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
  { label: 'Red wig', categories: [] },
  { label: 'Referee shirt', categories: [] },
  { label: 'Ricotta cheese', categories: [Category.FOOD] },
  { label: 'Rosemary', categories: [Category.FOOD] },
  { label: 'SD card', categories: [Category.ELECTRONICS] },
  { label: 'SD card adapter', categories: [Category.ELECTRONICS] },
  { label: 'Sidewalk chalk', categories: [Category.KIDS] },
  { label: 'SIM card adapter', categories: [Category.ELECTRONICS] },
  { label: 'Slim fit car seats', categories: [Category.KIDS, Category.CAR] },
  { label: 'Smart Balance', categories: [Category.FOOD] },
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
  { label: 'Auto repair shop', categories: [] },
  { label: 'Dentist', categories: [] },
  { label: 'Dermatologist', categories: [] },
  { label: 'Electrician', categories: [] },
  { label: 'HVAC company', categories: [] },
  { label: 'Key copy', categories: [] },
  { label: 'Land survey company', categories: [] },
  { label: 'Ophthalmologist', categories: [] },
  { label: 'Pediatrician', categories: [] },
  { label: 'PCR testing locations', categories: [] },
  { label: 'Plumber', categories: [] },
  { label: 'Printer', categories: [] },
]
