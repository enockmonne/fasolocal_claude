import { useState, useEffect } from 'react'
import { CATEGORIES } from '@/lib/data'
import { useSearchStore } from '@/lib/store'
import { getProducts } from '@/lib/supabase'
import ProductCard from '@/components/product/ProductCard'

export default function Shop() {
  const { query, category, setCategory, setQuery } = useSearchStore()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(() => {
      setLoading(true)
      setError(null)
      getProducts({
        category: category !== 'tous' ? category : undefined,
        search: query || undefined,
      }).then(({ data, error }) => {
        if (cancelled) return
        if (error) setError('Impossible de charger les produits.')
        else setProducts(data ?? [])
        setLoading(false)
      })
    }, 300)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [category, query])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 5vw' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 28, color: '#1B5E20', marginBottom: 6 }}>
          Tous les produits locaux
        </h1>
        <p style={{ color: '#666', fontSize: 14 }}>
          {loading ? 'Chargement…' : `${products.length} produit${products.length !== 1 ? 's' : ''} disponible${products.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            style={{
              padding: '8px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', border: '1.5px solid',
              background: category === cat.id ? '#2E7D32' : '#fff',
              color: category === cat.id ? '#fff' : '#388E3C',
              borderColor: category === cat.id ? '#2E7D32' : '#A5D6A7',
              transition: 'all 0.15s',
            }}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#888' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <p style={{ color: '#c62828', marginBottom: 12 }}>{error}</p>
          <button
            onClick={() => { setQuery(''); setCategory('tous') }}
            style={{ background: '#2E7D32', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 600 }}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-72" />
          ))}
        </div>
      )}

      {/* Product grid */}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 }}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#888' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p>Aucun produit trouvé pour « {query || category} »</p>
          <button
            onClick={() => { setQuery(''); setCategory('tous') }}
            style={{ marginTop: 12, background: '#2E7D32', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 600 }}
          >
            Voir tous les produits
          </button>
        </div>
      )}
    </div>
  )
}
