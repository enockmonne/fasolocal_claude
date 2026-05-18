import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from '@/lib/supabase'

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

export default function MotDePasseOublie() {
  const [email,   setEmail]   = useState('')
  const [error,   setError]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await resetPassword(email)
    setLoading(false)

    if (authError) {
      setError('Une erreur est survenue. Vérifiez l\'adresse et réessayez.')
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 5vw' }}>
        <div style={{ maxWidth: 420, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✉️</div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 24, color: '#1B5E20', marginBottom: 10 }}>
            Email envoyé
          </h2>
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
            Si un compte existe pour <strong>{email}</strong>, un lien de réinitialisation vous a été envoyé.
          </p>
          <Link to="/connexion" style={{ background: '#2E7D32', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 14, fontFamily: 'Sora, sans-serif' }}>
            Retour à la connexion
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 5vw' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔑</div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 26, color: '#1B5E20', marginBottom: 6 }}>
            Mot de passe oublié
          </h1>
          <p style={{ color: '#666', fontSize: 14 }}>
            Entrez votre email pour recevoir un lien de réinitialisation.
          </p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E8F5E9', borderRadius: 18, padding: '32px 28px' }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#B71C1C' }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1B5E20', marginBottom: 6 }}>
                Adresse email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                style={INPUT}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: '#2E7D32', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, fontFamily: 'Sora, sans-serif', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Envoi…' : 'Envoyer le lien'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#666' }}>
          <Link to="/connexion" style={{ color: '#2E7D32', fontWeight: 600, textDecoration: 'none' }}>
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  )
}
