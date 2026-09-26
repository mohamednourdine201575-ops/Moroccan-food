export const menuItems = [
  { id: 1, name: 'Chicken Tagine', category: 'Tagines', price: 18.5, image: import.meta.env.BASE_URL + 'images/chicken-tagine.webp', description: 'Slow-braised chicken with preserved lemon, green olives, saffron, and herbs.', featured: true },
  { id: 2, name: 'Royal Couscous', category: 'Couscous', price: 22, image: import.meta.env.BASE_URL + 'images/Couscous.webp', description: 'Hand-rolled semolina, seven vegetables, caramelized onion, lamb, and chicken.', featured: true },
  { id: 3, name: 'Harira & Dates', category: 'Soups', price: 9.5, image: import.meta.env.BASE_URL + 'images/Harira & Dates.webp', description: 'Velvety tomato, lentil, and chickpea soup served with sweet Medjool dates.', featured: true },
  { id: 4, name: 'Chicken Pastilla', category: 'Specialties', price: 17, image: import.meta.env.BASE_URL + 'images/pastilla.jpeg', description: 'Crisp warqa pastry layered with spiced chicken, almonds, cinnamon, and sugar.' },
  { id: 5, name: 'Chermoula Fish', category: 'Seafood', price: 21.5, image: import.meta.env.BASE_URL + 'images/chermoula-fish.jpeg', description: 'Market fish marinated in coriander, cumin, paprika, garlic, and fresh lemon.' },
  { id: 6, name: 'Kefta Tagine', category: 'Tagines', price: 19, image: import.meta.env.BASE_URL + 'images/Kefta.jpeg', description: 'Hand-rolled beef kefta simmered in tomato sauce with baked free-range eggs.' },
  { id: 7, name: 'Mechoui Lamb', category: 'Grill', price: 26, image: import.meta.env.BASE_URL + 'images/mechoui.jpeg', description: 'Tender slow-roasted lamb shoulder with cumin salt and roasted vegetables.' },
  { id: 8, name: 'Msemen', category: 'Breakfast', price: 7.5, image: import.meta.env.BASE_URL + 'images/msemen.jpeg', description: 'Flaky square Moroccan pancakes with orange blossom honey and cultured butter.' },
  { id: 9, name: 'Zaalouk', category: 'Starters', price: 8, image: import.meta.env.BASE_URL + 'images/Zaalouk.jpeg', description: 'Smoky eggplant and tomato salad with garlic, paprika, cumin, and olive oil.' }
]

export const categories = ['All', ...new Set(menuItems.map((item) => item.category))]
