import { SELLERS } from '@/lib/data'

export default function Sellers() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 5vw' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontWeight: 800, fontSize: 32, color: '#1B5E20', marginBottom: 10 }}>Nos Vendeurs Locaux</h1>
        <p style={{ color: '#666', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
          Des producteurs et artisans vérifiés du Burkina Faso qui partagent leurs savoir-faire.
        </p>
      </div>

      {/* Join CTA */}
      <div style={{ background: 'linear-gradient(135deg, #2E7D32, #43A047)', borderRadius: 20, padding: '32px 40px', marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Vous êtes producteur ?</h2>
          <p style={{ color: '#C8E6C9', fontSize: 14 }}>Rejoignez FasoLocal et vendez vos produits à travers tout le Burkina.</p>
        </div>
        <button style={{ background: '#fff', color: '#2E7D32', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          Devenir vendeur →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {SELLERS.map((s) => (
          <div key={s.id} style={{ background: '#fff', border: '1px solid #E8F5E9', borderRadius: 16, padding: '20px', transition: 'box-shadow 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,125,50,0.1)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 52, height: 52, background: '#F1F8E9', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{s.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#1B5E20', fontSize: 15 }}>
                  {s.name} {s.verified && <span style={{ color: '#1565C0', fontSize: 14 }}>✓</span>}
                </div>
                <div style={{ fontSize: 12, color: '#888' }}>📍 {s.location}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#555' }}>
              <span>⭐ {s.rating}</span>
              <span>🛒 {s.products} produits</span>
              <span>📅 Depuis {s.since}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
