# 🌿 FasoLocal — Marketplace des Produits Locaux du Burkina Faso

> La 1ère marketplace e-commerce dédiée aux produits authentiques du Burkina Faso — miel, artisanat, céréales, cosmétiques naturels.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com)

---

## ✨ Fonctionnalités

- 🛒 **Boutique** — Catalogue complet avec filtres par catégorie et recherche
- 🛍️ **Panier** — Ajout/retrait de produits, gestion des quantités, récapitulatif
- 👤 **Fiches produit** — Description complète, notation, stock en temps réel
- 🏪 **Vendeurs** — Annuaire des producteurs et artisans vérifiés
- 📱 **Mobile-first** — Responsive design, optimisé pour mobile
- 💳 **Paiements locaux** — Orange Money, Moov Money, Airtel Money, espèces

---

## 🚀 Démarrage rapide

```bash
# Cloner le dépôt
git clone https://github.com/votre-org/fasolocal.git
cd fasolocal

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés Supabase

# Lancer le serveur de développement
npm run dev
```

L'app est disponible sur **http://localhost:3000**

---

## 🏗️ Architecture

```
fasolocal/
├── src/
│   ├── components/
│   │   ├── layout/       # Navbar, Footer
│   │   ├── product/      # ProductCard, ProductGrid
│   │   └── ui/           # Button, Badge, Input
│   ├── pages/
│   │   ├── Home.jsx      # Page d'accueil
│   │   ├── Shop.jsx      # Boutique / catalogue
│   │   ├── ProductDetail # Fiche produit
│   │   ├── Cart.jsx      # Panier
│   │   └── Sellers.jsx   # Annuaire vendeurs
│   ├── lib/
│   │   ├── store.js      # État global (Zustand)
│   │   ├── data.js       # Données statiques / types
│   │   └── supabase.js   # Client Supabase
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
└── tailwind.config.js
```

---

## 🗄️ Backend (Supabase)

### Tables principales

| Table | Description |
|-------|-------------|
| `products` | Catalogue produits |
| `sellers` | Profils vendeurs |
| `orders` | Commandes |
| `order_items` | Lignes de commandes |
| `users` | Comptes utilisateurs |
| `reviews` | Avis et notes |

---

## 📱 Paiements intégrés

| Méthode | Provider | Notes |
|---------|----------|-------|
| Orange Money | FusionPay / CinetPay | API mobile money BF |
| Moov Money | CinetPay | API mobile money BF |
| Airtel Money | Intégration directe | — |
| Espèces | Livraison | Paiement à la livraison |

---

## 🚢 Déploiement

```bash
# Build de production
npm run build

# Prévisualisation locale
npm run preview

# Déploiement Vercel (recommandé)
vercel --prod

# Déploiement Netlify
netlify deploy --prod --dir=dist
```

---

## 🗺️ Roadmap

### Phase 1 — MVP (Semaines 1-4)
- [x] Structure du projet
- [x] Pages principales (Accueil, Boutique, Panier, Vendeurs)
- [ ] Auth (connexion / inscription)
- [ ] Base de données Supabase
- [ ] Intégration Orange Money

### Phase 2 — Croissance (Mois 2-3)
- [ ] Espace vendeur (dashboard)
- [ ] Système d'avis
- [ ] Notifications push
- [ ] Application mobile (React Native)

### Phase 3 — Échelle (Mois 4-6)
- [ ] Multilingue (Français + Mooré + Dioula)
- [ ] Livraison en temps réel
- [ ] Programme fidélité
- [ ] Export international

---

## 🤝 Contribution

```bash
git checkout -b feature/ma-fonctionnalite
git commit -m "feat: description"
git push origin feature/ma-fonctionnalite
# Ouvrir une Pull Request
```

---

## 📄 Licence

MIT — © 2025 FasoLocal
