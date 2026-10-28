/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Client Supabase pour START60.
 *
 * Les variables sont injectées à la compilation par Vite (préfixe VITE_).
 * - En local : définies dans `.env.local` (non commité).
 * - En production : définies dans les variables d'environnement Vercel.
 *
 * La clé `anon` est une clé publique, destinée au navigateur. Ne jamais
 * exposer ici la `service_role` key (réservée au serveur).
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** Indique si la configuration Supabase est présente. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    '[START60] Supabase non configuré : VITE_SUPABASE_URL et/ou VITE_SUPABASE_ANON_KEY manquantes. ' +
      'Les fonctionnalités Supabase seront désactivées.',
  );
}

/**
 * Instance partagée du client Supabase.
 * `null` si la configuration est absente, afin de permettre une dégradation
 * gracieuse (l'app continue de fonctionner sans persistance).
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
