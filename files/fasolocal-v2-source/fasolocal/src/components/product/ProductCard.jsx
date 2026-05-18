import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/lib/store'
import Badge from '@/components/ui/Badge'

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const price = new Intl.NumberFormat('fr-FR').format(product.priceRaw)

  return (
    <Link to={`/produit/${product.slug}`} className="group block">
      <div className="bg-white border border-faso-100 rounded-2xl overflow-hidden
                      transition-all duration-200
                      group-hover:shadow-lg group-hover:-translate-y-0.5
                      flex flex-col h-full">

        {/* Image area */}
        <div className="relative bg-gradient-to-br from-faso-50 to-faso-100
                        h-36 flex items-center justify-center text-6xl flex-shrink-0">
          {product.emoji}

          {/* Stock limité badge — FR-14 */}
          {product.stock < 20 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white
                             text-[10px] font-bold px-2 py-0.5 rounded-md">
              Stock limité
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-1">
          {/* Badge + rating row */}
          <div className="flex items-center justify-between mb-2">
            <Badge label={product.badge} />
            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <span className="text-amber-400">★</span>
              <span>{product.rating}</span>
              <span>({product.reviews})</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-sm font-bold text-faso-800 leading-snug mb-1 flex-1">
            {product.name}
          </h3>

          {/* Seller */}
          <p className="text-[11px] text-gray-400 mb-3">par {product.seller}</p>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-base font-extrabold text-faso-700">{price}</span>
              <span className="text-[11px] text-gray-400 ml-1">FCFA / {product.weight}</span>
            </div>
            <button
              onClick={handleAdd}
              className={[
                'text-xs font-semibold px-3 py-1.5 rounded-lg border',
                'transition-all duration-200 cursor-pointer',
                added
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-faso-700 text-white border-faso-700 hover:bg-faso-800',
              ].join(' ')}
            >
              {added ? '✓ Ajouté' : '+ Panier'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
