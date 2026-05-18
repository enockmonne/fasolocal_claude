/**
 * Full-page or inline loading spinner.
 * fullPage: centers in 60vh container
 */
export default function Spinner({ fullPage = false }) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <svg className="w-8 h-8 animate-spin text-faso-600" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p className="text-sm text-gray-400 font-sans">Chargement…</p>
    </div>
  )

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {spinner}
      </div>
    )
  }

  return spinner
}
