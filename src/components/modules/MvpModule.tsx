import React from 'react';
import { MvpBuilderData } from '../../types/venture';
import { Rocket, CheckCircle2, Ban, Layers, Clock, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

interface MvpModuleProps {
  mvp: MvpBuilderData;
}

export const MvpModule: React.FC<MvpModuleProps> = ({ mvp }) => {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>5. MVP 7-Jours & Cahier des Charges Sprint</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          La spécification minimale pour tester le produit en production et encaisser les premières transactions en 7 jours chrono.
        </p>
      </div>

      {/* Sprint Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 rounded-2xl border border-amber-500/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Rocket className="w-4 h-4 text-amber-500" />
            <span>Objectif 7 Jours Chrono</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {mvp.tagline}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
          <div className="text-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Délai Sprint</div>
            <div className="font-bold text-amber-500 text-sm">{mvp.estimatedDays} Jours</div>
          </div>
          <div className="text-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">Budget Dev</div>
            <div className="font-bold text-emerald-500 text-sm">{mvp.estimatedCost}</div>
          </div>
        </div>
      </div>

      {/* Mandatory vs To Ignore Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Must-Have Features (P0) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Fonctionnalités Obligatoires (P0)</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
              Indispensables J1-J7
            </span>
          </div>

          <div className="space-y-3">
            {mvp.mustHaveFeatures.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="text-emerald-500 font-mono">0{idx + 1}.</span>
                    <span>{item.title}</span>
                  </span>
                  {item.targetDay && (
                    <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.targetDay}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features to Ignore (Nice to Have -> Cut for V1) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              <Ban className="w-4 h-4 text-rose-500" />
              <span>Fonctionnalités à Ignorer Impérativement (V1)</span>
            </div>
            <span className="text-[10px] font-mono text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full font-bold">
              Anti-Perte de Temps
            </span>
          </div>

          <div className="space-y-3">
            {mvp.featuresToIgnore.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-50/20 dark:bg-rose-950/10 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 line-through opacity-80">
                    <span>{item.title}</span>
                  </span>
                  <span className="text-[10px] font-mono text-rose-500 font-medium">Reporté V2</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
                {item.reasonIfIgnored && (
                  <div className="text-[11px] text-rose-600 dark:text-rose-400 italic pt-1 border-t border-rose-200/40 dark:border-rose-900/40">
                    <strong>Pourquoi éliminer : </strong> {item.reasonIfIgnored}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Tech Stack Architecture */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span>Stack Technique Recommandée pour Vélocité Maximale</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Frontend</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">{mvp.recommendedTechStack.frontend}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Backend / API</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">{mvp.recommendedTechStack.backend}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Base de Données</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">{mvp.recommendedTechStack.database}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Moteur IA</div>
            <div className="text-xs font-bold text-amber-500">{mvp.recommendedTechStack.ai}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Paiements</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">{mvp.recommendedTechStack.payment}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Hébergement</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">{mvp.recommendedTechStack.hosting}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
