import { useMemo, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { orderStatusOptions, formatOrderDate, getOrderRevenue } from '../../utils/adminHelpers'
import { formatPrice } from '../../utils/helpers'

export default function Orders() {
  const { orders, updateOrder, deleteOrder } = useAdmin()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const filtered = useMemo(() => orders.filter((order) => {
    const term = search.trim().toLowerCase()
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    const matchesText = !term || `${order.id} ${order.customerName || order.userEmail || ''} ${order.status}`.toLowerCase().includes(term)
    return matchesStatus && matchesText
  }), [orders, search, statusFilter])

  const setStatus = (order, status) => updateOrder({ ...order, status })
  const remove = (id) => deleteOrder(id)

  return (
    <div className="admin-panel">
      <div className="admin-section">
        <div className="section-heading"><h2>Order management</h2></div>
        <div className="admin-controls">
          <input className="admin-search" placeholder="Search orders..." value={search} onChange={(event) => setSearch(event.target.value)} />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="All">All statuses</option>
            {orderStatusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>
      {filtered.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName || order.userEmail || 'Guest'}</td>
                  <td>{formatOrderDate(order.createdAt)}</td>
                  <td>{formatPrice(getOrderRevenue(order))}</td>
                  <td>
                    <select value={order.status} onChange={(event) => setStatus(order, event.target.value)}>
                      {orderStatusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </td>
                  <td className="table-actions"><button className="button button-small danger" onClick={() => remove(order.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <div className="empty-state"><h2>No orders found</h2><p>Orders will appear when customers place them.</p></div>}
    </div>
  )
}
