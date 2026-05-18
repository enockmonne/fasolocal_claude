import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore, useSearchStore } from '@/lib/store'
import { useSession } from '@/hooks/useSession'
import { signOut } from '@/lib/supabase'

export default function Navbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const count    = useCartStore((s) => s.getCount())
  const clearCart = useCartStore((s) => s.clearCart)
  const { query, setQuery } = useSearchStore()
  const { user }  = useSession()
  const navigate  = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setMobileOpen(false)
    navigate('/boutique')
  }

  const handleSignOut = async () => {
    setDropdownOpen(false)
    setMobileOpen(false)
    await signOut()
    clearCart()
    navigate('/')
  }

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <nav className="bg-white border-b border-faso-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-[5vw]">
        <div className="h-16 flex items-center gap-4 justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 no-underline">
            <div className="w-9 h-9 bg-faso-700 rounded-xl flex items-center justify-center text-lg">
              🌿
            </div>
            <span className="font-extrabold text-xl text-faso-800 tracking-tight">FasoLocal</span>
          </Link>

          {/* Search — hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher miel, karité, artisanat..."
              className="flex-1 border border-r-0 border-faso-200 rounded-l-lg px-4 py-2 text-sm
                         outline-none focus:border-faso-500 font-sans"
            />
            <button
              type="submit"
              className="bg-faso-700 hover:bg-faso-800 transition-colors text-white
                         px-4 rounded-r-lg text-base cursor-pointer border-0"
            >
              🔍
            </button>
          </form>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/boutique" className="text-sm font-medium text-faso-700 hover:text-faso-800 no-underline transition-colors">
              Boutique
            </Link>
            <Link to="/vendeurs" className="text-sm font-medium text-faso-700 hover:text-faso-800 no-underline transition-colors">
              Vendeurs
            </Link>

            {/* Cart */}
            <Link to="/panier" className="relative flex items-center gap-1.5 bg-faso-700 hover:bg-faso-800
                                          transition-colors text-white text-sm font-semibold
                                          px-4 py-2 rounded-lg no-underline">
              🛒
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px]
                                 font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="w-9 h-9 rounded-full bg-faso-50 border-2 border-faso-300
                             text-sm font-bold text-faso-800 flex items-center justify-center
                             cursor-pointer hover:bg-faso-100 transition-colors"
                  aria-label="Menu utilisateur"
                >
                  {initials}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-11 bg-white border border-faso-100
                                  rounded-xl shadow-xl w-52 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-faso-800 truncate">
                        {user.user_metadata?.full_name ?? 'Mon compte'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link to="/commandes" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700
                                 hover:bg-gray-50 no-underline border-b border-gray-100">
                      📦 Mes commandes
                    </Link>
                    <Link to="/tableau-de-bord" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700
                                 hover:bg-gray-50 no-underline border-b border-gray-100">
                      🏪 Espace vendeur
                    </Link>
                    <button onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600
                                 hover:bg-red-50 font-sans cursor-pointer bg-transparent border-0">
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/connexion"
                  className="border border-faso-200 text-faso-700 hover:bg-faso-50 transition-colors
                             font-semibold text-sm px-4 py-2 rounded-lg no-underline">
                  Connexion
                </Link>
                <Link to="/inscription"
                  className="bg-faso-50 border border-faso-200 text-faso-800 hover:bg-faso-100 transition-colors
                             font-semibold text-sm px-4 py-2 rounded-lg no-underline">
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/panier" className="relative text-faso-700">
              <span className="text-xl">🛒</span>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px]
                                 font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 text-faso-700 bg-transparent border-0 cursor-pointer text-xl"
              aria-label="Menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-faso-100 py-4 flex flex-col gap-3">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher…"
                className="flex-1 border border-r-0 border-faso-200 rounded-l-lg px-3 py-2
                           text-sm outline-none font-sans"
              />
              <button type="submit"
                className="bg-faso-700 text-white px-4 rounded-r-lg text-base cursor-pointer border-0">
                🔍
              </button>
            </form>

            <Link to="/boutique" onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-faso-700 no-underline py-1">Boutique</Link>
            <Link to="/vendeurs" onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-faso-700 no-underline py-1">Vendeurs</Link>

            {user ? (
              <>
                <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
                  {user.email}
                </div>
                <Link to="/commandes" onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 no-underline py-1">📦 Mes commandes</Link>
                <Link to="/tableau-de-bord" onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-gray-700 no-underline py-1">🏪 Espace vendeur</Link>
                <button onClick={handleSignOut}
                  className="text-sm text-red-600 text-left bg-transparent border-0 cursor-pointer font-sans py-1">
                  Se déconnecter
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link to="/connexion" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-sm font-semibold border border-faso-200 text-faso-700
                             rounded-lg py-2 no-underline hover:bg-faso-50">
                  Connexion
                </Link>
                <Link to="/inscription" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-sm font-semibold bg-faso-700 text-white
                             rounded-lg py-2 no-underline hover:bg-faso-800">
                  Inscription
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
