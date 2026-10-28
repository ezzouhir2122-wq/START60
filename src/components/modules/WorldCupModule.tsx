import React, { useState } from 'react';
import { WorldCupOpportunityData, WorldCupSectorImpact, WorldCupSector } from '../../types/venture';
import { Trophy, Globe2, Plane, Hotel, UtensilsCrossed, Cpu, Truck, Sparkles, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

interface WorldCupModuleProps {
  worldCup: WorldCupOpportunityData;
}

export const WorldCupModule: React.FC<WorldCupModuleProps> = ({ worldCup }) => {
  const [selectedSector, setSelectedSector] = useState<WorldCupSector | 'Tous'>('Tous');

  const getSectorIcon = (sector: WorldCupSector) => {
    switch (sector) {
      case 'Tourisme':
        return <Globe2 className="w-4 h-4 text-amber-500" />;
      case 'Transport':
        return <Plane className="w-4 h-4 text-blue-500" />;
      case 'Hébergement':
        return <Hotel className="w-4 h-4 text-emerald-500" />;
      case 'Restauration':
        return <UtensilsCrossed className="w-4 h-4 text-orange-500" />;
      case 'Digitalisation':
        return <Cpu className="w-4 h-4 text-indigo-500" />;
      case 'Logistique':
        return <Truck className="w-4 h-4 text-cyan-500" />;
      case 'Artisanat':
        return <Sparkles className="w-4 h-4 text-rose-500" />;
      case 'Services':
        return <Briefcase className="w-4 h-4 text-purple-500" />;
    }
  };

  const filteredImpacts =
    selectedSector === 'Tous'
      ? worldCup.sectorImpacts
      : worldCup.sectorImpacts.filter((s) => s.sector === selectedSector);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Fonction Différenciante Majeure</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span>10. World Cup 2030 Opportunity Analyzer</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Modélisation exclusive de l'impact économique du Mondial 2030 (Maroc · Espagne · Portugal) sur votre activité et les 8 secteurs clés.
        </p>
      </div>

      {/* World Cup Score Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-emerald-500/15 rounded-2xl border-2 border-amber-500/50 p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-bold">
              <span>🇲🇦 Maroc · 🇪🇸 Espagne · 🇵🇹 Portugal 2030</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Indice d'Opportunité Coupe du Monde 2030
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {worldCup.headlineAssessment}
            </p>
          </div>

          {/* Big Score Badge */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/40 p-5 text-center min-w-[180px] shadow-xl shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              World Cup Score
            </div>
            <div className="text-5xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
              {worldCup.worldCupScore}
            </div>
            <div className="text-xs text-slate-400 font-mono">/ 100</div>
            <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Impact Exceptionnel
            </div>
          </div>
        </div>
      </div>

      {/* Filter Sector Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedSector('Tous')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedSector === 'Tous'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Tous les 8 Secteurs ({worldCup.sectorImpacts.length})
        </button>

        {worldCup.sectorImpacts.map((s) => (
          <button
            key={s.sector}
            onClick={() => setSelectedSector(s.sector)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedSector === s.sector
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {getSectorIcon(s.sector)}
            <span>{s.sector}</span>
            <span className="font-mono text-[10px] opacity-80 font-normal">({s.score})</span>
          </button>
        ))}
      </div>

      {/* Sector Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredImpacts.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between hover:border-amber-500/50 transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {getSectorIcon(item.sector)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.sector}</h4>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                      Pertinence {item.relevance}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black font-mono text-slate-900 dark:text-white tabular-nums">
                    {item.score}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">/100</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <div>
                  <strong className="text-slate-500 uppercase text-[10px] block">Opportunité Détectée :</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.opportunity}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <strong className="text-amber-600 dark:text-amber-400 uppercase text-[10px] block">
                    Action Tactique Immédiate :
                  </strong>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {item.actionableTactic}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 font-mono">
              Horizon validation : Q3 2026 - Q1 2028
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Advantages & Immediate Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strategic Advantages */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Avantages Stratégiques Face au Mondial</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {worldCup.strategicAdvantages.map((adv, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-2.5 leading-relaxed">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Immediate Steps for 2030 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <ArrowRight className="w-4 h-4 text-amber-500" />
            <span>Plan d'Action Immédiat pour se Positionner</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {worldCup.immediateStepsFor2030.map((step, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-amber-50/30 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/40 flex items-start gap-2.5 leading-relaxed">
                <span className="text-amber-500 font-bold">0{idx + 1}.</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
