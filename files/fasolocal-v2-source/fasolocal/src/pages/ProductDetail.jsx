import { useParams, Link } from 'react-router-dom'
import { PRODUCTS, BADGE_STYLES } from '@/lib/data'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => p.slug === id)
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '80px 5vw' }}>
      <div style={{ fontSize: 48 }}>😕</div>
      <h2 style={{ color: '#1B5E20' }}>Produit introuvable</h2>
      <Link to="/boutique" style={{ color: '#2E7D32', fontWeight: 600 }}>← Retour à la boutique</Link>
    </div>
  )

  const badge = BADGE_STYLES[product.badge] || BADGE_STYLES.Local
  const price = new Intl.NumberFormat('fr-FR').format(product.priceRaw)
  const total = new Intl.NumberFormat('fr-FR').format(product.priceRaw * qty)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 5vw' }}>
      <Link to="/boutique" style={{ color: '#388E3C', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>← Retour à la boutique</Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 28 }}>
        {/* Image */}
        <div style={{ background: 'linear-gradient(135deg, #F1F8E9, #E8F5E9)', borderRadius: 20, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120 }}>
          {product.emoji}
        </div>

        {/* Info */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, background: badge.bg, color: badge.color, borderRadius: 6, padding: '4px 10px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {product.badge}
          </span>

          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 28, color: '#1B5E20', margin: '14px 0 6px', lineHeight: 1.2 }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ color: '#F57C00', fontSize: 14 }}>{'⭐'.repeat(Math.round(product.rating))}</div>
            <span style={{ fontSize: 13, color: '#666' }}>{product.rating}/5 ({product.reviews} avis)</span>
          </div>

          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 20 }}>{product.description}</p>

          <div style={{ background: '#F1F8E9', borderRadius: 12, padding: '14px 16px', marginBottom: 24, display: 'flex', gap: 24 }}>
            {[['Vendeur', product.seller], ['Poids', product.weight], ['Stock', `${product.stock} unités`]].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2E7D32' }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span style={{ fontWeight: 800, fontSize: 30, color: '#2E7D32' }}>{price} FCFA</span>
            <span style={{ fontSize: 13, color: '#aaa' }}>/ {product.weight}</span>
          </div>

          {/* Qty selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>Quantité :</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #A5D6A7', borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', padding: '8px 14px', fontSize: 18, cursor: 'pointer', color: '#2E7D32' }}>−</button>
              <span style={{ minWidth: 32, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ background: 'none', border: 'none', padding: '8px 14px', fontSize: 18, cursor: 'pointer', color: '#2E7D32' }}>+</button>
            </div>
            <span style={{ fontSize: 13, color: '#888' }}>= {total} FCFA</span>
          </div>

          <button
            onClick={handleAdd}
            style={{ width: '100%', background: added ? '#4CAF50' : '#2E7D32', border: 'none', borderRadius: 12, padding: '14px', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
          >
            {added ? '✓ Ajouté au panier !' : `🛒 Ajouter au panier`}
          </button>

          <div style={{ marginTop: 16, display: 'flex', gap: 12, fontSize: 12, color: '#888' }}>
            <span>📱 Orange Money accepté</span>
            <span>🚚 Livraison à Ouagadougou</span>
          </div>
        </div>
      </div>
    </div>
  )
}
