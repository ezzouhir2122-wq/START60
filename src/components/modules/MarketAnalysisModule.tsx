import React from 'react';
import { MarketAnalysisData } from '../../types/venture';
import { Globe, Users2, ShieldAlert, Sparkles, TrendingUp, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface MarketAnalysisModuleProps {
  market: MarketAnalysisData;
}

export const MarketAnalysisModule: React.FC<MarketAnalysisModuleProps> = ({ market }) => {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>3. Analyse de Marché & Positionnement Concurrentiel</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Dimensionnement quantitatif (TAM/SAM/SOM), analyse des forces en présence et barrières à l'entrée.
        </p>
      </div>

      {/* TAM / SAM / SOM Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TAM */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider">TAM (Marché Total)</span>
            <Globe className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
            {market.tam.split(' ')[0]}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {market.tam}
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Croissance estimée : <strong className="text-emerald-500">{market.marketGrowthRate}</strong>
          </div>
        </div>

        {/* SAM */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider">SAM (Marché Accessible)</span>
            <Users2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
            {market.sam.split(' ')[0]}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {market.sam}
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Cible géographique & segments acheteurs actifs
          </div>
        </div>

        {/* SOM */}
        <div className="bg-gradient-to-br from-amber-500/10 via-white to-white dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-900 rounded-2xl border-2 border-amber-500/40 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400">
            <span className="font-bold uppercase tracking-wider">SOM (Cible 1-3 Ans)</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tracking-tight">
            {market.som.split(' ')[0]}
          </div>
          <div className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            {market.som}
          </div>
          <div className="pt-2 border-t border-amber-200/40 dark:border-amber-900/40 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
            Part de marché réaliste visée pour le seuil de rentabilité
          </div>
        </div>
      </div>

      {/* Competitors Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Cartographie Concurrentielle (Directs & Indirects)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Direct Competitors */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Concurrents Directs</span>
            </div>

            {market.directCompetitors.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{item.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">Part de marché : ~{item.marketShareEstimate}</span>
                </div>
                <div>
                  <strong className="text-emerald-600 dark:text-emerald-400">Forces : </strong>
                  <span className="text-slate-600 dark:text-slate-300">{item.strengths}</span>
                </div>
                <div>
                  <strong className="text-rose-600 dark:text-rose-400">Faiblesses / Notre brèche : </strong>
                  <span className="text-slate-600 dark:text-slate-300">{item.weaknesses}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Indirect Competitors */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Concurrents Indirects & Alternatives Primitives</span>
            </div>

            {market.indirectCompetitors.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{item.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">Type : {item.type}</span>
                </div>
                <div>
                  <strong className="text-purple-600 dark:text-purple-400">Caractéristique : </strong>
                  <span className="text-slate-600 dark:text-slate-300">{item.strengths}</span>
                </div>
                <div>
                  <strong className="text-slate-700 dark:text-slate-300">Limite majeure : </strong>
                  <span className="text-slate-600 dark:text-slate-300">{item.weaknesses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities & Threats (SWOT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Opportunities */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Opportunités Majeures</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {market.opportunities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-3">
            <AlertOctagon className="w-4 h-4 text-rose-500" />
            <span>Menaces & Risques à Mitiger</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {market.threats.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* KILLER SECTION (REQUIRED): "Pourquoi cette startup a une chance de réussir" */}
      <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 rounded-2xl border-2 border-amber-500/60 p-6 shadow-md relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">
          <span>🏆 Avantage Injuste (Unfair Advantage)</span>
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Pourquoi cette startup a une chance de réussir ?
        </h3>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          "{market.whySucceed}"
        </p>
      </div>
    </div>
  );
};
