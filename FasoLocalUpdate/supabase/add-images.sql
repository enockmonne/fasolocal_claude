-- ============================================================
-- FasoLocal — Add image_url to products
-- Run this in Supabase SQL Editor if schema.sql was already run
-- ============================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url text;

-- Update existing seed products with Unsplash image URLs
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'miel-pur-ouagadougou';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'beurre-karite-naturel';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'faso-dan-fani-2m';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'riz-local-grains-or';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1543168256-6fd4e8f9afbc?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'savon-moringa-bio';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'chapeau-sapone';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1612257416648-44a3eb21a209?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'sesame-blanc-premium';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1564890369478-c89ca3d9da7b?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'tisane-moringa-citron';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'huile-sesame-grille';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'poudre-baobab';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596040033229-a9821ebd8d74?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'soumbala-traditionnel';
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop&auto=format&q=80' WHERE slug = 'bracelet-bronze-tiebele';

-- Also update seed.sql products in one go (if re-seeding from scratch)
-- The seed.sql has been updated to include image_url in new INSERT statements.

-- Verify
SELECT slug, name, LEFT(image_url, 50) AS url_preview
FROM products
ORDER BY name;
