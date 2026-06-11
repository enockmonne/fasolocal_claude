'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface HeroSectionProps {
  featuredProducts: Product[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.3 + i * 0.12, duration: 0.55, ease: 'easeOut' as const },
  }),
};

/** Kente-inspired repeating chevron strip using an inline SVG data-URI */
function KenteStrip({ className = '' }: { className?: string }) {
  // Repeating triangles: amber/terracotta/green — 30px wide, 10px tall
  const svgRaw = `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='10'>
    <polygon points='0,10 15,0 30,10' fill='%23d97706'/>
    <polygon points='0,10 15,0 0,0' fill='%2392400e'/>
    <polygon points='30,0 15,0 30,10' fill='%23166534'/>
  </svg>`;
  const uri = `url("data:image/svg+xml,${encodeURIComponent(svgRaw)}")`;
  return (
    <div
      className={`w-full ${className}`}
      style={{ backgroundImage: uri, backgroundRepeat: 'repeat-x', backgroundSize: '30px 10px' }}
    />
  );
}

const stats = [
  { n: '200+', label: 'Producteurs vérifiés' },
  { n: '1 200+', label: 'Produits locaux' },
  { n: '15 000+', label: 'Clients satisfaits' },
];

const payments = [
  { label: 'Orange Money', dot: 'bg-orange-500' },
  { label: 'Moov Money', dot: 'bg-sky-500' },
  { label: 'Coris Money', dot: 'bg-emerald-500' },
];

export default function HeroSection({ featuredProducts }: HeroSectionProps) {
  const cards = featuredProducts.slice(0, 4);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 30%, #b45309 65%, #d97706 100%)' }}
      >
        {/* Soft noise texture */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-22 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: copy ── */}
            <div>
              {/* Eyebrow pill */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-sm font-semibold tracking-widest uppercase border"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(255,255,255,0.25)',
                }}
              >
                <span>🇧🇫</span>
                <span className="text-amber-200">Fait au Burkina Faso</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Les Meilleurs Produits du{' '}
                <em className="not-italic text-amber-300">Burkina Faso</em>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8 max-w-lg"
                style={{ color: 'rgba(254,243,199,0.85)' }}
              >
                Miel artisanal, beurre de karité, Faso Dan Fani, artisanat kassena — directement
                des producteurs burkinabè vérifiés à votre porte.
              </motion.p>

              {/* CTA buttons */}
              <motion.div custom={3} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-amber-900 font-bold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors shadow-md text-sm"
                >
                  Explorer la Boutique
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
                >
                  Notre Mission
                </Link>
              </motion.div>

              {/* Payment badges */}
              <motion.div custom={4} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-amber-200/70 mr-1">Paiements acceptés :</span>
                {payments.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                    {p.label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── Right: product cards ── */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {cards.map((product, i) => {
                const img = product.images.find((im) => im.isPrimary) || product.images[0];
                // Stagger: cards 0 & 2 shifted down, 1 & 3 normal
                const stagger = i % 2 === 0 ? 'mt-6' : '-mt-6';
                return (
                  <motion.div
                    key={product.id}
                    custom={i}
                    initial="hidden"
                    animate="show"
                    variants={cardVariant}
                    className={stagger}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="group relative block rounded-2xl overflow-hidden aspect-square ring-2 ring-transparent hover:ring-amber-400 transition-all duration-300 shadow-lg"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                    >
                      {img && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-xs font-semibold truncate">{product.name}</p>
                        <p className="text-amber-300 text-xs font-bold mt-0.5">
                          {new Intl.NumberFormat('fr-BF').format(product.price)} FCFA
                        </p>
                      </div>
                      {product.isFeatured && (
                        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          ★ Populaire
                        </div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Kente strip ───────────────────────────────────────────────────── */}
      <KenteStrip className="h-2.5" />

      {/* ── Stat bar ──────────────────────────────────────────────────────── */}
      <div className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 divide-x divide-green-700 py-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center py-2 px-4 text-center">
                <span className="text-2xl sm:text-3xl font-bold text-amber-400">{s.n}</span>
                <span className="text-xs sm:text-sm text-green-200 mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Second Kente strip ────────────────────────────────────────────── */}
      <KenteStrip className="h-[7px]" />
    </>
  );
}
