export const CATEGORIES = [
  { id: 'tous', label: 'Tous', emoji: '🛒' },
  { id: 'agroalimentaire', label: 'Agroalimentaire', emoji: '🍯' },
  { id: 'artisanat', label: 'Artisanat', emoji: '🧵' },
  { id: 'cereales', label: 'Céréales', emoji: '🌾' },
  { id: 'cosmetique', label: 'Cosmétique', emoji: '🌿' },
  { id: 'sante', label: 'Santé & Bien-être', emoji: '💚' },
]

export const PRODUCTS = [
  { id: 1, name: 'Miel Pur de Ouagadougou', slug: 'miel-pur-ouagadougou', priceRaw: 3500, category: 'agroalimentaire', seller: 'Apiculteurs du Centre', sellerId: 1, badge: 'Bestseller', emoji: '🍯', stock: 42, rating: 4.8, reviews: 124, description: 'Miel 100% naturel, récolté par des apiculteurs formés aux techniques modernes. Non pasteurisé, sans additifs.', weight: '500g' },
  { id: 2, name: 'Beurre de Karité Naturel', slug: 'beurre-karite-naturel', priceRaw: 2200, category: 'cosmetique', seller: 'Coopérative Wend-Panga', sellerId: 2, badge: 'Bio', emoji: '🧴', stock: 80, rating: 4.9, reviews: 89, description: 'Beurre de karité pur extrait à froid. Idéal pour la peau et les cheveux. Certifié biologique.', weight: '250g' },
  { id: 3, name: 'Faso Dan Fani (2m)', slug: 'faso-dan-fani-2m', priceRaw: 6500, category: 'artisanat', seller: 'Tisserands de Koudougou', sellerId: 3, badge: 'Certifié', emoji: '🧵', stock: 15, rating: 4.7, reviews: 56, description: 'Tissu traditionnel du Burkina Faso tissé main. Motifs authentiques, couleurs naturelles.', weight: '400g' },
  { id: 4, name: 'Riz Local Grains d\'Or', slug: 'riz-local-grains-or', priceRaw: 1800, category: 'cereales', seller: 'Riziculteurs du Sourou', sellerId: 4, badge: 'Local', emoji: '🌾', stock: 200, rating: 4.6, reviews: 203, description: 'Riz blanc parfumé produit dans la vallée du Sourou. Grain long, texture parfaite.', weight: '1kg' },
  { id: 5, name: 'Savon Moringa Bio', slug: 'savon-moringa-bio', priceRaw: 1200, category: 'cosmetique', seller: 'Femmes de Ziniaré', sellerId: 5, badge: 'Bio', emoji: '🌿', stock: 67, rating: 4.8, reviews: 72, description: 'Savon artisanal enrichi en huile de moringa et miel. Douceur et éclat garantis.', weight: '120g' },
  { id: 6, name: 'Chapeau de Saponé', slug: 'chapeau-sapone', priceRaw: 4000, category: 'artisanat', seller: 'Artisans de Saponé', sellerId: 6, badge: 'Certifié', emoji: '👒', stock: 25, rating: 4.9, reviews: 41, description: 'Chapeau emblématique tressé à la main à Saponé. Produit labellisé NBF.', weight: '200g' },
  { id: 7, name: 'Sésame Blanc Premium', slug: 'sesame-blanc-premium', priceRaw: 2800, category: 'cereales', seller: 'Producteurs Est-Burkina', sellerId: 7, badge: 'Export', emoji: '🌻', stock: 150, rating: 4.5, reviews: 38, description: 'Sésame blanc de qualité export, riche en protéines et minéraux.', weight: '500g' },
  { id: 8, name: 'Tisane Moringa & Citron', slug: 'tisane-moringa-citron', priceRaw: 950, category: 'sante', seller: 'Herboristerie Laafi', sellerId: 8, badge: 'Bio', emoji: '🍵', stock: 95, rating: 4.7, reviews: 61, description: 'Mélange de feuilles de moringa séchées et zeste de citron. Riche en vitamines.', weight: '40g' },
  { id: 9, name: 'Huile de Sésame Grillé', slug: 'huile-sesame-grille', priceRaw: 3200, category: 'agroalimentaire', seller: 'Huilerie Artisanale Yennenga', sellerId: 9, badge: 'Local', emoji: '🫙', stock: 55, rating: 4.6, reviews: 28, description: 'Huile pure de sésame grillé, pressée à froid. Idéale pour la cuisine.', weight: '500ml' },
  { id: 10, name: 'Poudre de Baobab', slug: 'poudre-baobab', priceRaw: 1600, category: 'sante', seller: 'Collectif Femmes du Sahel', sellerId: 10, badge: 'Bio', emoji: '🌳', stock: 110, rating: 4.8, reviews: 85, description: 'Poudre de pulpe de baobab séchée. Très riche en vitamine C.', weight: '200g' },
  { id: 11, name: 'Soumbala Traditionnel', slug: 'soumbala-traditionnel', priceRaw: 800, category: 'agroalimentaire', seller: 'Productrices de Bobo-Dioulasso', sellerId: 11, badge: 'Local', emoji: '🫘', stock: 200, rating: 4.4, reviews: 92, description: 'Condiment fermenté traditionnel, indispensable de la cuisine burkinabè.', weight: '200g' },
  { id: 12, name: 'Bracelet en Bronze de Tiébélé', slug: 'bracelet-bronze-tiebele', priceRaw: 5500, category: 'artisanat', seller: 'Bijoutiers Kassena', sellerId: 12, badge: 'Certifié', emoji: '📿', stock: 18, rating: 4.9, reviews: 34, description: 'Bracelet artisanal fondu à la cire perdue, techniques ancestrales kassena. Pièce unique.', weight: '85g' },
]

export const SELLERS = [
  { id: 1, name: 'Apiculteurs du Centre', location: 'Ouagadougou', products: 8, rating: 4.8, since: '2021', emoji: '🍯', verified: true },
  { id: 2, name: 'Coopérative Wend-Panga', location: 'Ouagadougou', products: 12, rating: 4.9, since: '2019', emoji: '🧴', verified: true },
  { id: 3, name: 'Tisserands de Koudougou', location: 'Koudougou', products: 6, rating: 4.7, since: '2020', emoji: '🧵', verified: true },
  { id: 4, name: 'Riziculteurs du Sourou', location: 'Sourou', products: 4, rating: 4.6, since: '2022', emoji: '🌾', verified: false },
  { id: 5, name: 'Femmes de Ziniaré', location: 'Ziniaré', products: 9, rating: 4.8, since: '2020', emoji: '🌿', verified: true },
]

export const BADGE_STYLES = {
  Bestseller: { bg: '#FFF3E0', color: '#E65100' },
  Bio:        { bg: '#E8F5E9', color: '#1B5E20' },
  Certifié:   { bg: '#E3F2FD', color: '#0D47A1' },
  Local:      { bg: '#F3E5F5', color: '#4A148C' },
  Export:     { bg: '#E0F2F1', color: '#004D40' },
}
