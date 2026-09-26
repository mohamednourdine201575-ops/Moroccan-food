import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ADMIN_KEYS, getInitialAdminData, setAdminStorage } from '../utils/adminHelpers'

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [dishes, setDishes] = useState(() => getInitialAdminData().dishes)
  const [orders, setOrders] = useState(() => getInitialAdminData().orders)
  const [users, setUsers] = useState(() => getInitialAdminData().users)
  const [adminSession, setAdminSession] = useState(() => getInitialAdminData().session || null)

  useEffect(() => { setAdminStorage(ADMIN_KEYS.dishes, dishes) }, [dishes])
  useEffect(() => { setAdminStorage(ADMIN_KEYS.orders, orders) }, [orders])
  useEffect(() => { setAdminStorage(ADMIN_KEYS.users, users) }, [users])
  useEffect(() => { setAdminStorage(ADMIN_KEYS.session, adminSession) }, [adminSession])

  const addDish = (dish) => setDishes((current) => [...current, dish])
  const updateDish = (dish) => setDishes((current) => current.map((item) => item.id === dish.id ? dish : item))
  const deleteDish = (id) => setDishes((current) => current.filter((item) => item.id !== id))
  const addOrder = (order) => setOrders((current) => [...current, order])
  const updateOrder = (order) => setOrders((current) => current.map((item) => item.id === order.id ? order : item))
  const deleteOrder = (id) => setOrders((current) => current.filter((item) => item.id !== id))
  const addUser = (user) => setUsers((current) => [...current, user])
  const deleteUser = (email) => setUsers((current) => current.filter((item) => item.email !== email))
  const loginAdmin = (session) => setAdminSession(session)
  const logoutAdmin = () => setAdminSession(null)

  const value = useMemo(() => ({ dishes, orders, users, adminSession, addDish, updateDish, deleteDish, addOrder, updateOrder, deleteOrder, addUser, deleteUser, loginAdmin, logoutAdmin }), [dishes, orders, users, adminSession])
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext)
