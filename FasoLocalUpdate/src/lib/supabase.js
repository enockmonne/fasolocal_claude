import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const signUp = ({ email, password, fullName }) =>
  supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })

export const signIn = ({ email, password }) =>
  supabase.auth.signInWithPassword({ email, password })

export const signOut = () => supabase.auth.signOut()

export const resetPassword = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/nouveau-mot-de-passe`,
  })

// ─── Products ─────────────────────────────────────────────────────────────────

const normalizeProduct = (p) => ({
  ...p,
  priceRaw: p.price,
  imageUrl: p.image_url,
  seller: p.sellers?.name ?? '',
  reviews: p.review_count,
})

export const getProducts = async (filters = {}) => {
  let query = supabase.from('products').select('*, sellers(name, location)')
  if (filters.category) query = query.eq('category', filters.category)
  if (filters.search) query = query.ilike('name', `%${filters.search}%`)
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data: data ? data.map(normalizeProduct) : null, error }
}

export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, sellers(*)')
    .eq('slug', slug)
    .single()
  return { data: data ? normalizeProduct(data) : null, error }
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()
  return { data, error }
}
