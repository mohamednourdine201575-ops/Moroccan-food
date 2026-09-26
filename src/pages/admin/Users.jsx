import { useMemo, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { formatOrderDate, getOrderRevenue } from '../../utils/adminHelpers'
import { formatPrice } from '../../utils/helpers'

export default function Users() {
  const { users, orders, deleteUser } = useAdmin()
  const [search, setSearch] = useState('')
  const [selectedEmail, setSelectedEmail] = useState(null)
  const filtered = useMemo(() => users.filter((user) => {
    const term = search.trim().toLowerCase()
    return !term || `${user.name} ${user.email}`.toLowerCase().includes(term)
  }), [users, search])
  const history = selectedEmail ? orders.filter((order) => order.userEmail === selectedEmail) : []

  return (
    <div className="admin-panel">
      <div className="admin-section">
        <div className="section-heading"><h2>User management</h2></div>
        <div className="admin-controls">
          <input className="admin-search" placeholder="Search users..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </div>
      <div className="admin-split">
        <div className="admin-table-wrap admin-panel-block">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.email} className={selectedEmail === user.email ? 'selected-row' : ''}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="table-actions">
                    <button className="button button-small" onClick={() => setSelectedEmail(user.email)}>History</button>
                    <button className="button button-small danger" onClick={() => deleteUser(user.email)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="admin-panel-block admin-user-history">
          <div className="section-heading"><h2>Order history</h2></div>
          {selectedEmail ? (
            history.length ? (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Order</th><th>Date</th><th>Total</th></tr></thead>
                  <tbody>
                    {history.map((order) => (
                      <tr key={order.id}><td>#{order.id}</td><td>{formatOrderDate(order.createdAt)}</td><td>{formatPrice(getOrderRevenue(order))}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <div className="empty-state"><h2>No orders for this user</h2><p>Select another user or wait for purchases to arrive.</p></div>
          ) : <div className="empty-state"><h2>Select a user</h2><p>Click "History" to inspect order activity.</p></div>}
        </div>
      </div>
    </div>
  )
}
