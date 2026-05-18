import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProductBySlug } from '@/lib/supabase'
import { useCartStore } from '@/lib/store'
import Badge from '@/components/ui/Badge'
import ProductImage from '@/components/product/ProductImage'
import Spinner from '@/components/ui/Spinner'

export default function ProductDetail() {
  const { id } = useParams()
  const addItem = useCartStore((s) => s.addItem)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setProduct(null)
    getProductBySlug(id).then(({ data, error }) => {
      if (error || !data) setError(true)
      else setProduct(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <Spinner fullPage />

  if (error || !product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-5xl mb-4">😕</div>
      <h2 className="text-xl font-extrabold text-faso-800 mb-3">Produit introuvable</h2>
      <Link to="/boutique" className="text-faso-700 font-semibold text-sm">
        ← Retour à la boutique
      </Link>
    </div>
  )

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const price = new Intl.NumberFormat('fr-FR').format(product.priceRaw)
  const total = new Intl.NumberFormat('fr-FR').format(product.priceRaw * qty)

  return (
    <div className="max-w-5xl mx-auto px-[5vw] py-8">
      {/* Breadcrumb */}
      <Link to="/boutique" className="text-sm text-faso-700 font-medium no-underline
                                      hover:text-faso-800 transition-colors">
        ← Retour à la boutique
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">

        {/* Image */}
        <ProductImage
          src={product.imageUrl}
          emoji={product.emoji}
          alt={product.name}
          className="rounded-2xl h-72 md:h-96 text-8xl w-full"
        />

        {/* Info */}
        <div>
          <Badge label={product.badge} />

          <h1 className="text-2xl font-extrabold text-faso-800 leading-tight mt-3 mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-400 text-sm">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} / 5 ({product.reviews} avis)
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            {product.description}
          </p>

          {/* Meta strip */}
          <div className="bg-faso-50 rounded-xl px-4 py-3 mb-5 grid grid-cols-3 gap-3">
            {[
              ['Vendeur',  product.seller],
              ['Poids',    product.weight],
              ['En stock', `${product.stock} unités`],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</div>
                <div className="text-xs font-semibold text-faso-700 mt-0.5 leading-snug">{value}</div>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-extrabold text-faso-700">{price}</span>
            <span className="text-sm text-gray-400">FCFA / {product.weight}</span>
          </div>

          {/* Qty control */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm text-gray-600 font-medium">Quantité :</span>
            <div className="flex items-center border border-faso-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-faso-700 font-bold text-lg hover:bg-faso-50
                           bg-transparent border-0 cursor-pointer transition-colors"
              >−</button>
              <span className="px-4 text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-2 text-faso-700 font-bold text-lg hover:bg-faso-50
                           bg-transparent border-0 cursor-pointer transition-colors"
              >+</button>
            </div>
            {qty > 1 && (
              <span className="text-sm text-gray-500">= {total} FCFA</span>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            className={[
              'w-full py-3.5 rounded-xl text-base font-bold border-0 cursor-pointer',
              'transition-all duration-200',
              added ? 'bg-green-500 text-white' : 'bg-faso-700 text-white hover:bg-faso-800',
            ].join(' ')}
          >
            {added ? '✓ Ajouté au panier !' : '🛒 Ajouter au panier'}
          </button>

          <div className="flex gap-4 mt-3 text-xs text-gray-400">
            <span>📱 Orange Money accepté</span>
            <span>🚚 Livraison à Ouagadougou</span>
          </div>
        </div>
      </div>
    </div>
  )
}
