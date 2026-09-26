import { useMemo, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { formatPrice } from '../../utils/helpers'

const defaultForm = { id: null, name: '', category: 'Tagines', price: '', image: '', description: '' }

export default function Dishes() {
  const { dishes, addDish, updateDish, deleteDish } = useAdmin()
  const [form, setForm] = useState(defaultForm)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  const categories = useMemo(() => ['All', ...new Set(dishes.map((item) => item.category))], [dishes])
  const [category, setCategory] = useState('All')
  const filteredDishes = useMemo(() => dishes.filter((dish) => {
    const term = search.trim().toLowerCase()
    return (
      (category === 'All' || dish.category === category)
      && (!term || `${dish.name} ${dish.description} ${dish.category}`.toLowerCase().includes(term))
    )
  }), [dishes, search, category])

  const saveDish = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.price || !form.category.trim()) {
      return setMessage('Dish name, price and category are required.')
    }
    const nextDish = { ...form, price: Number(form.price), id: form.id || Date.now(), stock: form.stock || 10 }
    if (form.id) updateDish(nextDish)
    else addDish(nextDish)
    setForm(defaultForm)
    setMessage('Dish saved successfully.')
  }

  const editDish = (dish) => setForm({ ...dish, price: dish.price.toString() })
  const removeDish = (id) => deleteDish(id)

  return (
    <div className="admin-panel">
      <div className="admin-section admin-form-panel">
        <div className="section-heading"><h2>{form.id ? 'Edit dish' : 'Add new dish'}</h2></div>
        <form className="admin-form" onSubmit={saveDish}>
          {message && <div className="success-message">{message}</div>}
          <label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label>Category<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} /></label>
          <label>Price<input type="number" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label>
          <label>Image URL<input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} /></label>
          <label>Description<textarea rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          <div className="form-actions">
            <button className="button button-primary">Save dish</button>
            {form.id && <button type="button" className="button button-outline" onClick={() => setForm(defaultForm)}>Cancel</button>}
          </div>
        </form>
      </div>
      <section className="admin-section">
        <div className="section-heading"><h2>Dish catalog</h2></div>
        <div className="admin-controls">
          <input className="admin-search" placeholder="Search dishes..." value={search} onChange={(event) => setSearch(event.target.value)} />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        {filteredDishes.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
              <tbody>
                {filteredDishes.map((dish) => (
                  <tr key={dish.id}>
                    <td>{dish.name}</td>
                    <td>{dish.category}</td>
                    <td>{formatPrice(dish.price)}</td>
                    <td>{dish.stock ?? 'N/A'}</td>
                    <td className="table-actions">
                      <button className="button button-small button-outline" onClick={() => editDish(dish)}>Edit</button>
                      <button className="button button-small danger" onClick={() => removeDish(dish.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="empty-state"><h2>No dishes found</h2><p>Create a new dish to populate the menu.</p></div>}
      </section>
    </div>
  )
}
