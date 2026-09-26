import { useMemo } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { getDailyOrderSummary, getMonthlyRevenueSummary, getPopularDishes, getOrderRevenue } from '../../utils/adminHelpers'
import { formatPrice } from '../../utils/helpers'

export default function Reports() {
  const { orders, dishes } = useAdmin()
  const daily = useMemo(() => getDailyOrderSummary(orders), [orders])
  const monthly = useMemo(() => getMonthlyRevenueSummary(orders), [orders])
  const popular = useMemo(() => getPopularDishes(orders, dishes), [orders, dishes])
  const totalOrders = orders.length
  const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + getOrderRevenue(order), 0), [orders])

  return (
    <div className="admin-panel">
      <div className="dashboard-grid">
        <article className="admin-card"><p>Daily orders</p><h2>{daily.length}</h2></article>
        <article className="admin-card"><p>Monthly revenue</p><h2>{formatPrice(monthly.reduce((sum, item) => sum + item.revenue, 0))}</h2></article>
        <article className="admin-card"><p>Popular dishes</p><h2>{popular[0]?.dish.name || 'N/A'}</h2></article>
        <article className="admin-card"><p>Order stats</p><h2>{totalOrders}</h2></article>
      </div>
      <div className="admin-section admin-report-grid">
        <section className="admin-report-card"><h3>Daily orders</h3><ul>{daily.map((item) => <li key={item.day}><strong>{item.day}</strong><span>{item.count}</span></li>)}</ul></section>
        <section className="admin-report-card"><h3>Monthly revenue</h3><ul>{monthly.map((item) => <li key={item.month}><strong>{item.month}</strong><span>{formatPrice(item.revenue)}</span></li>)}</ul></section>
      </div>
      <section className="admin-section"><div className="section-heading"><h2>Most popular dishes</h2></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Dish</th><th>Quantity</th></tr></thead><tbody>{popular.map((item) => (<tr key={item.dish.name}><td>{item.dish.name}</td><td>{item.quantity}</td></tr>))}</tbody></table></div></section>
    </div>
  )
}
