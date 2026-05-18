'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatCurrency, calcDiscount } from '@/utils/formatCurrency';
import { useCart } from '@/hooks/useCart';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, isInCart } = useCart();

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const alreadyInCart = isInCart(product.id);

  function handleAddToCart() {
    addItem(product, quantity);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Images */}
      <div className="space-y-3">
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          {product.images[selectedImage] && (
            <Image
              src={product.images[selectedImage].url}
              alt={product.images[selectedImage].alt || product.name}
              fill
              className="object-cover"
              priority
            />
          )}
          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <Badge variant="danger" size="md">
                -{calcDiscount(product.price, product.compareAtPrice!)}%
              </Badge>
            </div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                  i === selectedImage ? 'border-green-600' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image src={img.url} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-green-600 font-medium">{product.origin}</span>
          {product.isNew && <Badge variant="info">Nouveau</Badge>}
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

        {product.ratings.count > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.round(product.ratings.average) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.ratings.average.toFixed(1)} ({product.ratings.count} avis)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
          {hasDiscount && (
            <span className="text-lg text-gray-400 line-through">{formatCurrency(product.compareAtPrice!)}</span>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

        {/* Producer */}
        {product.producer && (
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl mb-6">
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold">
              {product.producer.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{product.producer.name}</p>
              <p className="text-xs text-gray-500">Producteur à {product.producer.location}</p>
            </div>
          </div>
        )}

        {/* Quantity & Add to cart */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-gray-500 hover:text-gray-700"
            >
              −
            </button>
            <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="px-3 py-2 text-gray-500 hover:text-gray-700"
            >
              +
            </button>
          </div>
          <Button
            onClick={handleAddToCart}
            variant={alreadyInCart ? 'outline' : 'primary'}
            size="lg"
            fullWidth
            disabled={!product.isAvailable}
          >
            {!product.isAvailable
              ? 'Rupture de stock'
              : alreadyInCart
              ? '✓ Déjà dans le panier'
              : 'Ajouter au panier'}
          </Button>
        </div>

        {/* Delivery info */}
        <div className="border-t border-gray-100 pt-5 space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span>🚚</span>
            <span>Livraison à Ouagadougou : 24h - 48h</span>
          </div>
          <div className="flex items-start gap-2">
            <span>📦</span>
            <span>Livraison gratuite dès 25 000 FCFA d&apos;achat</span>
          </div>
          <div className="flex items-start gap-2">
            <span>🔒</span>
            <span>Paiement sécurisé — Orange Money, Moov Money, Carte bancaire</span>
          </div>
        </div>
      </div>
    </div>
  );
}
