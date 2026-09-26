import { Route, Routes } from 'react-router-dom'
import CartSidebar from './components/CartSidebar'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { AppProvider } from './context/AppContext'
import { AdminProvider } from './context/AdminContext'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Register from './pages/Register'
import Profile from './pages/Profile'
import OrderHistory from './pages/OrderHistory'
import OrderTracking from './pages/OrderTracking'
import AdminLogin from './pages/admin/Login'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Dashboard from './pages/admin/Dashboard'
import Dishes from './pages/admin/Dishes'
import Orders from './pages/admin/Orders'
import Users from './pages/admin/Users'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'

export default function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <Navbar />
        <CartSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="dishes" element={<Dishes />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<main className="page container empty-state large"><h1>Page not found</h1><a className="button button-primary" href="/">Return home</a></main>} />
        </Routes>
        <Footer />
      </AdminProvider>
    </AppProvider>
  )
}
