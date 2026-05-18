export const mainNav = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/products' },
  {
    label: 'Catégories',
    href: '/categories',
    children: [
      { label: 'Agroalimentaire', href: '/products?category=agroalimentaire' },
      { label: 'Cosmétiques & Karité', href: '/products?category=cosmetiques' },
      { label: 'Artisanat', href: '/products?category=artisanat' },
      { label: 'Textiles & Faso Dan Fani', href: '/products?category=textiles' },
      { label: 'Santé & Bien-être', href: '/products?category=sante-bien-etre' },
      { label: 'Boissons Locales', href: '/products?category=boissons' },
      { label: 'Céréales & Farines', href: '/products?category=cereales-farines' },
      { label: 'Épices & Condiments', href: '/products?category=epices-condiments' },
    ],
  },
  { label: 'À Propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  boutique: [
    { label: 'Tous les Produits', href: '/products' },
    { label: 'Nouveautés', href: '/products?sortBy=newest' },
    { label: 'Promotions', href: '/products?onSale=true' },
    { label: 'Meilleures Ventes', href: '/products?sortBy=popular' },
  ],
  informations: [
    { label: 'À Propos de FasoLocal', href: '/about' },
    { label: 'Livraison', href: '/delivery' },
    { label: 'Retours & Remboursements', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Conditions Générales', href: '/terms' },
    { label: 'Politique de Confidentialité', href: '/privacy' },
    { label: 'Mentions Légales', href: '/legal' },
  ],
};
