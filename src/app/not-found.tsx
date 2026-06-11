import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Visual */}
        <div className="relative inline-block mb-6">
          <div className="text-[80px] leading-none select-none">🌿</div>
          <div
            className="absolute -top-2 -right-4 w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, #92400e, #d97706)' }}
          >
            404
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Page introuvable
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Cette page n&apos;existe pas ou a été déplacée. Mais nos produits locaux vous attendent !
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Explorer la boutique
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Accueil
          </Link>
        </div>

        {/* Quick category links */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Catégories populaires</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: '🍯 Agroalimentaire', href: '/products?category=agroalimentaire' },
              { label: '✨ Cosmétiques', href: '/products?category=cosmetiques' },
              { label: '🏺 Artisanat', href: '/products?category=artisanat' },
              { label: '🧵 Textiles', href: '/products?category=textiles' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-sm px-3 py-1.5 bg-gray-50 hover:bg-green-50 hover:text-green-700 text-gray-600 rounded-full border border-gray-100 hover:border-green-200 transition-all"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
