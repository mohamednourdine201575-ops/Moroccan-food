import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAdmin } from '../context/AdminContext'
import { formatPrice } from '../utils/helpers'

export default function Profile() {
  const { user } = useApp()
  const { orders, users } = useAdmin()
  const navigate = useNavigate()

  const profileUser = useMemo(() => users.find((item) => item.email === user?.email), [users, user])
  const userOrders = useMemo(() => orders.filter((order) => order.userEmail === user?.email), [orders, user])
  const totalSpent = useMemo(() => userOrders.reduce((sum, order) => sum + order.items.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0), 0), [userOrders])

  if (!user) {
    return (
      <main className="page container empty-state large">
        <h1>Personal profile</h1>
        <p>Sign in to view your saved profile details and order history.</p>
        <button className="button button-primary" onClick={() => navigate('/login')}>Go to login</button>
      </main>
    )
  }

  return (
    <main className="page container profile-page">
      <section className="section profile-intro">
        <div>
          <span className="eyebrow">Welcome back</span>
          <h1>{user.name}</h1>
          <p>Here is your profile summary, saved favorites, and order activity in our Moroccan kitchen.</p>
        </div>
        <div className="profile-stats">
          <article className="glass-card"><strong>{userOrders.length}</strong><p>Orders placed</p></article>
          <article className="glass-card"><strong>{formatPrice(totalSpent)}</strong><p>Total spent</p></article>
          <article className="glass-card"><strong>{profileUser ? 'Verified' : 'Guest'}</strong><p>Account status</p></article>
        </div>
      </section>
      <section className="section profile-details glass-card">
        <h2>Profile details</h2>
        <div className="detail-grid">
          <div><span>Name</span><strong>{user.name}</strong></div>
          <div><span>Email</span><strong>{user.email}</strong></div>
          <div><span>Member since</span><strong>{profileUser ? 'Registered customer' : 'Guest account'}</strong></div>
          <div><span>Favorite dishes</span><strong>{profileUser?.favorites?.length ?? 0}</strong></div>
        </div>
      </section>
      <section className="section order-summary glass-card">
        <h2>Your recent orders</h2>
        {userOrders.length ? (
          <div className="order-grid">
            {userOrders.slice(-4).reverse().map((order) => (
              <article key={order.id} className="order-card">
                <div className="order-card-header"><span>Order #{order.id}</span><strong>{order.status}</strong></div>
                <p>{order.items.length} items • {order.items.reduce((count, item) => count + item.quantity, 0)} qty</p>
                <div className="order-footer"><span>{new Date(order.createdAt).toLocaleDateString()}</span><strong>{formatPrice(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0))}</strong></div>
              </article>
            ))}
          </div>
        ) : <p className="empty-text">No orders found yet. Check our menu and place your first order.</p>}
      </section>
    </main>
  )
}
