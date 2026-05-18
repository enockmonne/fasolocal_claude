import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '@/lib/store'
import Button from '@/components/ui/Button'

export default function Cart() {
  const { items, removeItem, updateQty, getTotal } = useCartStore()
  const navigate = useNavigate()
  const total = getTotal()
  const fmt = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-[5vw] text-center">
        <div className="text-6xl mb-5">🛒</div>
        <h2 className="text-2xl font-extrabold text-faso-800 mb-2">Votre panier est vide</h2>
        <p className="text-gray-500 text-sm mb-7">Découvrez nos produits locaux du Burkina Faso</p>
        <Button as={Link} to="/boutique" onClick={() => navigate('/boutique')}>
          Aller à la boutique →
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-[5vw] py-8">
      <h1 className="text-2xl font-extrabold text-faso-800 mb-6">
        Mon Panier
        <span className="text-base font-normal text-gray-400 ml-2">
          ({items.length} article{items.length > 1 ? 's' : ''})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        {/* Item list */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id}
              className="bg-white border border-faso-100 rounded-2xl p-4
                         flex items-center gap-4">
              {/* Emoji thumbnail */}
              <div className="w-14 h-14 bg-faso-50 rounded-xl flex items-center
                              justify-center text-3xl flex-shrink-0">
                {item.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-faso-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-400">par {item.seller}</p>
              </div>

              {/* Qty control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="w-7 h-7 bg-faso-50 hover:bg-faso-100 rounded-lg text-faso-700
                             font-bold text-base flex items-center justify-center
                             border-0 cursor-pointer transition-colors"
                >−</button>
                <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="w-7 h-7 bg-faso-50 hover:bg-faso-100 rounded-lg text-faso-700
                             font-bold text-base flex items-center justify-center
                             border-0 cursor-pointer transition-colors"
                >+</button>
              </div>

              {/* Line total */}
              <div className="text-sm font-extrabold text-faso-700 min-w-[90px] text-right">
                {fmt(item.priceRaw * item.qty)}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-300 hover:text-red-400 bg-transparent border-0
                           cursor-pointer text-lg leading-none transition-colors"
                aria-label="Retirer"
              >✕</button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white border border-faso-100 rounded-2xl p-5 sticky top-20">
          <h3 className="font-extrabold text-faso-800 text-base mb-4">Récapitulatif</h3>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{fmt(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span className="text-faso-600 font-semibold">Gratuite</span>
            </div>
          </div>

          <div className="border-t border-faso-100 pt-4 flex justify-between
                          font-extrabold text-lg text-faso-800 mb-5">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>

          <Button
            onClick={() => navigate('/commande')}
            className="w-full justify-center text-base py-3"
          >
            Passer la commande →
          </Button>

          <p className="text-center text-xs text-gray-400 mt-3">
            📱 Orange Money · Moov Money · Espèces
          </p>
        </div>
      </div>
    </div>
  )
}
