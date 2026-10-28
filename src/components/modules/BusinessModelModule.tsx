import React from 'react';
import { BusinessModelCanvasData } from '../../types/venture';
import { Target, Users, DollarSign, Wallet, Megaphone, Handshake, Briefcase, Server, HeartHandshake } from 'lucide-react';

interface BusinessModelModuleProps {
  canvas: BusinessModelCanvasData;
}

export const BusinessModelModule: React.FC<BusinessModelModuleProps> = ({ canvas }) => {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>2. Business Model Canvas Stratégique</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Format standard international en 9 blocs interconnectés pour structurer la création de valeur et la monétisation.
        </p>
      </div>

      {/* 9-Block Canvas Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Col 1: Key Partners */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              <Handshake className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Partenaires Clés</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {canvas.keyPartners.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-indigo-500 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
            Alliances stratégiques & sous-traitance
          </div>
        </div>

        {/* Col 2: Key Activities & Key Resources */}
        <div className="md:col-span-1 space-y-4 flex flex-col">
          {/* Key Activities */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              <Briefcase className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Activités Clés</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {canvas.keyActivities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-blue-500 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Resources */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              <Server className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>Ressources Clés</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {canvas.keyResources.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-cyan-500 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Col 3: Centerpiece - Value Proposition */}
        <div className="md:col-span-1 bg-gradient-to-b from-amber-500/10 via-white to-white dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-900 rounded-2xl border-2 border-amber-500/50 p-4 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3">
              <Target className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Proposition de Valeur</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-800 dark:text-slate-200">
              {canvas.valueProposition.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed font-medium">
                  <span className="text-amber-500 font-bold shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-200/50 dark:border-amber-900/40 text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase">
            Cœur du réacteur & Promesse client
          </div>
        </div>

        {/* Col 4: Customer Relationships & Channels */}
        <div className="md:col-span-1 space-y-4 flex flex-col">
          {/* Customer Relationships */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              <HeartHandshake className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Relation Client</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {canvas.customerRelationships.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-rose-500 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Acquisition Channels */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              <Megaphone className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Canaux d'Acquisition</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {canvas.acquisitionChannels.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-orange-500 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Col 5: Customer Segments */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              <Users className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Segments Clients</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {canvas.customerSegments.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-emerald-500 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
            Cibles prioritaires & Persona 2030
          </div>
        </div>
      </div>

      {/* Bottom Financial Foundations: Cost Structure vs Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cost Structure */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
            <Wallet className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Structure de Coûts (Burn & Dépenses)</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
            {canvas.costStructure.map((item, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-2">
                <span className="text-rose-500 font-bold">›</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Revenue Streams */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
            <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Flux de Revenus (Monétisation)</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
            {canvas.revenueStreams.map((item, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 flex items-start gap-2">
                <span className="text-emerald-500 font-bold">›</span>
                <span className="leading-snug font-medium text-slate-800 dark:text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
