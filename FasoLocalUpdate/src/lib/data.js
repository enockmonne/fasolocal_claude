// ─── Image URLs ────────────────────────────────────────────────────────────────
// Sourced from Unsplash (free to use). If a URL fails, ProductImage falls back
// to the emoji automatically — no blank boxes ever show.
const IMG = 'https://images.unsplash.com/photo'
const Q   = '?w=600&h=600&fit=crop&auto=format&q=80'

export const CATEGORIES = [
  { id: 'tous',           label: 'Tous',             emoji: '🛒' },
  { id: 'agroalimentaire', label: 'Agroalimentaire', emoji: '🍯' },
  { id: 'artisanat',      label: 'Artisanat',        emoji: '🧵' },
  { id: 'cereales',       label: 'Céréales',         emoji: '🌾' },
  { id: 'cosmetique',     label: 'Cosmétique',       emoji: '🌿' },
  { id: 'sante',          label: 'Santé & Bien-être', emoji: '💚' },
]

export const PRODUCTS = [
  {
    id: 1, name: 'Miel Pur de Ouagadougou', slug: 'miel-pur-ouagadougou',
    priceRaw: 3500, category: 'agroalimentaire',
    seller: 'Apiculteurs du Centre', sellerId: 1,
    badge: 'Bestseller', emoji: '🍯', weight: '500g', stock: 42, rating: 4.8, reviews: 124,
    imageUrl: `${IMG}-1587049352846-4a222e784d38${Q}`,
    description: 'Miel 100% naturel récolté par des apiculteurs formés aux techniques modernes. Non pasteurisé, sans additifs ni colorants. Riche en enzymes et antioxydants.',
  },
  {
    id: 2, name: 'Beurre de Karité Naturel', slug: 'beurre-karite-naturel',
    priceRaw: 2200, category: 'cosmetique',
    seller: 'Coopérative Wend-Panga', sellerId: 2,
    badge: 'Bio', emoji: '🧴', weight: '250g', stock: 80, rating: 4.9, reviews: 89,
    imageUrl: `${IMG}-1608248543803-ba4f8c70ae0b${Q}`,
    description: 'Beurre de karité pur extrait à froid selon les techniques traditionnelles. Non raffiné, sans ajout chimique. Certifié biologique.',
  },
  {
    id: 3, name: 'Faso Dan Fani (2m)', slug: 'faso-dan-fani-2m',
    priceRaw: 6500, category: 'artisanat',
    seller: 'Tisserands de Koudougou', sellerId: 3,
    badge: 'Certifié', emoji: '🧵', weight: '400g', stock: 15, rating: 4.7, reviews: 56,
    imageUrl: `${IMG}-1558618666-fcd25c85cd64${Q}`,
    description: 'Tissu traditionnel du Burkina Faso tissé à la main. Motifs géométriques authentiques, teintures naturelles. Chaque pièce est unique.',
  },
  {
    id: 4, name: "Riz Local Grains d'Or", slug: 'riz-local-grains-or',
    priceRaw: 1800, category: 'cereales',
    seller: 'Riziculteurs du Sourou', sellerId: 4,
    badge: 'Local', emoji: '🌾', weight: '1kg', stock: 200, rating: 4.6, reviews: 203,
    imageUrl: `${IMG}-1536304929831-ee1ca9d44906${Q}`,
    description: 'Riz blanc parfumé produit dans la vallée du Sourou, grenier à riz du Burkina Faso. Grain long, texture parfaite à la cuisson.',
  },
  {
    id: 5, name: 'Savon Moringa Bio', slug: 'savon-moringa-bio',
    priceRaw: 1200, category: 'cosmetique',
    seller: 'Femmes de Ziniaré', sellerId: 5,
    badge: 'Bio', emoji: '🌿', weight: '120g', stock: 67, rating: 4.8, reviews: 72,
    imageUrl: `${IMG}-1543168256-6fd4e8f9afbc${Q}`,
    description: 'Savon artisanal enrichi en huile de moringa et miel de la région de Ziniaré. Sans sulfates ni parabènes. Convient aux peaux sensibles.',
  },
  {
    id: 6, name: 'Chapeau de Saponé', slug: 'chapeau-sapone',
    priceRaw: 4000, category: 'artisanat',
    seller: 'Artisans de Saponé', sellerId: 6,
    badge: 'Certifié', emoji: '👒', weight: '200g', stock: 25, rating: 4.9, reviews: 41,
    imageUrl: `${IMG}-1521369909029-2afed882baee${Q}`,
    description: 'Chapeau emblématique fabriqué à la main à Saponé. Paille naturelle tressée avec soin. Labellisé NBF. Protection solaire efficace.',
  },
  {
    id: 7, name: 'Sésame Blanc Premium', slug: 'sesame-blanc-premium',
    priceRaw: 2800, category: 'cereales',
    seller: 'Producteurs Est-Burkina', sellerId: 7,
    badge: 'Export', emoji: '🌻', weight: '500g', stock: 150, rating: 4.5, reviews: 38,
    imageUrl: `${IMG}-1612257416648-44a3eb21a209${Q}`,
    description: 'Sésame blanc de qualité export cultivé dans la région Est du Burkina Faso. Riche en protéines, calcium et acides gras essentiels.',
  },
  {
    id: 8, name: 'Tisane Moringa & Citron', slug: 'tisane-moringa-citron',
    priceRaw: 950, category: 'sante',
    seller: 'Herboristerie Laafi', sellerId: 8,
    badge: 'Bio', emoji: '🍵', weight: '40g', stock: 95, rating: 4.7, reviews: 61,
    imageUrl: `${IMG}-1564890369478-c89ca3d9da7b${Q}`,
    description: 'Mélange de feuilles de moringa séchées et de zeste de citron bio du Burkina. Riche en vitamines A, C et fer. Boîte de 20 sachets infusettes.',
  },
  {
    id: 9, name: 'Huile de Sésame Grillé', slug: 'huile-sesame-grille',
    priceRaw: 3200, category: 'agroalimentaire',
    seller: 'Huilerie Artisanale Yennenga', sellerId: 9,
    badge: 'Local', emoji: '🫙', weight: '500ml', stock: 55, rating: 4.6, reviews: 28,
    imageUrl: `${IMG}-1474979266404-7eaacbcd87c5${Q}`,
    description: 'Huile pure obtenue par pression à froid de sésame grillé artisanalement. Arôme intense et saveur riche. Bouteille en verre 500ml.',
  },
  {
    id: 10, name: 'Poudre de Baobab', slug: 'poudre-baobab',
    priceRaw: 1600, category: 'sante',
    seller: 'Collectif Femmes du Sahel', sellerId: 10,
    badge: 'Bio', emoji: '🌳', weight: '200g', stock: 110, rating: 4.8, reviews: 85,
    imageUrl: `${IMG}-1590779033100-9f60a05a013d${Q}`,
    description: "Poudre de pulpe de baobab séchée. Très riche en vitamine C (6× plus que l'orange), calcium et fibres. Idéale dans smoothies et yaourts.",
  },
  {
    id: 11, name: 'Soumbala Traditionnel', slug: 'soumbala-traditionnel',
    priceRaw: 800, category: 'agroalimentaire',
    seller: 'Productrices de Bobo-Dioulasso', sellerId: 11,
    badge: 'Local', emoji: '🫘', weight: '200g', stock: 200, rating: 4.4, reviews: 92,
    imageUrl: `${IMG}-1596040033229-a9821ebd8d74${Q}`,
    description: "Condiment fermenté traditionnel à base de graines de néré. Indispensable de la cuisine burkinabè. Fabriqué selon des recettes ancestrales.",
  },
  {
    id: 12, name: 'Bracelet en Bronze de Tiébélé', slug: 'bracelet-bronze-tiebele',
    priceRaw: 5500, category: 'artisanat',
    seller: 'Bijoutiers Kassena', sellerId: 12,
    badge: 'Certifié', emoji: '📿', weight: '85g', stock: 18, rating: 4.9, reviews: 34,
    imageUrl: `${IMG}-1611591437281-460bfbe1220a${Q}`,
    description: 'Bracelet artisanal fabriqué selon la technique ancestrale kassena de fonte à la cire perdue. Chaque pièce est coulée individuellement — pièce unique.',
  },
]

