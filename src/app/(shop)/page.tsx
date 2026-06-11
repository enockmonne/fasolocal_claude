import Link from 'next/link';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';
import HeroSection from '@/components/layout/HeroSection';
import { FEATURED_PRODUCTS, NEW_PRODUCTS, MOCK_PRODUCTS } from '@/lib/mockData';

const categories = [
  {
    name: 'Agroalimentaire',
    slug: 'agroalimentaire',
    emoji: '🌾',
    desc: 'Miel, huiles, condiments',
    bg: 'from-amber-50 to-orange-50',
    border: 'hover:border-amber-300',
    icon: 'text-amber-600',
    count: MOCK_PRODUCTS.filter(p => p.category === 'agroalimentaire').length,
  },
  {
    name: 'Cosmétiques & Karité',
    slug: 'cosmetiques',
    emoji: '✨',
    desc: 'Beurre de karité, savons',
    bg: 'from-pink-50 to-rose-50',
    border: 'hover:border-pink-300',
    icon: 'text-pink-600',
    count: MOCK_PRODUCTS.filter(p => p.category === 'cosmetiques').length,
  },
  {
    name: 'Artisanat',
    slug: 'artisanat',
    emoji: '🏺',
    desc: 'Poterie, bronze, vannerie',
    bg: 'from-orange-50 to-amber-50',
    border: 'hover:border-orange-300',
    icon: 'text-orange-600',
    count: MOCK_PRODUCTS.filter(p => p.category === 'artisanat').length,
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    emoji: '🧵',
    desc: 'Faso Dan Fani, Koko Dunda',
    bg: 'from-indigo-50 to-violet-50',
    border: 'hover:border-indigo-300',
    icon: 'text-indigo-600',
    count: MOCK_PRODUCTS.filter(p => p.category === 'textiles').length,
  },
  {
    name: 'Santé & Bien-être',
    slug: 'sante-bien-etre',
    emoji: '🌿',
    desc: 'Tisanes, moringa, baobab',
    bg: 'from-green-50 to-emerald-50',
    border: 'hover:border-green-300',
    icon: 'text-green-600',
    count: MOCK_PRODUCTS.filter(p => p.category === 'sante-bien-etre').length,
  },
  {
    name: 'Boissons',
    slug: 'boissons',
    emoji: '🥤',
    desc: 'Bissap, gingembre, zoom-koom',
    bg: 'from-red-50 to-orange-50',
    border: 'hover:border-red-300',
    icon: 'text-red-600',
    count: MOCK_PRODUCTS.filter(p => p.category === 'boissons').length,
  },
  {
    name: 'Céréales & Farines',
    slug: 'cereales-farines',
    emoji: '🌽',
    desc: 'Mil, sorgho, riz, sésame',
    bg: 'from-yellow-50 to-amber-50',
    border: 'hover:border-yellow-300',
    icon: 'text-yellow-600',
    count: MOCK_PRODUCTS.filter(p => p.category === 'cereales-farines').length,
  },
  {
    name: 'Épices & Condiments',
    slug: 'epices-condiments',
    emoji: '🫚',
    desc: 'Soumbala, poudre de baobab',
    bg: 'from-orange-50 to-red-50',
    border: 'hover:border-orange-400',
    icon: 'text-orange-700',
    count: MOCK_PRODUCTS.filter(p => p.category === 'epices-condiments').length,
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection featuredProducts={FEATURED_PRODUCTS} />

      {/* ── Trust bar ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { icon: '🚚', title: 'Livraison 24h–48h', sub: 'Ouagadougou & environs' },
              { icon: '🔒', title: 'Paiement sécurisé', sub: 'Orange Money · Moov · Coris' },
              { icon: '🌿', title: '100% Local', sub: 'Certifié producteurs BF' },
              { icon: '🔄', title: 'Retours faciles', sub: '7 jours pour changer d\'avis' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 px-4 py-4">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Categories ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Nos Catégories
            </h2>
            <p className="text-gray-500 text-sm mt-1">Trouvez exactement ce que vous cherchez</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
            Tout voir <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
          {categories.filter((cat) => cat.count > 0).map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`group p-4 rounded-xl border border-gray-100 bg-gradient-to-br ${cat.bg} ${cat.border} hover:shadow-md transition-all duration-300`}
            >
              <span className={`text-3xl mb-2 block ${cat.icon}`}>{cat.emoji}</span>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-800 transition-colors leading-snug">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 hidden sm:block">{cat.desc}</p>
              {cat.count > 0 && (
                <p className="text-xs font-medium text-green-600 mt-1.5">{cat.count} produit{cat.count > 1 ? 's' : ''}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Promo banner ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-amber-950 font-semibold text-sm sm:text-base">
            🎁 Livraison <strong>GRATUITE</strong> pour toute commande supérieure à{' '}
            <strong>25 000 FCFA</strong>
          </p>
          <Link href="/products">
            <span className="inline-block bg-amber-900 text-white font-bold text-sm px-5 py-2 rounded-full hover:bg-amber-950 transition-colors">
              En profiter →
            </span>
          </Link>
        </div>
      </div>

      {/* ── Featured products ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Nos Coups de Cœur
            </h2>
            <p className="text-gray-500 text-sm mt-1">Les produits préférés de nos clients</p>
          </div>
          <Link href="/products?sort=popular" className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
            Voir tout <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Wide banner — Faso Dan Fani ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <Link href="/products?category=textiles" className="group block rounded-2xl bg-gradient-to-r from-indigo-900 to-indigo-700 overflow-hidden relative">
          <div className="px-8 py-10 sm:py-14 max-w-lg relative z-10">
            <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest mb-2">Collection Textiles</p>
            <h3 className="text-2xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Faso Dan Fani —<br />La Mode Locale
            </h3>
            <p className="text-indigo-200 text-sm mb-6">
              Tissé à la main par des artisans de Koudougou. Chaque pièce raconte une histoire.
            </p>
            <span className="inline-flex items-center gap-2 bg-white text-indigo-800 font-bold text-sm px-6 py-2.5 rounded-full group-hover:bg-indigo-50 transition-colors">
              Découvrir la collection →
            </span>
          </div>
          {/* Decorative pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 2px, transparent 0, transparent 50%)",
              backgroundSize: '20px 20px',
            }}
          />
        </Link>
      </section>

      {/* ── New arrivals ──────────────────────────────────────────────── */}
      {NEW_PRODUCTS.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                Nouveautés
              </h2>
              <p className="text-gray-500 text-sm mt-1">Tout juste arrivés sur FasoLocal</p>
            </div>
            <Link href="/products?sort=newest" className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1">
              Voir tout <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {NEW_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Vendor CTA ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-4xl mb-4 block">🤝</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Vous êtes producteur au Burkina ?
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Rejoignez FasoLocal et vendez vos produits à des milliers de clients partout au
              Burkina et dans la diaspora. Inscription gratuite, paiement rapide.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">Devenir Vendeur</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">En savoir plus</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
