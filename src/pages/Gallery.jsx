const images = [
  [import.meta.env.BASE_URL + 'images/tajine2.webp', 'Glazed tagine with vegetables'],
  [import.meta.env.BASE_URL + 'images/Couscous.webp', 'Royal couscous platter'],
  [import.meta.env.BASE_URL + 'images/pastilla.jpeg', 'Crisp Moroccan pastilla'],
  [import.meta.env.BASE_URL + 'images/chermoula-fish.jpeg', 'Fish with fresh chermoula'],
  [import.meta.env.BASE_URL + 'images/mechoui.jpeg', 'Slow roasted mechoui lamb'],
  [import.meta.env.BASE_URL + 'images/msemen.jpeg', 'Freshly folded msemen'],
  [import.meta.env.BASE_URL + 'images/Zaalouk.jpeg', 'Smoky zaalouk salad'],
  [import.meta.env.BASE_URL + 'images/Harira & Dates 2.webp', 'Harira soup and dates']
]

export default function Gallery() {
  return (
    <main className="page">
      <header className="page-header container"><span className="eyebrow">At our table</span><h1>A feast for every sense.</h1><p>Colors, textures, and traditions from our kitchen in the heart of Marrakech.</p></header>
      <section className="container gallery-grid">{images.map(([src, alt], index) => <figure className={`gallery-item item-${index + 1}`} key={src}><img src={src} alt={alt} loading="lazy" /><figcaption>{alt}</figcaption></figure>)}</section>
    </main>
  )
}
