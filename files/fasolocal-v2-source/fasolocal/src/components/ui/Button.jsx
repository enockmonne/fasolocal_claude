/**
 * Shared Button component.
 * variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * size: 'sm' | 'md' | 'lg'
 */
const VARIANTS = {
  primary:   'bg-faso-700 text-white hover:bg-faso-800 border-transparent',
  secondary: 'bg-faso-50  text-faso-700 hover:bg-faso-100 border-faso-200',
  ghost:     'bg-transparent text-faso-700 hover:bg-faso-50 border-faso-200',
  danger:    'bg-red-600 text-white hover:bg-red-700 border-transparent',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3   text-base rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold border',
        'transition-colors cursor-pointer',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? <Spinner size={size} /> : children}
    </button>
  )
}

function Spinner({ size }) {
  const dim = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  return (
    <svg className={`${dim} animate-spin`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}
