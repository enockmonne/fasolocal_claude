import Link from 'next/link';
import Button from '@/components/ui/Button';

const categories = [
  { name: 'Agroalimentaire', slug: 'agroalimentaire', emoji: '🌾', desc: 'Riz, fonio, soumbala et plus' },
  { name: 'Cosmétiques & Karité', slug: 'cosmetiques', emoji: '✨', desc: 'Beurre de karité, savons naturels' },
  { name: 'Artisanat', slug: 'artisanat', emoji: '🏺', desc: 'Poterie, bronze, vannerie' },
  { name: 'Textiles', slug: 'textiles', emoji: '🧵', desc: 'Faso Dan Fani, Koko Dunda' },
  { name: 'Santé & Bien-être', slug: 'sante-bien-etre', emoji: '🌿', desc: 'Tisanes, moringa, miel' },
  { name: 'Boissons', slug: 'boissons', emoji: '🥤', desc: 'Bissap, gingembre, zoom-koom' },
  { name: 'Céréales & Farines', slug: 'cereales-farines', emoji: '🌽', desc: 'Farine de mil, maïs, sorgho' },
  { name: 'Épices & Condiments', slug: 'epices-condiments', emoji: '🫚', desc: 'Soumbala, poudre de baobab' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative">
          <div className="max-w-2xl">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
              Consommons Local 🇧🇫
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5" style={{ fontFamily: 'var(--font-display)' }}>
              Les Meilleurs Produits du Burkina Faso
            </h1>
            <p className="text-lg text-green-100 leading-relaxed mb-8 max-w-lg">
              Découvrez une sélection authentique de produits locaux — du karité artisanal au Faso Dan Fani, directement des producteurs burkinabè à votre porte.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <Button variant="secondary" size="lg">Explorer la Boutique</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Notre Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Nos Catégories
          </h2>
          <p className="text-gray-500">Trouvez exactement ce que vous cherchez</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group p-5 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md bg-white transition-all duration-300"
            >
              <span className="text-3xl mb-3 block">{cat.emoji}</span>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Value propositions */}
      <section className="bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🚚', title: 'Livraison Rapide', desc: '24h - 48h à Ouagadougou' },
              { icon: '🌿', title: '100% Local', desc: 'Produits du Burkina Faso' },
              { icon: '🔒', title: 'Paiement Sécurisé', desc: 'Orange Money, Moov, Carte' },
              { icon: '🤝', title: 'Soutien Direct', desc: 'Aux producteurs locaux' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-amber-50 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Vous êtes producteur au Burkina ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Rejoignez FasoLocal et vendez vos produits à des milliers de clients. Inscription gratuite.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">Devenir Vendeur</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
