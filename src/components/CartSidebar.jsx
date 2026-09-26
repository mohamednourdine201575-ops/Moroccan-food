import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'

export default function CartSidebar() {
  const { cart, cartOpen, setCartOpen, subtotal, updateQuantity, removeFromCart } = useApp()
  return (
    <>
      <button className={`sidebar-backdrop ${cartOpen ? 'visible' : ''}`} onClick={() => setCartOpen(false)} aria-label="Close cart" tabIndex={cartOpen ? 0 : -1} />
      <aside className={`cart-sidebar ${cartOpen ? 'open' : ''}`} aria-hidden={!cartOpen}>
        <div className="sidebar-header"><div><span className="eyebrow">Your order</span><h2>Cart</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>
        <div className="sidebar-items">
          {!cart.length && <div className="empty-state"><ShoppingBag size={42} /><h3>Your cart is empty</h3><p>Add a Moroccan favorite from our menu.</p></div>}
          {cart.map((item) => (
            <div className="cart-line" key={item.id}>
              {(() => {
                const imgSrc = item.image && item.image.startsWith('/') ? import.meta.env.BASE_URL + item.image.replace(/^\/+/, '') : item.image
                return <img src={imgSrc} alt={item.name} />
              })()}
              <div><h3>{item.name}</h3><span>{formatPrice(item.price)}</span><div className="quantity-controls"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}><Minus size={14} /></button><b>{item.quantity}</b><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}><Plus size={14} /></button></div></div>
              <button className="icon-button danger" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
            </div>
          ))}
        </div>
        <div className="sidebar-footer"><div className="total-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Taxes and delivery are calculated at checkout.</p><Link className="button button-primary button-full" to="/cart" onClick={() => setCartOpen(false)}>Review cart</Link></div>
      </aside>
    </>
  )
}
