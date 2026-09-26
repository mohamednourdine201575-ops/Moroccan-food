import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import { AuthLayout } from '../Login'

const ADMIN_CREDENTIALS = { email: 'admin@moroccanfood.com', password: 'Admin1234', name: 'Admin User' }

export default function AdminLogin() {
  const { adminSession, loginAdmin } = useAdmin()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  if (adminSession) return <Navigate to="/admin" replace />

  const submit = (event) => {
    event.preventDefault()
    const email = form.email.trim().toLowerCase()
    if (!email || !form.password) return setError('Enter a valid admin email and password.')
    if (email !== ADMIN_CREDENTIALS.email || form.password !== ADMIN_CREDENTIALS.password) {
      return setError('Admin credentials are incorrect.')
    }
    loginAdmin({ name: ADMIN_CREDENTIALS.name, email: ADMIN_CREDENTIALS.email })
    navigate(location.state?.from || '/admin', { replace: true })
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div>
          <span className="eyebrow">Admin access</span>
          <blockquote>Secure admin control for dishes, orders, customers, and reports.</blockquote>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-content">
          <h1>Admin Login</h1>
          <p>Use <strong>admin@moroccanfood.com</strong> and <strong>Admin1234</strong> to sign in.</p>
          <form className="auth-form" onSubmit={submit} noValidate>
            {error && <div className="form-error" role="alert">{error}</div>}
            <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" /></label>
            <label>Password<div className="password-field"><input type={show ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff /> : <Eye />}</button></div></label>
            <button className="button button-primary button-full">Sign in <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>
    </main>
  )
}
