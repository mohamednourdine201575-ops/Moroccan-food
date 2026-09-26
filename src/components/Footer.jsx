import { Instagram, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><Link className="brand" to="/"><span className="brand-mark">M</span><span>Moroccan <b>Food</b></span></Link><p>Recipes carried by generations, served with a modern Moroccan spirit.</p></div>
        <div><h3>Explore</h3><Link to="/menu">Our menu</Link><Link to="/gallery">Gallery</Link><Link to="/favorites">Favorites</Link></div>
        <div><h3>Visit</h3><p><MapPin size={16} /> 12 Riad Zitoun, Marrakech</p><a href="tel:+212524123456"><Phone size={16} /> +212 524 123 456</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={16} /> @moroccanfood</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Moroccan Food</span><span>Made with Moroccan hospitality</span></div>
    </footer>
  )
}
