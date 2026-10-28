# 📋 Cahier des Charges — START60

> **AI Venture Builder** · *From Idea To Startup In 60 Minutes*
> Version 1.0 — Dernière mise à jour : 28/10/2026

---

## 1. Présentation du projet

**START60** est une plateforme d'accélération propulsée par l'intelligence artificielle qui transforme **n'importe quelle idée en startup prête à lancer en 60 minutes**. L'utilisateur saisit une idée en langage naturel et reçoit un dossier d'incubation complet généré par IA (analyse de marché, modèle économique, plan financier, MVP, marque, landing page, marketing, roadmap et opportunités Coupe du Monde 2030).

| Élément | Détail |
|---------|--------|
| **Nom** | START60 — AI Venture Builder |
| **Slogan** | From Idea To Startup In 60 Minutes |
| **Type** | Application Web (SPA) propulsée par IA |
| **Langue par défaut** | Français 🇫🇷 |
| **Dépôt GitHub** | https://github.com/ezzouhir2122-wq/START60 |
| **Déploiement Vercel** | https://vercel.com/ezzouhir2122-9529s-projects/start-60 |
| **Origine** | Google AI Studio App |

---

## 2. Objectifs

### Objectif principal
Permettre à tout entrepreneur, étudiant ou porteur de projet de **valider et structurer une idée de startup en moins d'une heure**, sans compétence technique ni business préalable.

### Objectifs spécifiques
- 🎯 Fournir une **décision claire** : GO / PIVOT / NO GO avec score chiffré.
- 📊 Produire une **analyse de marché** (TAM/SAM/SOM, concurrents, opportunités).
- 💰 Générer un **plan financier** réaliste (budget, burn, break-even, projections 36 mois).
- 🚀 Définir un **MVP livrable en 7 jours** avec stack technique recommandée.
- 🎨 Créer une **identité de marque** complète (nom, slogan, palette, archétype).
- 🌐 Proposer une **landing page** clé en main.
- 📣 Bâtir un **plan marketing** (organique, social, publicité).
- 🗺️ Tracer une **roadmap 90 jours** avec KPIs et actions.
- 🏆 Identifier les **opportunités liées à la Coupe du Monde 2030** (contexte Maroc).

---

## 3. Public cible

- **Entrepreneurs** débutants cherchant à valider rapidement une idée.
- **Étudiants** en entrepreneuriat / écoles de commerce et de code.
- **Porteurs de projet** dans le contexte marocain (opportunités Mondial 2030).
- **Mentors & incubateurs** souhaitant un premier diagnostic rapide.

---

## 4. Périmètre fonctionnel

### 4.1 Parcours utilisateur
1. **Saisie de l'idée** — champ de texte libre (`IdeaInputSection`).
2. **Incubation IA** — animation de chargement avec agents virtuels (`IncubatorLoading`).
3. **Dashboard** — affichage des 10 modules d'analyse (`VentureDashboard`).
4. **Navigation** — filtrage par onglet (vue "all" ou module par module).
5. **Export** — téléchargement/partage du dossier (`ExportModal`).
6. **Nouvelle idée** — réinitialisation pour relancer un projet.

### 4.2 Les 10 modules d'analyse

| # | Module | Composant | Contenu clé |
|---|--------|-----------|-------------|
| 1 | **Business Score** | `BusinessScoreModule` | Score global, décision GO/PIVOT/NO GO, potentiel marché, revenus, difficulté d'exécution, niveau de concurrence, score d'opportunité IA |
| 2 | **Analyse de Marché** | `MarketAnalysisModule` | TAM/SAM/SOM, taux de croissance, concurrents directs/indirects, opportunités, menaces |
| 3 | **Business Model Canvas** | `BusinessModelModule` | 9 blocs : proposition de valeur, segments clients, revenus, coûts, canaux, partenaires, activités, ressources, relations clients |
| 4 | **Estimation Financière** | `FinancialModule` | Budget de départ, dépenses mensuelles, prix recommandé, clients nécessaires, mois de rentabilité, projections (M1→M36), répartition du burn |
| 5 | **MVP Builder** | `MvpModule` | Tagline, durée/coût estimés, features Must-Have (P0), features à ignorer V1, stack technique, checklist de lancement |
| 6 | **Générateur de Marque** | `BrandModule` | Nom + alternatives, slogan, brand story, valeurs, palette de couleurs, style graphique, archétype |
| 7 | **Générateur de Site Web** | `WebsiteModule` | Hero, fonctionnalités, CTA, FAQ, footer (landing page complète) |
| 8 | **Plan Marketing** | `MarketingModule` | Budget minimum, stratégie organique, réseaux sociaux, canaux d'acquisition, campagnes publicitaires |
| 9 | **Roadmap 90 Jours** | `RoadmapModule` | 3 mois détaillés : thème, KPIs, actions cochables |
| 10 | **Opportunités Mondial 2030** | `WorldCupModule` | Score Coupe du Monde, impacts par secteur (tourisme, transport, hébergement…), avantages stratégiques, étapes immédiates 2030 |

