import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useAdmin } from '../context/AdminContext'

export default function OrderTracking() {
  const { user } = useApp()
  const { orders } = useAdmin()
  const [code, setCode] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  const findOrder = (event) => {
    event.preventDefault()
    const next = orders.find((item) => String(item.id) === code.trim() && item.userEmail === user?.email)
    if (!next) {
      setOrder(null)
      return setError('Order not found. Please check your order number.')
    }
    setError('')
    setOrder(next)
  }

  return (
    <main className="page container order-tracking-page">
      <section className="section glass-card tracking-panel">
        <div className="section-heading"><div><span className="eyebrow">Track order</span><h2>Enter your order number</h2></div></div>
        <form className="tracking-form" onSubmit={findOrder}>
          <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Order #" />
          <button className="button button-primary">Track</button>
        </form>
        {error && <p className="field-error">{error}</p>}
        {order && (
          <div className="tracking-result glass-card">
            <p>Order #{order.id}</p>
            <p>Status: <strong>{order.status}</strong></p>
            <div className="tracking-steps">
              {['Pending', 'Preparing', 'Ready', 'Delivered'].map((step) => (
                <div key={step} className={`step ${order.status === step || ['Ready', 'Delivered'].includes(order.status) && step === 'Ready' || order.status === 'Delivered' ? 'active' : ''}`}><span>{step}</span></div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
