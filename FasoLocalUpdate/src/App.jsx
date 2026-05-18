import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import Spinner from '@/components/ui/Spinner'

// Code-split every page — each loads only when navigated to
const Home              = lazy(() => import('@/pages/Home'))
const Shop              = lazy(() => import('@/pages/Shop'))
const ProductDetail     = lazy(() => import('@/pages/ProductDetail'))
const Sellers           = lazy(() => import('@/pages/Sellers'))
const Cart              = lazy(() => import('@/pages/Cart'))
const Checkout          = lazy(() => import('@/pages/Checkout'))
const Connexion         = lazy(() => import('@/pages/Connexion'))
const Inscription       = lazy(() => import('@/pages/Inscription'))
const MotDePasseOublie  = lazy(() => import('@/pages/MotDePasseOublie'))
const NotFound          = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDF7]">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Spinner fullPage />}>
          <Routes>
            {/* Public */}
            <Route path="/"                    element={<Home />} />
            <Route path="/boutique"            element={<Shop />} />
            <Route path="/produit/:id"         element={<ProductDetail />} />
            <Route path="/vendeurs"            element={<Sellers />} />

            {/* Auth */}
            <Route path="/connexion"           element={<Connexion />} />
            <Route path="/inscription"         element={<Inscription />} />
            <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />

            {/* Protected */}
            <Route path="/panier"    element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/commande"  element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/commandes" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
            <Route path="/tableau-de-bord" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
