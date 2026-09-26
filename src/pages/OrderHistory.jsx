import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAdmin } from '../context/AdminContext'
import { formatPrice } from '../utils/helpers'

export default function OrderHistory() {
  const { user } = useApp()
  const { orders } = useAdmin()
  const navigate = useNavigate()
  const userOrders = useMemo(() => orders.filter((order) => order.userEmail === user?.email), [orders, user])

  if (!user) {
    return (
      <main className="page container empty-state large">
        <h1>Order history</h1>
        <p>Sign in to see your order history.</p>
        <button className="button button-primary" onClick={() => navigate('/login')}>Sign in</button>
      </main>
    )
  }

  return (
    <main className="page container order-history-page">
      <section className="section">
        <div className="section-heading"><div><span className="eyebrow">My orders</span><h2>All your past orders</h2></div></div>
        {userOrders.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table order-history-table">
              <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {userOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.items.length}</td>
                    <td>{formatPrice(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0))}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="empty-state"><h2>No orders yet</h2><p>Your past orders will appear here once placed.</p></div>}
      </section>
    </main>
  )
}
