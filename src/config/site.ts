export const siteConfig = {
  name: 'FasoLocal',
  description: 'Produits Locaux du Burkina Faso — Boutique en Ligne',
  tagline: 'Consommons Local, Soutenons le Burkina',
  url: 'https://fasolocal.com',
  locale: 'fr-BF',
  currency: 'XOF' as const,
  currencySymbol: 'FCFA',
  country: 'Burkina Faso',
  phone: '+226 XX XX XX XX',
  email: 'contact@fasolocal.com',
  address: {
    street: 'Avenue Kwame Nkrumah',
    city: 'Ouagadougou',
    country: 'Burkina Faso',
  },
  social: {
    facebook: 'https://facebook.com/fasolocal',
    instagram: 'https://instagram.com/fasolocal',
    whatsapp: 'https://wa.me/226XXXXXXXX',
    twitter: 'https://twitter.com/fasolocal',
  },
  delivery: {
    freeThreshold: 25000, // Livraison gratuite à partir de 25 000 FCFA
    defaultFee: 1500,
    ouagaFee: 1000,
    otherCityFee: 2500,
    estimatedDays: {
      ouaga: '24h - 48h',
      otherCity: '3 - 5 jours',
    },
  },
  seo: {
    title: 'FasoLocal | Produits Locaux Burkina Faso & Boutique en Ligne',
    description:
      'Découvrez les meilleurs produits locaux du Burkina Faso. Agroalimentaire, cosmétiques, artisanat, textiles et plus. Livraison rapide à Ouagadougou et partout au Faso.',
    keywords: [
      'produits locaux',
      'Burkina Faso',
      'boutique en ligne',
      'made in Burkina',
      'artisanat burkinabè',
      'karité',
      'faso dan fani',
      'consommer local',
    ],
  },
};
