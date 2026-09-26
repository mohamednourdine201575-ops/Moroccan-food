export const STORAGE_KEYS = {
  cart: 'moroccanFoodCart',
  favorites: 'moroccanFoodFavorites',
  users: 'moroccanFoodUsers',
  session: 'moroccanFoodSession'
}

export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim())
export const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
export const formatPrice = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
export const cartCount = (cart) => cart.reduce((sum, item) => sum + item.quantity, 0)
export const cartSubtotal = (cart) => cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
export const filterMenu = (items, search = '', category = 'All') => {
  const term = search.trim().toLowerCase()
  return items.filter((item) => (
    (category === 'All' || item.category === category)
    && (!term || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(term))
  ))
}

export function validateContact({ name = '', email = '', message = '' }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.'
  if (message.trim().length < 10) errors.message = 'Please enter at least 10 characters.'
  return errors
}
