-- ============================================================
-- FasoLocal — Full Database Schema
-- Run once in Supabase SQL Editor to initialise the database
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── TABLES ──────────────────────────────────────────────────────────────────

CREATE TABLE sellers (
  id          uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        text        NOT NULL,
  slug        text        UNIQUE NOT NULL,
  description text,
  location    text,
  phone       text,
  email       text,
  emoji       text        DEFAULT '🏪',
  verified    boolean     DEFAULT false,
  rating      numeric(3,2) DEFAULT 0,
  review_count integer    DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE categories (
  id    text PRIMARY KEY,   -- 'agroalimentaire', 'artisanat', etc.
  label text NOT NULL,
  emoji text
);

CREATE TABLE products (
  id           uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         text        NOT NULL,
  slug         text        UNIQUE NOT NULL,
  description  text,
  price        integer     NOT NULL CHECK (price > 0),
  category     text        REFERENCES categories(id),
  seller_id    uuid        REFERENCES sellers(id) ON DELETE CASCADE,
  badge        text        CHECK (badge IN ('Bestseller','Bio','Certifié','Local','Export')),
  emoji        text        DEFAULT '📦',
  weight       text,
  stock        integer     DEFAULT 0 CHECK (stock >= 0),
  rating       numeric(3,2) DEFAULT 0,
  review_count integer     DEFAULT 0,
  active       boolean     DEFAULT true,
  created_at   timestamptz DEFAULT now()
);

CREATE TABLE user_profiles (
  id         uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  text,
  phone      text,
  city       text,
  is_seller  boolean     DEFAULT false,
  seller_id  uuid        REFERENCES sellers(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE orders (
  id               uuid        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          uuid        REFERENCES user_profiles(id),
  status           text        DEFAULT 'pending'
                               CHECK (status IN ('pending','confirmed','preparing','shipped','delivered','cancelled')),
  payment_method   text        CHECK (payment_method IN ('orange_money','moov_money','cash')),
  payment_status   text        DEFAULT 'pending'
                               CHECK (payment_status IN ('pending','paid','failed','refunded')),
  delivery_address text,
  delivery_phone   text,
  total            integer     NOT NULL CHECK (total > 0),
  notes            text,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

CREATE TABLE order_items (
  id         uuid    PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id   uuid    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid    NOT NULL REFERENCES products(id),
  quantity   integer NOT NULL CHECK (quantity > 0),
  unit_price integer NOT NULL CHECK (unit_price > 0),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE reviews (
  id         uuid    PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid    NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id    uuid    NOT NULL REFERENCES user_profiles(id),
  rating     integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────

CREATE INDEX idx_products_category  ON products(category);
CREATE INDEX idx_products_seller    ON products(seller_id);
CREATE INDEX idx_products_slug      ON products(slug);
CREATE INDEX idx_products_active    ON products(active);
CREATE INDEX idx_orders_user        ON orders(user_id);
CREATE INDEX idx_orders_status      ON orders(status);
CREATE INDEX idx_order_items_order  ON order_items(order_id);
CREATE INDEX idx_reviews_product    ON reviews(product_id);

-- ─── TRIGGER: auto-create user_profile on signup ─────────────────────────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── TRIGGER: updated_at on orders ───────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

ALTER TABLE sellers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders       ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews      ENABLE ROW LEVEL SECURITY;

-- sellers: public read, authenticated sellers can manage their own
CREATE POLICY "sellers_public_read"
  ON sellers FOR SELECT USING (true);

CREATE POLICY "sellers_owner_update"
  ON sellers FOR UPDATE
  USING (id IN (
    SELECT seller_id FROM user_profiles WHERE id = auth.uid() AND is_seller = true
  ));

-- products: public read (active only), sellers manage their own
CREATE POLICY "products_public_read"
  ON products FOR SELECT USING (active = true);

CREATE POLICY "products_seller_insert"
  ON products FOR INSERT
  WITH CHECK (
    seller_id IN (
      SELECT seller_id FROM user_profiles WHERE id = auth.uid() AND is_seller = true
    )
  );

CREATE POLICY "products_seller_update"
  ON products FOR UPDATE
  USING (
    seller_id IN (
      SELECT seller_id FROM user_profiles WHERE id = auth.uid() AND is_seller = true
    )
  );

CREATE POLICY "products_seller_delete"
  ON products FOR DELETE
  USING (
    seller_id IN (
      SELECT seller_id FROM user_profiles WHERE id = auth.uid() AND is_seller = true
    )
  );

-- user_profiles: users manage only their own
CREATE POLICY "profiles_owner_read"
  ON user_profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_owner_insert"
  ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_owner_update"
  ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- orders: buyers see and create their own
CREATE POLICY "orders_owner_read"
  ON orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "orders_owner_insert"
  ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "orders_owner_update"
  ON orders FOR UPDATE
  USING (auth.uid() = user_id AND status IN ('pending','confirmed'));

-- order_items: buyers see items belonging to their orders
CREATE POLICY "order_items_owner_read"
  ON order_items FOR SELECT
  USING (order_id IN (
    SELECT id FROM orders WHERE user_id = auth.uid()
  ));

CREATE POLICY "order_items_owner_insert"
  ON order_items FOR INSERT
  WITH CHECK (order_id IN (
    SELECT id FROM orders WHERE user_id = auth.uid()
  ));

-- reviews: public read, buyers insert (one per product)
CREATE POLICY "reviews_public_read"
  ON reviews FOR SELECT USING (true);

CREATE POLICY "reviews_buyer_insert"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE o.user_id = auth.uid()
        AND oi.product_id = reviews.product_id
        AND o.status = 'delivered'
    )
  );

-- ─── STORAGE BUCKET ──────────────────────────────────────────────────────────
-- Run in SQL Editor after creating the bucket via Dashboard > Storage

-- The bucket 'product-images' must be created in Supabase Dashboard > Storage first.
-- Then run this to set its policies:

-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- CREATE POLICY "product_images_public_read"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'product-images');

-- CREATE POLICY "product_images_seller_upload"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'product-images'
--     AND auth.role() = 'authenticated'
--   );

-- CREATE POLICY "product_images_seller_delete"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'product-images'
--     AND auth.uid()::text = (storage.foldername(name))[1]
--   );

-- ─── SEED: Categories ────────────────────────────────────────────────────────

INSERT INTO categories (id, label, emoji) VALUES
  ('agroalimentaire', 'Agroalimentaire',    '🍯'),
  ('artisanat',       'Artisanat',          '🧵'),
  ('cereales',        'Céréales',           '🌾'),
  ('cosmetique',      'Cosmétique',         '🌿'),
  ('sante',           'Santé & Bien-être',  '💚')
ON CONFLICT (id) DO NOTHING;
