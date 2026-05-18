import { BADGE_STYLES } from '@/lib/data'

/**
 * Shared Badge component for product quality labels.
 * Reads colour tokens from BADGE_STYLES in data.js.
 */
export default function Badge({ label, className = '' }) {
  const styles = BADGE_STYLES[label] ?? BADGE_STYLES.Local

  return (
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${className}`}
      style={{ background: styles.bg, color: styles.color }}
    >
      {label}
    </span>
  )
}
