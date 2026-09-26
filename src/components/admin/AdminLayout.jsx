import { BarChart3, Box, FileText, LayoutDashboard, List, Settings, ShoppingBag, Users, LogOut } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const links = [
  ['/admin', 'Dashboard', LayoutDashboard],
  ['/admin/dishes', 'Dishes', Box],
  ['/admin/orders', 'Orders', ShoppingBag],
  ['/admin/users', 'Users', Users],
  ['/admin/reports', 'Reports', BarChart3],
  ['/admin/settings', 'Settings', Settings]
]

export default function AdminLayout() {
  const { logoutAdmin, adminSession } = useAdmin()
  const navigate = useNavigate()
  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login')
  }

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-mark">M</span>
          <div>
            <strong>Moroccan Food</strong>
            <p>Admin panel</p>
          </div>
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {links.map(([path, label, Icon]) => (
            <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''} end={path === '/admin'}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span>Signed in as</span>
          <strong>{adminSession?.name || 'Administrator'}</strong>
          <button className="button button-outline button-small" onClick={handleLogout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1>Control center</h1>
          </div>
          <button className="button button-primary" onClick={handleLogout}>Logout</button>
        </header>
        <div className="admin-content"><Outlet /></div>
      </section>
    </main>
  )
}
