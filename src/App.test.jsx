import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'
import { menuItems } from './data/menu'
import { STORAGE_KEYS } from './utils/helpers'

const renderApp = (path = '/') => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

describe('navigation and pages', () => {
  it('renders the home hero and featured dishes', () => {
    renderApp()
    expect(screen.getByRole('heading', { name: /soul of morocco/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Chicken Tagine', level: 3 })).toBeInTheDocument()
  })
  it.each([
    ['/menu', /moroccan classics/i],
    ['/gallery', /feast for every sense/i],
    ['/contact', /love to host you/i],
    ['/favorites', /your favorites/i],
    ['/cart', /shopping cart/i],
    ['/login', /welcome back/i],
    ['/register', /join our table/i]
  ])('renders route %s', (path, heading) => {
    renderApp(path)
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
  })
})

describe('menu search and filtering', () => {
  it('searches dishes', async () => {
    const user = userEvent.setup()
    renderApp('/menu')
    await user.type(screen.getByPlaceholderText(/search dishes/i), 'zaalouk')
    expect(screen.getByRole('heading', { name: 'Zaalouk', level: 3 })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Royal Couscous', level: 3 })).not.toBeInTheDocument()
  })
  it('filters by category', async () => {
    const user = userEvent.setup()
    renderApp('/menu')
    await user.click(screen.getByRole('button', { name: 'Seafood' }))
    expect(screen.getByRole('heading', { name: 'Chermoula Fish', level: 3 })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Chicken Tagine', level: 3 })).not.toBeInTheDocument()
  })
  it('resets filters', async () => {
    const user = userEvent.setup()
    renderApp('/menu')
    await user.click(screen.getByRole('button', { name: 'Grill' }))
    await user.click(screen.getByRole('button', { name: /reset filters/i }))
    expect(screen.getAllByRole('article')).toHaveLength(menuItems.length)
  })
})

describe('cart workflow', () => {
  it('adds a dish and persists it', async () => {
    const user = userEvent.setup()
    renderApp('/menu')
    await user.click(screen.getAllByRole('button', { name: /add to cart/i })[0])
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.cart))).toHaveLength(1)
  })
  it('increments and removes an item from the cart page', async () => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([{ ...menuItems[0], quantity: 1 }]))
    const user = userEvent.setup()
    renderApp('/cart')
    await user.click(screen.getByRole('button', { name: /increase chicken tagine/i }))
    expect(screen.getAllByText('$37.00').length).toBeGreaterThan(0)
    await user.click(screen.getByRole('button', { name: /remove chicken tagine/i }))
    expect(screen.getByRole('heading', { name: /cart is empty/i })).toBeInTheDocument()
  })
})

describe('favorites workflow', () => {
  it('adds and removes a favorite with persistence', async () => {
    const user = userEvent.setup()
    renderApp('/menu')
    const button = screen.getByRole('button', { name: /add chicken tagine to favorites/i })
    await user.click(button)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites))).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: /remove chicken tagine from favorites/i }))
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites))).toHaveLength(0)
  })
  it('renders stored favorites', () => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([menuItems[1]]))
    renderApp('/favorites')
    expect(screen.getByRole('heading', { name: 'Royal Couscous', level: 3 })).toBeInTheDocument()
  })
})

describe('form validation and authentication', () => {
  it('validates the contact form', async () => {
    const user = userEvent.setup()
    renderApp('/contact')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument()
    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })
  it('registers, stores, and starts a session', async () => {
    const user = userEvent.setup()
    renderApp('/register')
    await user.type(screen.getByLabelText(/full name/i), 'Amal Idrissi')
    await user.type(screen.getByLabelText(/^email$/i), 'amal@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'Morocco9A')
    await user.type(screen.getByLabelText(/confirm password/i), 'Morocco9A')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.users))).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.session))).toEqual({ name: 'Amal Idrissi', email: 'amal@example.com' })
  })
  it('rejects an invalid login', async () => {
    const user = userEvent.setup()
    renderApp('/login')
    await user.type(screen.getByLabelText(/email/i), 'nobody@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'WrongPass1')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/incorrect/i)
  })
  it('logs in a stored user', async () => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify([{ name: 'Samira', email: 'samira@example.com', password: 'Morocco8A' }]))
    const user = userEvent.setup()
    renderApp('/login')
    await user.type(screen.getByLabelText(/email/i), 'samira@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'Morocco8A')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText('Samira')).toBeInTheDocument()
  })
})

describe('accessibility interactions', () => {
  it('opens and closes the mobile navigation control', () => {
    renderApp()
    const toggle = screen.getByRole('button', { name: /toggle navigation/i })
    fireEvent.click(toggle)
    expect(toggle.closest('nav').querySelector('.nav-panel')).toHaveClass('open')
  })
  it('opens dish details dialog', async () => {
    const user = userEvent.setup()
    renderApp('/menu')
    const card = screen.getAllByRole('article')[0]
    await user.click(within(card).getByRole('button', { name: /details/i }))
    expect(within(card).getByRole('dialog')).toHaveAttribute('open')
  })
})
