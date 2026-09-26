import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'

export default function Cart() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useApp()
  const delivery = subtotal >= 50 || !subtotal ? 0 : 5
  const tax = subtotal * 0.08
  const total = subtotal + delivery + tax
  return <main className="page"><header className="page-header container"><span className="eyebrow">Your order</span><h1>Shopping cart.</h1><p>Review your selections before checkout.</p></header><section className="container cart-page">
    {!cart.length ? <div className="empty-state large"><ShoppingBag size={46} /><h2>Your cart is empty</h2><p>Your next favorite dish is waiting.</p><Link className="button button-primary" to="/menu">Browse the menu</Link></div> : <>
      <div className="cart-table">{cart.map((item) => <article className="cart-page-line" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-info"><span>{item.category}</span><h2>{item.name}</h2><p>{formatPrice(item.price)} each</p></div><div className="quantity-controls large"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}><Minus /></button><b>{item.quantity}</b><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}><Plus /></button></div><strong>{formatPrice(item.price * item.quantity)}</strong><button className="icon-button danger" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 /></button></article>)}</div>
      <aside className="order-summary"><span className="eyebrow">Summary</span><h2>Order total</h2><div><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div><span>Delivery</span><b>{delivery ? formatPrice(delivery) : 'Free'}</b></div><div><span>Estimated tax</span><b>{formatPrice(tax)}</b></div><div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div><button className="button button-primary button-full" onClick={() => window.alert('Checkout demo: your order is ready to be submitted.')}>Proceed to checkout</button><p>Free delivery on orders over $50.</p></aside>
    </>}
  </section></main>
}
