import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'
import { useSearchStore } from '@/lib/store'

const FEATURED = PRODUCTS.filter((p) => ['Bestseller', 'Bio'].includes(p.badge)).slice(0, 4)

const TRUST_ITEMS = [
  { icon: '📱', text: 'Orange Money & Moov Money' },
  { icon: '🚚', text: 'Livraison à domicile 7j/7' },
  { icon: '✅', text: 'Produits certifiés Made in Burkina' },
  { icon: '🔄', text: 'Retours faciles sous 7 jours' },
]

export default function Home() {
  const { setCategory } = useSearchStore()

  const handleCategory = (catId) => {
    setCategory(catId)
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-faso-800 relative overflow-hidden py-16 md:py-20 px-[5vw]">
        {/* Decorative circles */}
        <div className="absolute -top-10 right-[10%] w-72 h-72 rounded-full bg-white opacity-[0.04]" />
        <div className="absolute -bottom-14 left-[5%] w-44 h-44 rounded-full bg-white opacity-[0.03]" />

        <div className="max-w-2xl relative">
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-5 text-xs text-faso-200 font-semibold tracking-wide">
            🇧🇫 &nbsp;1ère MARKETPLACE LOCALE DU BURKINA FASO
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Consommez<br />
            <span className="text-faso-300">Local. Vivez Mieux.</span>
          </h1>

          <p className="text-faso-200 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Miel, artisanat, céréales, cosmétiques — directement des producteurs du Burkina Faso à votre porte.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/boutique"
              className="bg-white text-faso-700 font-bold px-7 py-3 rounded-xl text-sm hover:bg-faso-50 transition-colors"
            >
              Découvrir les produits →
            </Link>
            <Link
              to="/vendeurs"
              className="border border-white/40 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors"
            >
              Devenir vendeur
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap gap-8 mt-12">
          {[['500+', 'Produits locaux'], ['120+', 'Vendeurs actifs'], ['Orange Money', 'Paiement mobile'], ['Livraison J+1', 'Ouagadougou']].map(([val, label]) => (
            <div key={val} className="text-white">
              <div className="text-xl font-extrabold">{val}</div>
              <div className="text-xs text-faso-300 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORY STRIP ────────────────────────────────────────────────── */}
      <section className="border-b border-faso-100 bg-white px-[5vw]">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {CATEGORIES.filter((c) => c.id !== 'tous').map((cat) => (
              <Link
                key={cat.id}
                to="/boutique"
                onClick={() => handleCategory(cat.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-faso-700 hover:bg-faso-50 transition-colors whitespace-nowrap"
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────────── */}
      <section className="px-[5vw] py-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-faso-800 tracking-tight">
              Produits en vedette
            </h2>
            <p className="text-sm text-gray-500 mt-1">Sélectionnés par nos équipes</p>
          </div>
          <Link
            to="/boutique"
            className="text-sm font-semibold text-faso-700 hover:text-faso-800 transition-colors"
          >
            Voir tout →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── SELLER CTA BANNER ─────────────────────────────────────────────── */}
      <section className="px-[5vw] pb-12 max-w-6xl mx-auto">
        <div className="bg-faso-800 rounded-2xl px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">Vous êtes producteur ?</h3>
            <p className="text-faso-300 text-sm">Rejoignez FasoLocal et vendez directement à travers tout le Burkina.</p>
          </div>
          <Link
            to="/vendeurs"
            className="bg-white text-faso-700 font-bold px-6 py-3 rounded-xl text-sm whitespace-nowrap hover:bg-faso-50 transition-colors self-start md:self-auto"
          >
            Devenir vendeur →
          </Link>
        </div>
      </section>

      {/* ── TRUST STRIP ───────────────────────────────────────────────────── */}
      <section className="bg-faso-50 border-t border-faso-100 px-[5vw] py-7">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
          {TRUST_ITEMS.map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm font-medium text-faso-700">
              <span className="text-2xl">{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
