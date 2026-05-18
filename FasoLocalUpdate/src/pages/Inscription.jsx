import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '@/lib/supabase'

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

export default function Inscription() {
  const [fullName, setFullName] = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [error,    setError]    = useState(null)
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    const { error: authError } = await signUp({ email, password, fullName })
    setLoading(false)

    if (authError) {
      if (authError.message.includes('already registered')) {
        setError('Cette adresse email est déjà utilisée.')
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
      return
    }

    // Supabase sends a confirmation email — show success state
    setDone(true)
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 5vw' }}>
        <div style={{ maxWidth: 420, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✉️</div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 24, color: '#1B5E20', marginBottom: 10 }}>
            Vérifiez votre email
          </h2>
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
            Un lien de confirmation a été envoyé à <strong>{email}</strong>. Cliquez sur le lien pour activer votre compte.
          </p>
          <button
            onClick={() => navigate('/connexion')}
            style={{ background: '#2E7D32', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}
          >
            Aller à la connexion
          </button>
        </div>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 5vw' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 26, color: '#1B5E20', marginBottom: 6 }}>
            Créer un compte
          </h1>
          <p style={{ color: '#666', fontSize: 14 }}>
            Rejoignez la communauté FasoLocal
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1px solid #E8F5E9', borderRadius: 18, padding: '32px 28px' }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#B71C1C' }}>
                {error}
              </div>
            )}

            {/* Full name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1B5E20', marginBottom: 6 }}>
                Nom complet
              </label>
              <input
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aissata Ouédraogo"
                style={INPUT}
              />
            </div>

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
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1B5E20', marginBottom: 6 }}>
                Mot de passe <span style={{ color: '#999', fontWeight: 400 }}>(8 caractères minimum)</span>
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={INPUT}
              />
            </div>

            {/* Confirm password */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1B5E20', marginBottom: 6 }}>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                style={{
                  ...INPUT,
                  borderColor: confirm && password !== confirm ? '#EF9A9A' : '#A5D6A7',
                }}
              />
              {confirm && password !== confirm && (
                <p style={{ fontSize: 12, color: '#C62828', marginTop: 4 }}>
                  Les mots de passe ne correspondent pas.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
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
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Création en cours…' : 'Créer mon compte'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#666' }}>
          Déjà un compte ?{' '}
          <Link to="/connexion" style={{ color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
