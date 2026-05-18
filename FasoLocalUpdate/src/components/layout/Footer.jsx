import { Link } from 'react-router-dom'

const LINKS = [
  {
    title: 'Boutique',
    items: [
      ['Tous les produits', '/boutique'],
      ['Agroalimentaire',  '/boutique'],
      ['Artisanat',        '/boutique'],
      ['Cosmétique',       '/boutique'],
    ],
  },
  {
    title: 'Vendeurs',
    items: [
      ['Devenir vendeur', '/vendeurs'],
      ['Espace vendeur',  '/tableau-de-bord'],
      ['Tarifs',          '/vendeurs'],
      ['Support',         '/vendeurs'],
    ],
  },
  {
    title: 'Info',
    items: [
      ['À propos',    '/'],
      ['Paiements',   '/'],
      ['Livraison',   '/'],
      ['Contact',     '/'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-faso-800 text-faso-300">
      <div className="max-w-6xl mx-auto px-[5vw] pt-12 pb-6">
        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="text-xl font-extrabold text-white mb-3">🌿 FasoLocal</div>
            <p className="text-sm leading-relaxed text-faso-400 max-w-xs">
              La 1ère marketplace des produits locaux du Burkina Faso. Consommez local, soutenez nos producteurs.
            </p>
            <div className="flex gap-4 mt-4 text-xl">
              <span className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity">📘</span>
              <span className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity">📸</span>
              <span className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity">🐦</span>
            </div>
          </div>

          {/* Link columns */}
          {LINKS.map(({ title, items }) => (
            <div key={title}>
              <div className="text-xs font-bold text-faso-200 uppercase tracking-widest mb-4">
                {title}
              </div>
              <ul className="space-y-2.5">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm text-faso-400 hover:text-white transition-colors no-underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center
                        justify-between gap-3 text-xs text-faso-600">
          <span>© 2025 FasoLocal — Consommer local, c'est soutenir le Burkina 🇧🇫</span>
          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-faso-300 transition-colors">Confidentialité</span>
            <span className="cursor-pointer hover:text-faso-300 transition-colors">CGV</span>
            <span className="cursor-pointer hover:text-faso-300 transition-colors">Mentions légales</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
