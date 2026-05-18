import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatCurrency, calcDiscount } from '@/utils/formatCurrency';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge variant="info">Nouveau</Badge>}
          {hasDiscount && (
            <Badge variant="danger">-{calcDiscount(product.price, product.compareAtPrice!)}%</Badge>
          )}
        </div>
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">Rupture de stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-green-600 font-medium uppercase tracking-wide mb-1">
          {product.origin}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">{formatCurrency(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">{formatCurrency(product.compareAtPrice!)}</span>
          )}
        </div>
        {product.ratings.count > 0 && (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-500">
            <span className="text-amber-500">★</span>
            <span>{product.ratings.average.toFixed(1)}</span>
            <span>({product.ratings.count})</span>
          </div>
        )}
      </div>
    </Link>
  );
}
