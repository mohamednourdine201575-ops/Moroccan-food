import { readStorage, writeStorage } from './helpers'

export const ADMIN_KEYS = {
  dishes: 'moroccanFoodAdminDishes',
  orders: 'moroccanFoodAdminOrders',
  users: 'moroccanFoodAdminUsers',
  session: 'moroccanFoodAdminSession'
}

export const defaultAdminData = {
  dishes: [
    { id: 101, name: 'Chicken Tagine', category: 'Tagines', price: 18.5, image: import.meta.env.BASE_URL + 'images/chicken-tagine.webp', description: 'Slow-braised chicken with preserved lemon, green olives, saffron, and herbs.', stock: 12 },
    { id: 102, name: 'Royal Couscous', category: 'Couscous', price: 22, image: import.meta.env.BASE_URL + 'images/Couscous.webp', description: 'Hand-rolled semolina, seven vegetables, caramelized onion, lamb, and chicken.', stock: 8 },
    { id: 103, name: 'Harira Soup', category: 'Soups', price: 9.5, image: import.meta.env.BASE_URL + 'images/Harira & Dates.webp', description: 'Velvety tomato, lentil, and chickpea soup served with sweet Medjool dates.', stock: 16 },
    { id: 104, name: 'Kefta Tagine', category: 'Tagines', price: 19, image: import.meta.env.BASE_URL + 'images/Kefta.jpeg', description: 'Beef kefta simmered in tomato sauce with baked eggs and spices.', stock: 10 },
    { id: 105, name: 'Msemen Pancakes', category: 'Breakfast', price: 7.5, image: import.meta.env.BASE_URL + 'images/msemen.jpeg', description: 'Flaky Moroccan pancakes with orange blossom honey and cultured butter.', stock: 14 },
    { id: 106, name: 'Zaalouk Salad', category: 'Starters', price: 8, image: import.meta.env.BASE_URL + 'images/Zaalouk.jpeg', description: 'Smoky eggplant and tomato salad with garlic, paprika, cumin, and olive oil.', stock: 18 }
  ],
  orders: [
    { id: 5001, userEmail: 'sara@example.com', customerName: 'Sara Elm', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), status: 'Pending', items: [{ id: 101, name: 'Chicken Tagine', price: 18.5, quantity: 1 }, { id: 103, name: 'Harira Soup', price: 9.5, quantity: 2 }] },
    { id: 5002, userEmail: 'youssef@example.com', customerName: 'Youssef Ali', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'Preparing', items: [{ id: 104, name: 'Kefta Tagine', price: 19, quantity: 2 }] },
    { id: 5003, userEmail: 'laila@example.com', customerName: 'Laila B.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), status: 'Delivered', items: [{ id: 102, name: 'Royal Couscous', price: 22, quantity: 1 }, { id: 105, name: 'Msemen Pancakes', price: 7.5, quantity: 2 }] },
    { id: 5004, userEmail: 'ismael@example.com', customerName: 'Ismael R.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), status: 'Delivered', items: [{ id: 106, name: 'Zaalouk Salad', price: 8, quantity: 3 }, { id: 103, name: 'Harira Soup', price: 9.5, quantity: 1 }] },
    { id: 5005, userEmail: 'amina@example.com', customerName: 'Amina S.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), status: 'Cancelled', items: [{ id: 102, name: 'Royal Couscous', price: 22, quantity: 1 }] }
  ],
  users: [
    { name: 'Sara Elm', email: 'sara@example.com' },
    { name: 'Youssef Ali', email: 'youssef@example.com' },
    { name: 'Laila Bouzid', email: 'laila@example.com' },
    { name: 'Ismael R.', email: 'ismael@example.com' },
    { name: 'Amina S.', email: 'amina@example.com' }
  ]
}

export function getAdminStorage(key, fallback) {
  return readStorage(key, fallback)
}

export function setAdminStorage(key, value) {
  return writeStorage(key, value)
}

export function getInitialAdminData() {
  const dishes = readStorage(ADMIN_KEYS.dishes, null)
  const orders = readStorage(ADMIN_KEYS.orders, null)
  const users = readStorage(ADMIN_KEYS.users, null)

  return {
    dishes: Array.isArray(dishes) && dishes.length ? dishes : defaultAdminData.dishes,
    orders: Array.isArray(orders) && orders.length ? orders : defaultAdminData.orders,
    users: Array.isArray(users) && users.length ? users : defaultAdminData.users,
    session: readStorage(ADMIN_KEYS.session, null)
  }
}

export const orderStatusOptions = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']

export const adminStatusMap = {
  Pending: 'pending',
  Preparing: 'preparing',
  Ready: 'ready',
  Delivered: 'delivered',
  Cancelled: 'cancelled'
}

export const formatOrderDate = (value) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))

export const getOrderRevenue = (order) => order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const getPopularDishes = (orders, dishes) => {
  const counts = orders.reduce((acc, order) => {
    order.items.forEach((item) => { acc[item.id] = (acc[item.id] || 0) + item.quantity })
    return acc
  }, {})
  return Object.entries(counts)
    .map(([id, quantity]) => ({ dish: dishes.find((item) => item.id === Number(id)) || { name: 'Unknown dish' }, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
}

export const getDailyOrderSummary = (orders) => {
  const days = {}
  orders.forEach((order) => {
    const key = new Date(order.createdAt).toISOString().slice(0, 10)
    days[key] = (days[key] || 0) + 1
  })
  return Object.entries(days).sort((a, b) => a[0].localeCompare(b[0])).map(([day, count]) => ({ day, count }))
}

export const getMonthlyRevenueSummary = (orders) => {
  const months = {}
  orders.forEach((order) => {
    const date = new Date(order.createdAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    months[key] = (months[key] || 0) + getOrderRevenue(order)
  })
  return Object.entries(months).sort((a, b) => a[0].localeCompare(b[0])).map(([month, revenue]) => ({ month, revenue }))
}
