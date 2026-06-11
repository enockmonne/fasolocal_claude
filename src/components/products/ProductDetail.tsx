'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { formatCurrency, calcDiscount } from '@/utils/formatCurrency';
import { useCart } from '@/hooks/useCart';
import Badge from '@/components/ui/Badge';

type Tab = 'description' | 'producteur' | 'avis';

function SvgStar({ filled }: { filled: boolean }) {
  return (
    <svg className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, isInCart } = useCart();

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const alreadyInCart = isInCart(product.id);
  const isLowStock = product.stock > 0 && product.stock <= 5;

  function handleAddToCart() {
    if (!alreadyInCart) {
      addItem(product, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'description', label: 'Description' },
    { key: 'producteur', label: product.producer ? `Producteur` : 'Origine' },
    { key: 'avis', label: `Avis (${product.ratings.count})` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* ── Image gallery ── */}
      <div className="space-y-3">
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              {product.images[selectedImage] && (
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            {hasDiscount && (
              <Badge variant="danger" size="md">
                -{calcDiscount(product.price, product.compareAtPrice!)}%
              </Badge>
            )}
            {product.isNew && <Badge variant="info" size="md">Nouveau</Badge>}
          </div>
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                  i === selectedImage
                    ? 'border-green-600 shadow-sm scale-105'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image src={img.url} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Product info ── */}
      <div>
        {/* Origin & badges */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-green-700 font-semibold">{product.origin}</span>
          {product.isFeatured && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-200">
              ★ Populaire
            </span>
          )}
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-snug">
          {product.name}
        </h1>

        {/* Star rating */}
        {product.ratings.count > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <SvgStar key={i} filled={i < Math.round(product.ratings.average)} />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {product.ratings.average.toFixed(1)}
            </span>
            <span className="text-sm text-gray-400">
              ({product.ratings.count} avis)
            </span>
          </div>
        )}

        {/* Price block */}
        <div className="flex items-baseline gap-3 mb-5">
          <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
          {hasDiscount && (
            <span className="text-lg text-gray-400 line-through">{formatCurrency(product.compareAtPrice!)}</span>
          )}
          {hasDiscount && (
            <span className="text-sm font-semibold text-green-600">
              Économisez {formatCurrency(product.compareAtPrice! - product.price)}
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {product.isAvailable ? (
          <div className="flex items-center gap-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-green-700 font-medium">
              {isLowStock ? `Plus que ${product.stock} en stock — commandez vite !` : 'En stock'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-sm text-red-600 font-medium">Rupture de stock</span>
          </div>
        )}

        {/* Quantity + Add to cart */}
        {product.isAvailable && (
          <div className="flex items-stretch gap-3 mb-5">
            {/* Qty stepper */}
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-11 h-11 flex items-center justify-center text-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-30"
              >
                −
              </button>
              <span className="w-10 text-center text-base font-bold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
                className="w-11 h-11 flex items-center justify-center text-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-30"
              >
                +
              </button>
            </div>

            {/* Add to cart CTA */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 rounded-xl font-bold text-sm transition-colors duration-200 relative overflow-hidden ${
                alreadyInCart || justAdded
                  ? 'bg-green-600 text-white'
                  : 'bg-green-700 hover:bg-green-800 text-white'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Ajouté au panier !
                  </motion.span>
                ) : alreadyInCart ? (
                  <motion.span key="incart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Dans le panier
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Ajouter au panier
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        )}

        {/* Delivery trust strip */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { icon: '🚚', text: 'Livraison 24–48h' },
            { icon: '🔒', text: 'Paiement sécurisé' },
            { icon: '🔄', text: 'Retour 7 jours' },
          ].map((item) => (
            <div key={item.text} className="flex flex-col items-center text-center p-2.5 bg-gray-50 rounded-xl gap-1">
              <span className="text-lg">{item.icon}</span>
              <span className="text-[11px] text-gray-500 font-medium leading-tight">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-100 pt-5">
          <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === 'description' && (
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              )}
              {activeTab === 'producteur' && (
                <div>
                  {product.producer ? (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold text-lg shrink-0">
                        {product.producer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{product.producer.name}</p>
                        <p className="text-sm text-green-700 mt-0.5">📍 {product.producer.location}</p>
                        {product.producer.bio && (
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{product.producer.bio}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Produit d&apos;origine : <strong>{product.origin}</strong>
                    </p>
                  )}
                </div>
              )}
              {activeTab === 'avis' && (
                <div>
                  {product.ratings.count === 0 ? (
                    <p className="text-sm text-gray-500">Aucun avis pour le moment. Soyez le premier !</p>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">{product.ratings.average.toFixed(1)}</p>
                        <div className="flex justify-center gap-0.5 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <SvgStar key={i} filled={i < Math.round(product.ratings.average)} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{product.ratings.count} avis</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Les avis détaillés seront disponibles prochainement.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
