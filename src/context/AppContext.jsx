import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS, cartCount, cartSubtotal, readStorage, writeStorage } from '../utils/helpers'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.cart, []))
  const [favorites, setFavorites] = useState(() => readStorage(STORAGE_KEYS.favorites, []))
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.session, null))
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => { writeStorage(STORAGE_KEYS.cart, cart) }, [cart])
  useEffect(() => { writeStorage(STORAGE_KEYS.favorites, favorites) }, [favorites])
  useEffect(() => { writeStorage(STORAGE_KEYS.session, user) }, [user])

  const addToCart = (dish) => {
    setCart((current) => {
      const found = current.find((item) => item.id === dish.id)
      return found
        ? current.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...dish, quantity: 1 }]
    })
    setCartOpen(true)
  }
  const updateQuantity = (id, delta) => setCart((current) => current
    .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
    .filter((item) => item.quantity > 0))
  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id))
  const toggleFavorite = (dish) => setFavorites((current) => (
    current.some((item) => item.id === dish.id)
      ? current.filter((item) => item.id !== dish.id)
      : [...current, dish]
  ))
  const logout = () => setUser(null)

  const value = useMemo(() => ({
    cart, favorites, user, cartOpen, setCartOpen, setUser, logout,
    addToCart, updateQuantity, removeFromCart, toggleFavorite,
    cartCount: cartCount(cart), subtotal: cartSubtotal(cart)
  }), [cart, favorites, user, cartOpen])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
