import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-box">
      <Search size={19} aria-hidden="true" />
      <span className="sr-only">Search the menu</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search dishes, ingredients..." />
      {value && <button type="button" className="icon-button" onClick={() => onChange('')} aria-label="Clear search"><X size={17} /></button>}
    </label>
  )
}
