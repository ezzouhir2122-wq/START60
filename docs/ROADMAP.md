# 🗺️ Roadmap de développement & d'amélioration — START60

> Plan d'évolution adapté à l'état réel du projet (Gemini côté serveur, Supabase
> branché, persistance livrée, pas encore d'authentification ni de tests).
> Dernière mise à jour : 28/10/2026

---

## Phase 0 — Débloquer l'existant *(immédiat, ~15 min)*
- [ ] **Exécuter le SQL** de `supabase/migrations/0001_create_ventures.sql` dans le dashboard Supabase → active la persistance déjà codée.
- [ ] Tester le cycle complet en prod : générer → badge « Historique » qui s'incrémente → recharger un dossier → supprimer.
- [ ] Vérifier qu'aucune erreur Supabase ne subsiste dans la console.

## Phase 1 — Fondations techniques & qualité *(priorité haute)*
Le socle avant d'ajouter des features, sinon la dette s'accumule.
- [ ] **Tests** : Vitest + Testing Library. Couvrir d'abord `ventureGenerator.ts` (fallback), `ventureStore.ts` (mock Supabase) et le parsing JSON de l'IA.
- [ ] **Validation du JSON IA avec Zod** : `JSON.parse(text)` dans `server.ts` n'est pas gardé — une réponse malformée casse silencieusement. Valider contre un schéma `VentureProject`, re-générer / fallback si invalide.
- [ ] **Code-splitting** : bundle de 608 KB (warning Vite). `lazy()` sur les 10 modules + `ExportModal` / `HistoryModal`.
- [ ] **Qualité de code** : ESLint + Prettier + script `format`. `.gitattributes` avec `* text=auto` (coupe les warnings CRLF).
- [ ] **CI GitHub Actions** : lint + typecheck + tests + build à chaque push (garde-fou avant déploiement Vercel).

## Phase 2 — Authentification & multi-utilisateur *(priorité haute)*
Aujourd'hui l'historique est **public** (clé anon ouverte à tous). Indispensable avant toute mise en avant publique.
- [ ] **Supabase Auth** (magic link + Google). UI login/signup, gestion de session.
- [ ] **Migration RLS** : ajouter `user_id uuid references auth.users` à `ventures`, remplacer les policies ouvertes par `auth.uid() = user_id`.
- [ ] Lier chaque dossier à l'utilisateur ; l'historique ne montre que ses projets.
- [ ] Conserver un mode invité (dossiers éphémères non persistés).

## Phase 3 — Expérience produit *(valeur utilisateur directe)*
- [ ] **Régénération par module** : bouton « Régénérer » sur chaque module (ex. refaire juste le branding).
- [ ] **Édition manuelle** : champs éditables + re-sauvegarde.
- [ ] **Export PDF** réel (pas seulement Markdown).
- [ ] **Partage public par lien** : page lecture seule `/v/:id`.
- [ ] **Streaming de génération** : afficher les modules au fur et à mesure.

## Phase 4 — Qualité & robustesse de l'IA
- [ ] **Retries + timeout** sur l'appel Gemini (backoff) au lieu d'un fallback immédiat.
- [ ] **Rate limiting** sur `/api/generate` (protection clé / coûts).
- [ ] **Versionner le prompt système** (actuellement inline dans `server.ts`) + A/B testing.
- [ ] **Observabilité** : durée, taux de succès/fallback, coût token (Sentry disponible).

## Phase 5 — Monétisation & scaling *(si objectif commercial)*
- [ ] **Quotas** par utilisateur (X générations/mois en gratuit).
- [ ] **Stripe** : plans Free / Pro (illimité, PDF, partage, multilingue).
- [ ] Table `usage` + enforcement côté serveur.

## Phase 6 — Diffusion & international
- [ ] **i18n** (fr / ar / en) — marché Mondial 2030 multilingue par nature.
- [ ] **SEO** : landing publique indexable, Open Graph dynamique par dossier partagé.
- [ ] **Perf & a11y** : Lighthouse, contrastes, navigation clavier des modales.

---

## 🎯 Ordre recommandé (prochains sprints)
1. **Sprint 1** — Phase 0 + validation Zod + code-splitting + `.gitattributes` *(débloque + stabilise, effort faible)*.
2. **Sprint 2** — Auth Supabase + RLS par `user_id` *(ferme le trou de sécurité)*.
3. **Sprint 3** — Régénération par module + édition + export PDF *(valeur produit visible)*.
4. **Sprint 4** — Tests + CI *(idéalement tissé en continu dès le Sprint 1)*.

## ⚠️ Deux priorités absolues
- **Sécurité RLS** : l'historique est actuellement ouvert à tous → Phase 2.
- **Validation du JSON IA** : un seul `JSON.parse` non gardé peut casser l'app → Phase 1.
