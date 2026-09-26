import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import FoodCard from '../components/FoodCard'
import { useApp } from '../context/AppContext'

export default function Favorites() {
  const { favorites } = useApp()
  return <main className="page"><header className="page-header container"><span className="eyebrow">Saved for later</span><h1>Your favorites.</h1><p>The dishes you would happily order again.</p></header><section className="container">{favorites.length ? <div className="food-grid">{favorites.map((dish) => <FoodCard dish={dish} key={dish.id} />)}</div> : <div className="empty-state large"><Heart size={46} /><h2>No favorites yet</h2><p>Tap the heart on any dish to keep it here.</p><Link className="button button-primary" to="/menu">Explore the menu</Link></div>}</section></main>
}
