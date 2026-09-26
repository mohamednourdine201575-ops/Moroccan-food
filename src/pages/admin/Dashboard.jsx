import { useMemo } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { formatPrice, formatPrice as currency } from '../../utils/helpers'
import { getOrderRevenue, formatOrderDate } from '../../utils/adminHelpers'

const statusColor = {
  Pending: 'status-pending',
  Preparing: 'status-preparing',
  Ready: 'status-ready',
  Delivered: 'status-delivered',
  Cancelled: 'status-cancelled'
}

export default function Dashboard() {
  const { dishes, orders, users } = useAdmin()
  const revenue = useMemo(() => orders.reduce((sum, order) => sum + getOrderRevenue(order), 0), [orders])
  const recentOrders = orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  return (
    <div className="admin-panel">
      <div className="dashboard-grid">
        <article className="admin-card">
          <p>Total Dishes</p>
          <h2>{dishes.length}</h2>
        </article>
        <article className="admin-card">
          <p>Total Revenue</p>
          <h2>{formatPrice(revenue)}</h2>
        </article>
        <article className="admin-card">
          <p>Total Customers</p>
          <h2>{users.length}</h2>
        </article>
        <article className="admin-card">
          <p>Total Orders</p>
          <h2>{orders.length}</h2>
        </article>
      </div>
      <section className="admin-section">
        <div className="section-heading"><h2>Recent Orders</h2></div>
        {recentOrders.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName || order.userEmail || 'Guest'}</td>
                    <td>{formatOrderDate(order.createdAt)}</td>
                    <td>{formatPrice(getOrderRevenue(order))}</td>
                    <td><span className={`status-pill ${statusColor[order.status] || ''}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="empty-state"><h2>No recent orders</h2><p>The dashboard will update when orders are created.</p></div>}
      </section>
    </div>
  )
}
