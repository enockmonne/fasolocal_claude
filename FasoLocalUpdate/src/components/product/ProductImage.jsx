import { useState } from 'react'

/**
 * Renders a product image with:
 * - Skeleton loading state while the image fetches
 * - Graceful fallback to the product emoji if the URL fails or is absent
 *
 * Props:
 *   src     — image URL (can be null/undefined)
 *   emoji   — fallback emoji character
 *   alt     — accessible alt text
 *   className — extra classes on the outer wrapper
 *   imgClassName — extra classes on the <img> itself
 */
export default function ProductImage({ src, emoji = '📦', alt = '', className = '', imgClassName = '' }) {
  const [status, setStatus] = useState(src ? 'loading' : 'fallback')

  if (!src || status === 'fallback') {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-faso-50 to-faso-100 ${className}`}>
        <span className="select-none" role="img" aria-label={alt}>{emoji}</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-faso-50 ${className}`}>
      {/* Skeleton pulse while loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-faso-100" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('fallback')}
        className={[
          'w-full h-full object-cover transition-opacity duration-300',
          status === 'loaded' ? 'opacity-100' : 'opacity-0',
          imgClassName,
        ].join(' ')}
      />
    </div>
  )
}
