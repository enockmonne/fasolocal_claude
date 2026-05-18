-- ============================================================
-- FasoLocal — Seed Data
-- Run AFTER schema.sql in Supabase SQL Editor
-- Uses fixed UUIDs so product → seller references always work
-- ============================================================

-- ─── SELLERS ─────────────────────────────────────────────────────────────────

INSERT INTO sellers (id, name, slug, description, location, emoji, verified, rating, review_count) VALUES
  (
    'a1000000-0000-0000-0000-000000000001',
    'Apiculteurs du Centre',
    'apiculteurs-du-centre',
    'Coopérative d''apiculteurs formés aux techniques modernes. Miel 100% naturel, sans additifs.',
    'Ouagadougou', '🍯', true, 4.8, 124
  ),
  (
    'a1000000-0000-0000-0000-000000000002',
    'Coopérative Wend-Panga',
    'cooperative-wend-panga',
    'Coopérative de femmes productrices de beurre de karité certifié biologique.',
    'Ouagadougou', '🧴', true, 4.9, 89
  ),
  (
    'a1000000-0000-0000-0000-000000000003',
    'Tisserands de Koudougou',
    'tisserands-de-koudougou',
    'Artisans tisserands perpétuant la tradition du Faso Dan Fani depuis trois générations.',
    'Koudougou', '🧵', true, 4.7, 56
  ),
  (
    'a1000000-0000-0000-0000-000000000004',
    'Riziculteurs du Sourou',
    'riziculteurs-du-sourou',
    'Producteurs de riz de la vallée du Sourou, grenier à riz du Burkina Faso.',
    'Sourou', '🌾', false, 4.6, 203
  ),
  (
    'a1000000-0000-0000-0000-000000000005',
    'Femmes de Ziniaré',
    'femmes-de-ziniaré',
    'Association de femmes productrices de savons et cosmétiques naturels à base de moringa.',
    'Ziniaré', '🌿', true, 4.8, 72
  ),
  (
    'a1000000-0000-0000-0000-000000000006',
    'Artisans de Saponé',
    'artisans-de-sapone',
    'Village artisanal reconnu pour ses chapeaux traditionnels labellisés NBF.',
    'Saponé', '👒', true, 4.9, 41
  ),
  (
    'a1000000-0000-0000-0000-000000000007',
    'Producteurs Est-Burkina',
    'producteurs-est-burkina',
    'Groupement de producteurs de sésame et oléagineux de la région Est.',
    'Fada N''Gourma', '🌻', false, 4.5, 38
  ),
  (
    'a1000000-0000-0000-0000-000000000008',
    'Herboristerie Laafi',
    'herboristerie-laafi',
    'Herboristerie spécialisée dans la transformation de plantes médicinales du Burkina.',
    'Ouagadougou', '🍵', true, 4.7, 61
  ),
  (
    'a1000000-0000-0000-0000-000000000009',
    'Huilerie Artisanale Yennenga',
    'huilerie-yennenga',
    'Huilerie artisanale produisant des huiles végétales pressées à froid.',
    'Ouagadougou', '🫙', false, 4.6, 28
  ),
  (
    'a1000000-0000-0000-0000-000000000010',
    'Collectif Femmes du Sahel',
    'collectif-femmes-sahel',
    'Collectif de femmes valorisant les ressources naturelles du Sahel burkinabè.',
    'Dori', '🌳', true, 4.8, 85
  ),
  (
    'a1000000-0000-0000-0000-000000000011',
    'Productrices de Bobo-Dioulasso',
    'productrices-bobo-dioulasso',
    'Association de femmes productrices de condiments traditionnels de Bobo-Dioulasso.',
    'Bobo-Dioulasso', '🫘', true, 4.4, 92
  ),
  (
    'a1000000-0000-0000-0000-000000000012',
    'Bijoutiers Kassena',
    'bijoutiers-kassena',
    'Artisans bijoutiers perpétuant les techniques ancestrales de fonte à la cire perdue.',
    'Tiébélé', '📿', true, 4.9, 34
  )
ON CONFLICT (id) DO NOTHING;

-- ─── PRODUCTS ────────────────────────────────────────────────────────────────

