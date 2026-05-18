import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/lib/store'
import { useSession } from '@/hooks/useSession'
import Button from '@/components/ui/Button'

const PAYMENT_METHODS = [
  { id: 'orange_money', label: 'Orange Money',   icon: '📱' },
  { id: 'moov_money',   label: 'Moov Money',     icon: '📲' },
  { id: 'cash',         label: 'Espèces à la livraison', icon: '💵' },
]

const INPUT = "w-full border border-faso-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-faso-500 font-sans"

export default function Checkout() {
  const navigate  = useNavigate()
  const { user }  = useSession()
  const { items, getTotal, clearCart } = useCartStore()

  const [address,  setAddress]  = useState('')
  const [phone,    setPhone]    = useState('')
  const [payment,  setPayment]  = useState('orange_money')
  const [notes,    setNotes]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  const total = getTotal()
  const fmt   = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!address.trim() || !phone.trim()) {
      setError('Veuillez renseigner votre adresse et votre numéro de téléphone.')
      return
    }
    setError(null)
    setLoading(true)

    // TODO Phase 2: call createOrder() then CinetPay Edge Function
    // For now: simulate a 1-second delay then clear cart and confirm
    await new Promise((r) => setTimeout(r, 1000))
    clearCart()
    navigate('/?commande=ok')
  }

  if (items.length === 0) {
    navigate('/panier')
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-[5vw] py-8">
      <h1 className="text-2xl font-extrabold text-faso-800 mb-6">Finaliser la commande</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

          {/* Left — delivery + payment */}
          <div className="space-y-5">
            {/* Delivery details */}
            <div className="bg-white border border-faso-100 rounded-2xl p-5">
              <h2 className="font-bold text-faso-800 text-base mb-4">Livraison</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-faso-700 mb-1">
                    Adresse de livraison
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Quartier, secteur, rue…"
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-faso-700 mb-1">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+226 70 00 00 00"
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-faso-700 mb-1">
                    Notes (optionnel)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instructions pour le livreur…"
                    rows={2}
                    className={INPUT + ' resize-none'}
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white border border-faso-100 rounded-2xl p-5">
              <h2 className="font-bold text-faso-800 text-base mb-4">Mode de paiement</h2>
              <div className="space-y-2">
                {PAYMENT_METHODS.map(({ id, label, icon }) => (
                  <label
                    key={id}
                    className={[
                      'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                      payment === id
                        ? 'border-faso-500 bg-faso-50'
                        : 'border-gray-200 hover:border-faso-300',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={payment === id}
                      onChange={() => setPayment(id)}
                      className="accent-faso-700"
                    />
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-semibold text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right — summary + CTA */}
          <div className="bg-white border border-faso-100 rounded-2xl p-5 sticky top-20">
            <h3 className="font-extrabold text-faso-800 text-base mb-4">Votre commande</h3>

            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span className="truncate flex-1 pr-2">
                    {item.name} <span className="text-gray-400">×{item.qty}</span>
                  </span>
                  <span className="font-semibold flex-shrink-0">
                    {fmt(item.priceRaw * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-faso-100 pt-4 space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="text-faso-600 font-semibold">Gratuite</span>
              </div>
              <div className="flex justify-between font-extrabold text-lg text-faso-800">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">
                {error}
              </p>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full justify-center text-base py-3"
            >
              Confirmer la commande →
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
