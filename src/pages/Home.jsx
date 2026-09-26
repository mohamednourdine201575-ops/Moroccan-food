import { ArrowRight, Clock3, MapPin, Star, Smile, Sparkles, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import FoodCard from '../components/FoodCard'
import { menuItems } from '../data/menu'

const featured = menuItems.filter((dish) => dish.featured)
const topSellers = menuItems.slice(0, 4)

export default function Home() {
  return (
    <main>
      <section className="hero hero-modern">
        <div className="container hero-content hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">A table rooted in tradition</span>
            <h1>The soul of Morocco, served in every bite.</h1>
            <p>Experience polished Moroccan dining with rich tagines, fragrant couscous, and warm hospitality under a dark, elegant atmosphere.</p>
            <div className="hero-actions"><Link className="button button-primary" to="/menu">Explore the menu <ArrowRight size={18} /></Link><Link className="button button-glass" to="/contact">Reserve a table</Link></div>
            <div className="hero-facts">
              <span><Star size={17} fill="currentColor" /> 4.9 guest rating</span>
              <span><Clock3 size={17} /> Open daily 12–11 PM</span>
              <span><MapPin size={17} /> Marrakech Medina</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <img src={`${import.meta.env.BASE_URL}images/tajine.jpg`} alt="Moroccan tagine" />
              <div className="hero-card-body">
                <span className="eyebrow">Chef's recommendation</span>
                <h3>Signature Tagine</h3>
                <p>Slow-braised chicken with preserved lemon, olives, and saffron served in a warm tagine pot.</p>
              </div>
            </div>
            <div className="hero-card small-card">
              <span className="eyebrow">Popular choice</span>
              <h4>Moroccan Couscous</h4>
              <p>Seasonal vegetables and spice blend, finished with crispy almonds and golden raisins.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section container best-sellers-section">
        <div className="section-heading"><div><span className="eyebrow">Best sellers</span><h2>Most loved dishes</h2></div><Link className="text-link" to="/menu">See full menu <ArrowRight size={17} /></Link></div>
        <div className="food-grid">{topSellers.map((dish) => <FoodCard dish={dish} key={dish.id} />)}</div>
      </section>
      <section className="section container special-section">
        <div className="special-grid">
          <div className="glass-card special-card">
            <span className="eyebrow">Today’s special</span>
            <h2>Harira & Dates</h2>
            <p>Light, fragrant, and full of Moroccan spice. Served with warm bread and almond dates.</p>
            <div className="special-meta"><span><Heart size={16} /> Chef favorite</span><span>Seasonal recipe</span></div>
          </div>
          <div className="glass-card review-card">
            <span className="eyebrow">Reviews</span>
            <h2>Guest ratings</h2>
            <div className="review-score"><strong>4.9</strong><span>/ 5</span></div>
            <div className="review-stats"><p>95% of guests recommend us</p><p>150+ reviews this month</p></div>
          </div>
        </div>
      </section>
      <section className="section container testimonials-section">
        <div className="section-heading"><div><span className="eyebrow">Testimonials</span><h2>What our guests say</h2></div></div>
        <div className="testimonial-grid">
          <article className="glass-card testimonial-card"><p>“The flavors are authentic and the atmosphere feels like a Moroccan feast. Service was warm and attentive.”</p><div><strong>Sara Elm</strong><span>Food blogger</span></div></article>
          <article className="glass-card testimonial-card"><p>“A beautiful restaurant experience with modern touches. Every dish was perfectly seasoned and memorable.”</p><div><strong>Youssef Ali</strong><span>Local guide</span></div></article>
          <article className="glass-card testimonial-card"><p>“From the first bite to the last sip of mint tea, it felt like a true Moroccan celebration.”</p><div><strong>Amina S</strong><span>Traveler</span></div></article>
        </div>
      </section>
      <section className="section container about-newsletter-section">
        <div className="about-card glass-card">
          <span className="eyebrow">About us</span>
          <h2>Modern Moroccan hospitality</h2>
          <p>We blend traditional ingredients with contemporary presentation, creating an elegant restaurant platform for guests who love memorable dining.</p>
          <div className="about-highlights"><span><Sparkles size={18} /> Curated seasonal dishes</span><span><Smile size={18} /> Warm guest service</span></div>
        </div>
        <div className="newsletter-card glass-card">
          <span className="eyebrow">Stay in touch</span>
          <h2>Join our newsletter</h2>
          <p>Get exclusive offers, new dish announcements, and festive menu updates directly to your inbox.</p>
          <form className="newsletter-form"><input type="email" placeholder="Your email" /><button className="button button-primary">Subscribe</button></form>
        </div>
      </section>
    </main>
  )
}
