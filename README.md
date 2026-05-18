# FasoLocal 🇧🇫

**Produits Locaux du Burkina Faso — Boutique en Ligne**

FasoLocal est une plateforme e-commerce dédiée à la promotion et la vente des produits locaux du Burkina Faso : agroalimentaire, cosmétiques au karité, artisanat, textiles Faso Dan Fani, et plus.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Langage:** TypeScript
- **Styling:** Tailwind CSS
- **Base de données:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js
- **Paiements:** Stripe + Orange Money + Moov Money
- **Déploiement:** Vercel

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.example .env.local
# Remplir les variables dans .env.local

# 3. Générer le client Prisma
npm run db:generate

# 4. Pousser le schema vers la base de données
npm run db:push

# 5. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du Projet

```
src/
├── app/          → Pages & routes API (Next.js App Router)
├── components/   → Composants React réutilisables
├── config/       → Configuration du site
├── context/      → Providers React (Panier, Auth)
├── hooks/        → Hooks personnalisés
├── lib/          → Setup SDK (Prisma, Auth, Stripe)
├── services/     → Couche d'accès aux données
├── styles/       → Styles globaux
├── types/        → Types TypeScript
└── utils/        → Fonctions utilitaires
```

## Catégories de Produits

- 🌾 Agroalimentaire
- ✨ Cosmétiques & Karité
- 🏺 Artisanat
- 🧵 Textiles & Faso Dan Fani
- 🌿 Santé & Bien-être
- 🥤 Boissons Locales
- 🌽 Céréales & Farines
- 🫚 Épices & Condiments

## Licence

Propriétaire — © FasoLocal
