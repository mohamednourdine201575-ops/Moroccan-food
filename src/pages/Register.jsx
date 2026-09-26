import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { isValidEmail, isValidPassword, readStorage, STORAGE_KEYS, writeStorage } from '../utils/helpers'
import { AuthLayout } from './Login'

export default function Register() {
  const { user, setUser } = useApp()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  if (user) return <Navigate to="/" replace />
  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Enter your full name.'
    if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.'
    if (!isValidPassword(form.password)) next.password = 'Use 8+ characters with uppercase, lowercase, and a number.'
    if (form.password !== form.confirm) next.confirm = 'Passwords do not match.'
    const users = readStorage(STORAGE_KEYS.users, [])
    if (users.some((item) => item.email.toLowerCase() === form.email.toLowerCase())) next.email = 'An account with this email already exists.'
    setErrors(next)
    if (!Object.keys(next).length) {
      const saved = { name: form.name.trim(), email: form.email.trim(), password: form.password }
      writeStorage(STORAGE_KEYS.users, [...users, saved])
      setUser({ name: saved.name, email: saved.email })
    }
  }
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  return <AuthLayout title="Join our table" subtitle="Create an account to keep your favorite dishes close.">
    <form className="auth-form" onSubmit={submit} noValidate>
      <label>Full name<input name="name" value={form.name} onChange={update} />{errors.name && <span className="field-error">{errors.name}</span>}</label>
      <label>Email<input name="email" type="email" value={form.email} onChange={update} />{errors.email && <span className="field-error">{errors.email}</span>}</label>
      <label>Password<div className="password-field"><input name="password" type={show ? 'text' : 'password'} value={form.password} onChange={update} /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff /> : <Eye />}</button></div>{errors.password && <span className="field-error">{errors.password}</span>}</label>
      <label>Confirm password<input name="confirm" type="password" value={form.confirm} onChange={update} />{errors.confirm && <span className="field-error">{errors.confirm}</span>}</label>
      <button className="button button-primary button-full">Create account <ArrowRight size={18} /></button>
      <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
    </form>
  </AuthLayout>
}
