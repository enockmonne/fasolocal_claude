import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 5vw' }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🌿</div>
      <h1 style={{ fontWeight: 800, fontSize: 32, color: '#1B5E20', marginBottom: 8 }}>Page introuvable</h1>
      <p style={{ color: '#666', marginBottom: 28 }}>Cette page n'existe pas ou a été déplacée.</p>
      <Link to="/" style={{ background: '#2E7D32', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700 }}>
        Retour à l'accueil →
      </Link>
    </div>
  )
}