### 4.3 Fonctionnalités transverses
- 🌓 **Mode sombre / clair** persistant (localStorage `start60-theme`).
- 🤖 **Fallback intelligent** : en cas d'échec de l'API, génération contextuelle locale.
- 🎉 **Effets visuels** (canvas-confetti, animations motion).
- 📤 **Export** du dossier d'incubation.

---

## 5. Spécifications techniques

### 5.1 Stack
| Couche | Technologie |
|--------|-------------|
| **Frontend** | React 19 + TypeScript |
| **Build** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **Serveur** | Express + tsx (`server.ts`) |
| **IA** | Google GenAI SDK (`@google/genai`) — Gemini |
| **Icônes** | lucide-react |
| **Animations** | motion, canvas-confetti |
| **Polices** | Plus Jakarta Sans, JetBrains Mono |

### 5.2 Structure du projet
```
START60/
├── docs/                      # Documentation projet (ce cahier des charges)
├── public/                    # Assets statiques
├── src/
│   ├── App.tsx                # Point d'entrée applicatif
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── IdeaInputSection.tsx
│   │   ├── IncubatorLoading.tsx
│   │   ├── VentureDashboard.tsx
│   │   ├── ExportModal.tsx
│   │   └── modules/           # Les 10 modules d'analyse
│   ├── services/
│   │   └── ventureGenerator.ts  # Appels Gemini + génération contextuelle
│   └── types/
│       └── venture.ts         # Modèle de données (VentureProject)
├── server.ts                  # Serveur Express
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 5.3 Modèle de données principal
L'objet `VentureProject` agrège les 10 modules (voir `src/types/venture.ts`) : `businessScore`, `marketAnalysis`, `businessModel`, `financialEstimation`, `mvpBuilder`, `brandGenerator`, `websiteGenerator`, `marketingPlan`, `roadmap`, `worldCupAnalysis`.

### 5.4 Variables d'environnement
| Variable | Rôle |
|----------|------|
| `GEMINI_API_KEY` | Clé API Google Gemini (injectée par AI Studio en production) |
| `APP_URL` | URL d'hébergement de l'application |

### 5.5 Scripts
| Commande | Action |
|----------|--------|
| `npm run dev` | Lancement en développement (tsx server.ts) |
| `npm run build` | Build de production (Vite) |
| `npm run preview` | Prévisualisation du build |
| `npm run lint` | Vérification TypeScript (tsc --noEmit) |

---

## 6. Exigences non fonctionnelles

- ⚡ **Performance** : génération complète du dossier en ≤ 60 minutes (objectif perçu : quasi-instantané côté UI).
- 📱 **Responsive** : adaptation mobile / tablette / desktop.
- ♿ **Accessibilité** : contrastes conformes, navigation clavier.
- 🔒 **Sécurité** : clé API côté serveur uniquement (jamais exposée au client).
- 🌍 **SEO** : balises meta Open Graph et Twitter Card configurées.
- 🛡️ **Résilience** : fallback local si l'API Gemini est indisponible.

---

## 7. Workflow Git & Déploiement — ⭐ Règle d'Or

> **Après chaque ajout ou changement : `commit` → `push` → `deploy`.**

1. **Commit** — enregistrer chaque modification avec un message clair.
2. **Push** — pousser vers GitHub (`ezzouhir2122-wq/START60`).
3. **Deploy** — déploiement automatique sur Vercel (`start-60`).

Le déploiement Vercel est déclenché automatiquement à chaque `push` sur la branche principale.

---

## 8. Livrables

- ✅ Application web fonctionnelle déployée sur Vercel.
- ✅ Code source versionné sur GitHub.
- ✅ Documentation projet (`docs/`).
- ✅ 10 modules d'analyse opérationnels.

---

## 9. Évolutions futures (backlog)

- [x] **Persistance des projets (Supabase)** — sauvegarde automatique de chaque dossier généré + historique consultable/rechargeable (accès partagé via clé anon). Table `ventures` (voir `supabase/migrations/0001_create_ventures.sql`).
- [ ] Authentification utilisateur (associer les dossiers à un compte).
- [ ] Historique multi-projets par compte.
- [ ] Export PDF du dossier d'incubation.
- [ ] Multilingue (ar / en).
- [ ] Intégration paiement (offres premium).
- [ ] Partage public d'un dossier via lien.

---

*Document maintenu dans `docs/CAHIER_DES_CHARGES.md` — à mettre à jour à chaque évolution majeure du produit.*
