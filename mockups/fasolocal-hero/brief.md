# FasoLocal Hero Section — Design Brief

## Objective
Redesign the hero section of FasoLocal, a Burkina Faso e-commerce marketplace for authentic local products (honey, shea butter, Faso Dan Fani textiles, artisan crafts, cereals). The hero must feel premium, warm, and authentically West African — not generic.

## Target Audience
- Burkinabé consumers (urban, mobile-first, 70%+ on mobile)
- Diaspora buyers wanting authentic Burkinabé goods
- International buyers interested in ethical/authentic African products

## What Makes It Memorable
A warm terracotta-to-amber gradient hero background (departing from the old dark green) anchored by a bold geometric "kente strip" — a repeating chevron/diamond pattern in faso-green and gold that runs as a horizontal accent band. This pattern references the woven geometry of Faso Dan Fani fabric and grounds the page in Burkinabé craft culture without being kitschy. Product cards float with a warm shadow on a lighter panel, giving a tactile "market stall" feel.

## Aesthetic Direction
- **Mood**: Warm, abundant, trustworthy, handcrafted-but-modern. Like a high-end West African artisan market, not a generic SaaS landing page.
- **NOT**: Dark, cold, tech-forward, or generic "African" (no drums, no maps, no tribal clichés).
- **References**: Jumia's clean product grid + Etsy's craft warmth + localized West African warmth.
- **Key departure from current design**: Swap dark-green gradient → warm terracotta (#b45309 to amber #f59e0b) gradient background on the left text panel. Green is used as a CONTRAST accent, not the hero bg.

## Color Palette
- `faso-green`: #15803d (trust, nature, freshness — used for accents, badges, CTA outline)
- `faso-gold` / amber: #f59e0b (warmth, premium — used for primary CTA, highlights, pattern)
- terracotta: #b45309 (earthy warmth — used in gradient, kente strip)
- cream: #fef9f0 (background for product cards panel, soft contrast)
- warm gray: #78716c (secondary text)
- white: #ffffff (headlines, CTA text)

## Typography Direction
- **Headline**: Bold serif (Georgia or a system serif fallback) — 3xl–5xl, white, with amber highlight on key word. Feels editorial and authoritative.
- **Subhead**: Sans-serif (system-ui), regular weight, cream/off-white, 1.6 line-height
- **UI text**: Clean sans-serif, readable at small sizes
- **Price/stat numbers**: Bold, tabular — use font-variant-numeric: tabular-nums

## Content Structure

### Left Panel (hero text)
1. **Eyebrow tag**: Small pill badge — "🇧🇫 Fait au Burkina Faso" in green-on-cream
2. **Headline**: "Découvrez l'Authenticité du Burkina Faso" — serif, large, white, with "Burkina Faso" in amber
3. **Subheadline**: "Producteurs locaux certifiés. Produits authentiques. Livraison rapide."
4. **Payment trust row**: Styled text badges for "Orange Money", "Moov Money", "Coris Money" — small pill badges in their brand colors (orange, blue-gray, green respectively). Label: "Paiement sécurisé via :"
5. **CTA row**: 
   - Primary: amber filled button "Explorer la Boutique →"
   - Secondary: outlined white/green button "Notre Mission"

### Right Panel (product cards)
Desktop: 2×2 grid of product mini-cards
Mobile: horizontal scroll row

Cards: each has
- Large emoji in a warm circle bg
- Product name (bold, dark)
- Producer name (small, muted green)
- Price in FCFA (bold amber)
- Small "Voir →" link

Products:
1. 🍯 Miel Pur de Brousse — "Apiculteurs du Sahel" — 3 500 FCFA
2. 🧴 Beurre de Karité Bio — "Coopérative Féminine de Bobo" — 2 800 FCFA
3. 👗 Tissu Faso Dan Fani — "Tisserands de Koudougou" — 8 500 FCFA
4. 🌾 Fonio Blanc Premium — "Producteurs du Sud-Ouest" — 1 200 FCFA

### Bottom Stat Strip
Horizontal bar, dark green bg (#15803d), white text, 3 stats with dividers:
- "200+" label "Producteurs certifiés"
- "1 200+" label "Produits authentiques"  
- "15 000+" label "Clients satisfaits"

### Geometric Kente Accent Strip
A thin (8–12px) horizontal band between hero and stat strip OR as a top border to the hero, using a repeating CSS SVG pattern of chevrons/diamonds in faso-gold and terracotta. Created purely with CSS background-image using SVG data URI.

## Layout
- **Mobile** (< 768px): Stack — text panel full width, product cards in a horizontal scroll row below, then stat strip
- **Desktop** (≥ 1024px): 55% left text panel / 45% right cards panel, side by side. Min-height: 90vh.
- Hero has subtle warm grain texture overlay via CSS (radial gradient noise approximation)

## Technical Constraints
- Pure HTML file, Tailwind CDN via `<script src="https://cdn.tailwindcss.com">`
- Tailwind config block to extend colors inline
- Small `<style>` block for: CSS custom properties, keyframe animations, kente pattern SVG data URI, custom font-smoothing
- NO external image URLs (no Unsplash, no Pexels, no img tags)
- All visuals: CSS gradients + SVG data URIs + emoji
- French language throughout
- Prices formatted as "X XXX FCFA" (French number format)

## Animations (subtle)
- Cards: fade-up on load with staggered delay (0ms, 100ms, 200ms, 300ms)
- Headline: simple fade-in
- Keep it tasteful — no looping or distracting motion

## Output Path
`C:\Users\alion\fasolocal\mockups\fasolocal-hero\index.html`
