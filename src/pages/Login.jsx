import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { isValidEmail, readStorage, STORAGE_KEYS } from '../utils/helpers'

export default function Login() {
  const { user, setUser } = useApp()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  if (user) return <Navigate to={location.state?.from || '/'} replace />
  const submit = (event) => {
    event.preventDefault()
    if (!isValidEmail(form.email) || !form.password) return setError('Enter a valid email and password.')
    const users = readStorage(STORAGE_KEYS.users, [])
    const found = users.find((item) => item.email.toLowerCase() === form.email.toLowerCase() && item.password === form.password)
    if (!found) return setError('Email or password is incorrect.')
    setUser({ name: found.name, email: found.email })
  }
  return <AuthLayout title="Welcome back" subtitle="Sign in to access your favorites and saved cart.">
    <form className="auth-form" onSubmit={submit} noValidate>
      {error && <div className="form-error" role="alert">{error}</div>}
      <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" /></label>
      <label>Password<div className="password-field"><input type={show ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff /> : <Eye />}</button></div></label>
      <button className="button button-primary button-full">Sign in <ArrowRight size={18} /></button>
      <p className="auth-switch">New to our table? <Link to="/register">Create an account</Link></p>
    </form>
  </AuthLayout>
}

export function AuthLayout({ title, subtitle, children }) {
  return <main className="auth-page"><section className="auth-visual"><div><span className="eyebrow">Moroccan Food</span><blockquote>“The shared table is where every good story begins.”</blockquote></div></section><section className="auth-panel"><Link className="brand" to="/"><span className="brand-mark">M</span><span>Moroccan <b>Food</b></span></Link><div className="auth-content"><h1>{title}</h1><p>{subtitle}</p>{children}</div></section></main>
}