export const SELLERS = [
  { id: 1,  name: 'Apiculteurs du Centre',         location: 'Ouagadougou',     products: 8,  rating: 4.8, since: '2021', emoji: '🍯', verified: true  },
  { id: 2,  name: 'Coopérative Wend-Panga',         location: 'Ouagadougou',     products: 12, rating: 4.9, since: '2019', emoji: '🧴', verified: true  },
  { id: 3,  name: 'Tisserands de Koudougou',        location: 'Koudougou',       products: 6,  rating: 4.7, since: '2020', emoji: '🧵', verified: true  },
  { id: 4,  name: 'Riziculteurs du Sourou',         location: 'Sourou',          products: 4,  rating: 4.6, since: '2022', emoji: '🌾', verified: false },
  { id: 5,  name: 'Femmes de Ziniaré',              location: 'Ziniaré',         products: 9,  rating: 4.8, since: '2020', emoji: '🌿', verified: true  },
  { id: 6,  name: 'Artisans de Saponé',             location: 'Saponé',          products: 5,  rating: 4.9, since: '2021', emoji: '👒', verified: true  },
  { id: 7,  name: 'Producteurs Est-Burkina',        location: "Fada N'Gourma",   products: 3,  rating: 4.5, since: '2022', emoji: '🌻', verified: false },
  { id: 8,  name: 'Herboristerie Laafi',            location: 'Ouagadougou',     products: 7,  rating: 4.7, since: '2020', emoji: '🍵', verified: true  },
  { id: 9,  name: 'Huilerie Artisanale Yennenga',  location: 'Ouagadougou',     products: 4,  rating: 4.6, since: '2021', emoji: '🫙', verified: false },
  { id: 10, name: 'Collectif Femmes du Sahel',      location: 'Dori',            products: 6,  rating: 4.8, since: '2019', emoji: '🌳', verified: true  },
  { id: 11, name: 'Productrices de Bobo-Dioulasso', location: 'Bobo-Dioulasso',  products: 5,  rating: 4.4, since: '2020', emoji: '🫘', verified: true  },
  { id: 12, name: 'Bijoutiers Kassena',             location: 'Tiébélé',         products: 8,  rating: 4.9, since: '2018', emoji: '📿', verified: true  },
]

export const BADGE_STYLES = {
  Bestseller: { bg: '#FFF3E0', color: '#E65100' },
  Bio:        { bg: '#E8F5E9', color: '#1B5E20' },
  'Certifié': { bg: '#E3F2FD', color: '#0D47A1' },
  Local:      { bg: '#F3E5F5', color: '#4A148C' },
  Export:     { bg: '#E0F2F1', color: '#004D40' },
}
