import { Heart, Plus, Utensils } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'

export default function FoodCard({ dish }) {
  const { addToCart, favorites, toggleFavorite } = useApp()
  const favorite = favorites.some((item) => item.id === dish.id)
  return (
    <article className="food-card">
      <div className="food-card-media">
        <img src={dish.image} alt={dish.name} loading="lazy" />
        <span className="category-tag">{dish.category}</span>
        <button className={`favorite-button ${favorite ? 'active' : ''}`} onClick={() => toggleFavorite(dish)} aria-label={`${favorite ? 'Remove' : 'Add'} ${dish.name} ${favorite ? 'from' : 'to'} favorites`}>
          <Heart size={19} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="food-card-body">
        <div className="food-card-heading"><h3>{dish.name}</h3><strong>{formatPrice(dish.price)}</strong></div>
        <p>{dish.description}</p>
        <div className="food-card-actions">
          <button className="button button-primary" onClick={() => addToCart(dish)}><Plus size={18} /> Add to cart</button>
          <button className="button button-quiet" onClick={() => document.getElementById(`details-${dish.id}`)?.showModal()}><Utensils size={17} /> Details</button>
        </div>
      </div>
      <dialog id={`details-${dish.id}`} className="dish-dialog">
        <button className="dialog-close" onClick={(event) => event.currentTarget.closest('dialog').close()} aria-label="Close">×</button>
        <img src={dish.image} alt="" />
        <div><span className="eyebrow">{dish.category}</span><h2>{dish.name}</h2><p>{dish.description}</p><strong>{formatPrice(dish.price)}</strong></div>
      </dialog>
    </article>
  )
}
