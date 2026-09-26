import { Heart, LogIn, LogOut, Menu as MenuIcon, ShoppingBag, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const links = [['/', 'Home'], ['/menu', 'Menu'], ['/gallery', 'Gallery'], ['/contact', 'Contact']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cartCount, favorites, user, logout, setCartOpen } = useApp()
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Primary navigation">
        <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-mark">M</span><span>Moroccan <b>Food</b></span></Link>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <MenuIcon />}</button>
        <div className={`nav-panel ${open ? 'open' : ''}`}>
          <div className="nav-links">{links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}{user && <NavLink to="/profile" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>}</div>
          <div className="nav-actions">
            <Link className="nav-icon" to="/favorites" aria-label="Favorites"><Heart size={20} /><span className="badge">{favorites.length}</span></Link>
            <button className="nav-icon" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={20} /><span className="badge">{cartCount}</span></button>
            {user ? <><span className="user-chip"><UserRound size={16} />{user.name.split(' ')[0]}</span><button className="nav-icon" onClick={logout} aria-label="Log out"><LogOut size={20} /></button></> : <Link className="button button-small button-outline" to="/login"><LogIn size={17} /> Login</Link>}
          </div>
        </div>
      </nav>
    </header>
  )
}
