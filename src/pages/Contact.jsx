import { Clock3, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { validateContact } from '../utils/helpers'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validateContact(form)
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) { setSent(true); setForm({ name: '', email: '', message: '' }) }
  }
  return (
    <main className="page">
      <header className="page-header container"><span className="eyebrow">Come say salam</span><h1>We would love to host you.</h1><p>Reserve a table, plan a celebration, or ask our kitchen a question.</p></header>
      <section className="container contact-grid">
        <div className="contact-details">
          <div className="contact-image"><img src={`${import.meta.env.BASE_URL}images/couscouss2.jpg`} alt="A Moroccan couscous table ready for guests" /></div>
          <div className="contact-list">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer"><MapPin /><span><b>Visit us</b>12 Riad Zitoun, Marrakech Medina</span></a>
            <a href="tel:+212524123456"><Phone /><span><b>Call us</b>+212 524 123 456</span></a>
            <div><Clock3 /><span><b>Opening hours</b>Daily, 12:00 PM – 11:00 PM</span></div>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram /><span><b>Instagram</b>@moroccanfood</span></a>
            <a href="https://wa.me/212600123456" target="_blank" rel="noreferrer"><MessageCircle /><span><b>WhatsApp</b>Message our team</span></a>
          </div>
        </div>
        <form className="form-panel" onSubmit={submit} noValidate>
          <h2>Send a message</h2>
          {sent && <div className="success-message" role="status">Thank you. We will be in touch shortly.</div>}
          <label>Name<input name="name" value={form.name} onChange={update} aria-invalid={Boolean(errors.name)} />{errors.name && <span className="field-error">{errors.name}</span>}</label>
          <label>Email<input name="email" type="email" value={form.email} onChange={update} aria-invalid={Boolean(errors.email)} />{errors.email && <span className="field-error">{errors.email}</span>}</label>
          <label>Message<textarea name="message" rows="6" value={form.message} onChange={update} aria-invalid={Boolean(errors.message)} />{errors.message && <span className="field-error">{errors.message}</span>}</label>
          <button className="button button-primary" type="submit">Send message</button>
        </form>
      </section>
    </main>
  )
}
