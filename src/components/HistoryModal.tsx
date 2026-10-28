/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, History, FolderOpen, Trash2, Clock } from 'lucide-react';
import type { StoredVentureSummary } from '../services/ventureStore';

interface HistoryModalProps {
  items: StoredVentureSummary[];
  loading: boolean;
  onClose: () => void;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const HistoryModal: React.FC<HistoryModalProps> = ({
  items,
  loading,
  onClose,
  onLoad,
  onDelete,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Historique des dossiers</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Projets sauvegardés dans Supabase
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              Chargement de l'historique…
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center">
              <FolderOpen className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Aucun dossier sauvegardé pour l'instant.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
                Générez une idée : elle sera automatiquement enregistrée ici.
              </p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400/60 dark:hover:border-amber-500/40 bg-slate-50/60 dark:bg-slate-800/40 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {item.ideaPrompt}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onLoad(item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                      title="Ouvrir ce dossier"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Ouvrir</span>
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Supprimer ce dossier"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
