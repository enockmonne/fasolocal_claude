import { Navigate, useLocation } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'

/**
 * Wraps any route that requires authentication.
 * - Still loading  → shows a minimal spinner so the page doesn't flash
 * - No session     → redirects to /connexion, preserving the intended path
 *                    so we can send them back after login
 * - Has session    → renders children normally
 *
 * Usage in App.jsx:
 *   <Route path="/panier" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children }) {
  const { session, loading } = useSession()
  const location = useLocation()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🌿</div>
          <p style={{ color: '#888', fontSize: 14, fontFamily: 'Sora, sans-serif' }}>Chargement…</p>
        </div>
      </div>
    )
  }

  if (!session) {
    // Pass the current path as state so Connexion can redirect back after login
    return <Navigate to="/connexion" state={{ from: location.pathname }} replace />
  }

  return children
}
