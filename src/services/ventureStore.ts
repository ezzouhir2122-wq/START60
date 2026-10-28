/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { VentureProject } from '../types/venture';

/**
 * Persistance des dossiers d'incubation dans Supabase (table `ventures`).
 *
 * Accès partagé via la clé anon (pas d'authentification) : tout dossier
 * généré est sauvegardé et consultable dans l'historique. Toutes les
 * fonctions se dégradent gracieusement (no-op / liste vide) si Supabase
 * n'est pas configuré, afin que l'app reste utilisable hors-ligne.
 */

const TABLE = 'ventures';

/** Résumé léger d'un dossier stocké, pour l'affichage de l'historique. */
export interface StoredVentureSummary {
  id: string;
  createdAt: string;
  ideaPrompt: string;
  title: string;
}

/** Sauvegarde un dossier et renvoie l'id généré par la base (ou null). */
export async function saveVenture(project: VentureProject): Promise<string | null> {
  if (!supabase) return null;

  const title = project.brandGenerator?.startupName?.trim() || 'Projet sans nom';
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ idea_prompt: project.ideaPrompt, title, data: project })
    .select('id')
    .single();

  if (error) {
    console.error('[START60] saveVenture:', error.message);
    return null;
  }
  return (data?.id as string) ?? null;
}

/** Liste les 50 derniers dossiers (du plus récent au plus ancien). */
export async function listVentures(): Promise<StoredVentureSummary[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from(TABLE)
    .select('id, created_at, idea_prompt, title')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('[START60] listVentures:', error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id as string,
    createdAt: row.created_at as string,
    ideaPrompt: (row.idea_prompt as string) ?? '',
    title: (row.title as string) ?? 'Projet sans nom',
  }));
}

/** Recharge le dossier complet (VentureProject) à partir de son id. */
export async function getVenture(id: string): Promise<VentureProject | null> {
  if (!supabase) return null;

  const { data, error } = await supabase.from(TABLE).select('data').eq('id', id).single();
  if (error) {
    console.error('[START60] getVenture:', error.message);
    return null;
  }
  return (data?.data as VentureProject) ?? null;
}

/** Supprime un dossier de l'historique. */
export async function deleteVenture(id: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) {
    console.error('[START60] deleteVenture:', error.message);
    return false;
  }
  return true;
}

export { isSupabaseConfigured };
