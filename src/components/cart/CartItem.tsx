import Image from 'next/image';
import { CartItem as CartItemType } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCart } from '@/hooks/useCart';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const primaryImage = item.product.images.find((i) => i.isPrimary) || item.product.images[0];

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Image */}
      <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
        {primaryImage && (
          <Image src={primaryImage.url} alt={item.product.name} fill className="object-cover" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{item.product.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{item.product.origin}</p>
        <p className="text-sm font-bold text-gray-900 mt-1">{formatCurrency(item.product.price)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center border border-gray-200 rounded-md text-sm">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="px-2 py-1 text-gray-500 hover:text-gray-700"
          >−</button>
          <span className="px-2 py-1 font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="px-2 py-1 text-gray-500 hover:text-gray-700"
          >+</button>
        </div>
      </div>
    </div>
  );
}
