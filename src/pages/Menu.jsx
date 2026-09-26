import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import FoodCard from '../components/FoodCard'
import SearchBar from '../components/SearchBar'
import { categories, menuItems } from '../data/menu'
import { filterMenu } from '../utils/helpers'

export default function Menu() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const results = useMemo(() => filterMenu(menuItems, search, category), [search, category])
  return (
    <main className="page">
      <header className="page-header container"><span className="eyebrow">Our menu</span><h1>Moroccan classics, thoughtfully made.</h1><p>Explore aromatic tagines, generous couscous, grilled specialties, and shareable starters.</p></header>
      <section className="container">
        <div className="menu-toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <div className="filter-label"><SlidersHorizontal size={18} /> Filter</div>
          <div className="category-tabs" role="group" aria-label="Menu categories">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
        </div>
        <div className="results-row"><span>{results.length} {results.length === 1 ? 'dish' : 'dishes'}</span>{(search || category !== 'All') && <button className="text-button" onClick={() => { setSearch(''); setCategory('All') }}>Reset filters</button>}</div>
        {results.length ? <div className="food-grid">{results.map((dish) => <FoodCard dish={dish} key={dish.id} />)}</div> : <div className="empty-state large"><h2>No dishes found</h2><p>Try a different search or category.</p></div>}
      </section>
    </main>
  )
}