INSERT INTO products (name, slug, description, price, category, seller_id, badge, emoji, weight, stock, rating, review_count) VALUES

  (
    'Miel Pur de Ouagadougou',
    'miel-pur-ouagadougou',
    'Miel 100% naturel récolté par des apiculteurs formés aux techniques modernes. Non pasteurisé, sans additifs ni colorants. Riche en enzymes et antioxydants. Idéal pour sucrer vos boissons et pâtisseries.',
    3500, 'agroalimentaire', 'a1000000-0000-0000-0000-000000000001',
    'Bestseller', '🍯', '500g', 42, 4.8, 124
  ),
  (
    'Beurre de Karité Naturel',
    'beurre-karite-naturel',
    'Beurre de karité pur extrait à froid selon les techniques traditionnelles. Non raffiné, sans ajout chimique. Certifié biologique. Idéal pour hydrater la peau et nourrir les cheveux. Conditionnement en pot de verre.',
    2200, 'cosmetique', 'a1000000-0000-0000-0000-000000000002',
    'Bio', '🧴', '250g', 80, 4.9, 89
  ),
  (
    'Faso Dan Fani (2m)',
    'faso-dan-fani-2m',
    'Tissu traditionnel du Burkina Faso tissé à la main sur un métier à tisser manuel. Motifs géométriques authentiques, teintures naturelles. Chaque pièce est unique. 2 mètres de tissu, idéal pour une tenue complète.',
    6500, 'artisanat', 'a1000000-0000-0000-0000-000000000003',
    'Certifié', '🧵', '400g', 15, 4.7, 56
  ),
  (
    'Riz Local Grains d''Or',
    'riz-local-grains-or',
    'Riz blanc parfumé produit dans la vallée du Sourou, grenier à riz du Burkina Faso. Grain long, texture parfaite à la cuisson. Cultivé sans pesticides. Sac de 1 kg avec fermeture hermétique.',
    1800, 'cereales', 'a1000000-0000-0000-0000-000000000004',
    'Local', '🌾', '1kg', 200, 4.6, 203
  ),
  (
    'Savon Moringa Bio',
    'savon-moringa-bio',
    'Savon artisanal enrichi en huile de moringa et miel de la région de Ziniaré. Douceur et éclat garantis. Sans sulfates ni parabènes. Convient aux peaux sensibles. Poids net : 120g.',
    1200, 'cosmetique', 'a1000000-0000-0000-0000-000000000005',
    'Bio', '🌿', '120g', 67, 4.8, 72
  ),
  (
    'Chapeau de Saponé',
    'chapeau-sapone',
    'Chapeau emblématique fabriqué à la main à Saponé. Paille naturelle tressée avec soin. Labellisé par le Noyau Burkinabè de la Filière (NBF). Protection solaire efficace, style unique. Taille unique ajustable.',
    4000, 'artisanat', 'a1000000-0000-0000-0000-000000000006',
    'Certifié', '👒', '200g', 25, 4.9, 41
  ),
  (
    'Sésame Blanc Premium',
    'sesame-blanc-premium',
    'Sésame blanc de qualité export, cultivé dans la région Est du Burkina Faso. Riche en protéines, calcium et acides gras essentiels. Trié et nettoyé mécaniquement. Sachet 500g sous vide.',
    2800, 'cereales', 'a1000000-0000-0000-0000-000000000007',
    'Export', '🌻', '500g', 150, 4.5, 38
  ),
  (
    'Tisane Moringa & Citron',
    'tisane-moringa-citron',
    'Mélange de feuilles de moringa séchées et de zeste de citron bio du Burkina. Riche en vitamines A, C et fer. Infusion douce et revigorante. Boîte de 20 sachets infusettes individuels.',
    950, 'sante', 'a1000000-0000-0000-0000-000000000008',
    'Bio', '🍵', '40g', 95, 4.7, 61
  ),
  (
    'Huile de Sésame Grillé',
    'huile-sesame-grille',
    'Huile pure obtenue par pression à froid de sésame grillé artisanalement. Arôme intense et saveur riche. Idéale pour assaisonner, mariner ou cuisiner. Bouteille en verre 500ml.',
    3200, 'agroalimentaire', 'a1000000-0000-0000-0000-000000000009',
    'Local', '🫙', '500ml', 55, 4.6, 28
  ),
  (
    'Poudre de Baobab',
    'poudre-baobab',
    'Poudre obtenue par séchage et broyage de la pulpe de baobab sauvage. Très riche en vitamine C (6× plus que l''orange), calcium et fibres. Saveur légèrement acidulée. Idéale dans les smoothies, yaourts et pâtisseries. Sachet 200g.',
    1600, 'sante', 'a1000000-0000-0000-0000-000000000010',
    'Bio', '🌳', '200g', 110, 4.8, 85
  ),
  (
    'Soumbala Traditionnel',
    'soumbala-traditionnel',
    'Condiment fermenté traditionnel à base de graines de néré. Indispensable de la cuisine burkinabè et ouest-africaine. Fabriqué selon des recettes transmises de génération en génération. Paquet 200g.',
    800, 'agroalimentaire', 'a1000000-0000-0000-0000-000000000011',
    'Local', '🫘', '200g', 200, 4.4, 92
  ),
  (
    'Bracelet en Bronze de Tiébélé',
    'bracelet-bronze-tiebele',
    'Bracelet artisanal fabriqué selon la technique ancestrale kassena de fonte à la cire perdue. Chaque pièce est coulée individuellement et unique. Bronze local, motifs géométriques traditionnels. Pièce de collection.',
    5500, 'artisanat', 'a1000000-0000-0000-0000-000000000012',
    'Certifié', '📿', '85g', 18, 4.9, 34
  )

ON CONFLICT (slug) DO NOTHING;

-- ─── VERIFY ──────────────────────────────────────────────────────────────────
-- After running, check counts:
-- SELECT 'sellers' as tbl, count(*) FROM sellers
-- UNION ALL SELECT 'products', count(*) FROM products
-- UNION ALL SELECT 'categories', count(*) FROM categories;
-- Expected: sellers=12, products=12, categories=5
