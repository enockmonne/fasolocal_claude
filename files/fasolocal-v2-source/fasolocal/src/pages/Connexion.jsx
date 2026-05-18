import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signIn } from '@/lib/supabase'

const INPUT = {
  width: '100%',
  border: '1.5px solid #A5D6A7',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 14,
  fontFamily: 'Sora, sans-serif',
  outline: 'none',
  color: '#333',
  boxSizing: 'border-box',
}

const BTN_PRIMARY = {
  width: '100%',
  background: '#2E7D32',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '13px',
  fontSize: 15,
  fontWeight: 700,
  fontFamily: 'Sora, sans-serif',
  cursor: 'pointer',
}

export default function Connexion() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState(null)
  const [loading,  setLoading]  = useState(false)

  const navigate  = useNavigate()
  const location  = useLocation()
  // After login, go back to where the user was trying to go (default: /boutique)
  const redirectTo = location.state?.from ?? '/boutique'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await signIn({ email, password })

    setLoading(false)

    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'Email ou mot de passe incorrect.'
        : 'Une erreur est survenue. Veuillez réessayer.')
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 5vw' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 26, color: '#1B5E20', marginBottom: 6 }}>
            Connexion
          </h1>
          <p style={{ color: '#666', fontSize: 14 }}>
            Accédez à votre compte FasoLocal
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1px solid #E8F5E9', borderRadius: 18, padding: '32px 28px' }}>
          <form onSubmit={handleSubmit}>
            {/* Error banner */}
            {error && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#B71C1C' }}>
                {error}
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1B5E20', marginBottom: 6 }}>
                Adresse email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                style={INPUT}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1B5E20', marginBottom: 6 }}>
                Mot de passe
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={INPUT}
              />
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginBottom: 24 }}>
              <Link to="/mot-de-passe-oublie" style={{ fontSize: 13, color: '#2E7D32', textDecoration: 'none' }}>
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{ ...BTN_PRIMARY, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Connexion en cours…' : 'Se connecter'}
            </button>
          </form>
        </div>

        {/* Sign up link */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#666' }}>
          Pas encore de compte ?{' '}
          <Link to="/inscription" style={{ color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}
