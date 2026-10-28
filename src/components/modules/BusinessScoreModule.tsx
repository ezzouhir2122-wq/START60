import React, { useState } from 'react';
import { BusinessScoreData, DecisionStatus } from '../../types/venture';
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, DollarSign, Wrench, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

interface BusinessScoreModuleProps {
  scoreData: BusinessScoreData;
  onUpdateScore?: (updated: BusinessScoreData) => void;
}

export const BusinessScoreModule: React.FC<BusinessScoreModuleProps> = ({ scoreData }) => {
  const [showSimulator, setShowSimulator] = useState(false);
  const [market, setMarket] = useState(scoreData.marketPotential);
  const [revenue, setRevenue] = useState(scoreData.revenuePotential);
  const [execDiff, setExecDiff] = useState(scoreData.executionDifficulty);
  const [comp, setComp] = useState(scoreData.competitionLevel);
  const [aiOpp, setAiOpp] = useState(scoreData.aiOpportunityScore);

  // Recalculate dynamic score if simulator active
  const simulatedScore = Math.round(
    market * 0.28 + revenue * 0.26 + (100 - execDiff) * 0.18 + (100 - comp) * 0.1 + aiOpp * 0.18
  );

  let simulatedDecision: DecisionStatus = 'GO';
  if (simulatedScore < 55) simulatedDecision = 'NO GO';
  else if (simulatedScore < 75) simulatedDecision = 'PIVOT';

  const currentScore = showSimulator ? simulatedScore : scoreData.overallScore;
  const currentDecision = showSimulator ? simulatedDecision : scoreData.decision;

  const getDecisionBadge = (decision: DecisionStatus) => {
    switch (decision) {
      case 'GO':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
          dot: '🟢',
          label: 'GO — Projet Validé pour Accélération',
          desc: 'Potentiel de rentabilité élevé, barrières protectrices et forte adéquation avec la demande 2030.',
        };
      case 'PIVOT':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
          dot: '🟠',
          label: 'PIVOT — Réajustement Recommandé',
          desc: 'Base prometteuse mais nécessitant de clarifier la monétisation ou de réduire les coûts d’acquisition.',
        };
      case 'NO GO':
        return {
          icon: <XCircle className="w-5 h-5 text-rose-500" />,
          color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
          dot: '🔴',
          label: 'NO GO — Risques Majeurs Identifiés',
          desc: 'Marché saturé, marge unitaire trop faible ou difficulté d’exécution disproportionnée.',
        };
    }
  };

  const badgeInfo = getDecisionBadge(currentDecision);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>1. Business Score & Diagnostic d'Investissement</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Calcul pondéré par le comité d'analystes selon les critères Y Combinator & Seed VC.
          </p>
        </div>

        <button
          onClick={() => setShowSimulator(!showSimulator)}
          className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            showSimulator
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showSimulator ? 'Masquer le simulateur' : 'Simulateur de sensibilité'}</span>
        </button>
      </div>

      {/* Main Score & Decision Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Score Dial Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
            Score Global d'Opportunité
          </div>

          {/* Circular SVG Gauge */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className={
                  currentScore >= 75
                    ? 'stroke-emerald-500'
                    : currentScore >= 55
                    ? 'stroke-amber-500'
                    : 'stroke-rose-500'
                }
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * currentScore) / 100}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {currentScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
            <span>Index de viabilité :</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {currentScore >= 75 ? 'Excellent' : currentScore >= 55 ? 'Modéré' : 'Critique'}
            </span>
          </div>
        </div>

        {/* Verdict Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Verdict Officiel du Comité
            </div>

            <div className={`p-4 rounded-xl border flex items-start gap-3.5 mb-4 ${badgeInfo.color}`}>
              <span className="text-2xl shrink-0">{badgeInfo.dot}</span>
              <div>
                <div className="text-base font-bold tracking-tight">{badgeInfo.label}</div>
                <p className="text-xs mt-1 opacity-90 leading-relaxed">{badgeInfo.desc}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">
                Analyse & Motivation du Jury :
              </strong>
              <p>{scoreData.decisionReason}</p>
              <p className="text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-200/50 dark:border-slate-800/80">
                {scoreData.verdictSummary}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
            <span>Décision : {currentDecision}</span>
            <span aria-hidden="true">·</span>
            <span>Éligibilité Bourse Innovation : {currentScore >= 70 ? '100% Éligible' : 'Conditionnelle'}</span>
            <span aria-hidden="true">·</span>
            <span>Délai d’accélération : 60 jours</span>
          </div>
        </div>
      </div>

      {/* 5 Sub-Scores Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
          Décomposition des 5 Piliers Stratégiques
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Market Potential */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                <span>Potentiel Marché</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                {showSimulator ? market : scoreData.marketPotential}/100
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${showSimulator ? market : scoreData.marketPotential}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Profondeur de la demande et taille du marché adressable.
            </p>
          </div>

          {/* 2. Revenue Potential */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Revenus & Marge</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                {showSimulator ? revenue : scoreData.revenuePotential}/100
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${showSimulator ? revenue : scoreData.revenuePotential}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Capacité à générer du cash-flow récurrent et marges brutes &gt; 60%.
            </p>
          </div>

          {/* 3. Execution Difficulty */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                <Wrench className="w-3.5 h-3.5 text-amber-500" />
                <span>Complexité Exéc.</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                {showSimulator ? execDiff : scoreData.executionDifficulty}/100
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${showSimulator ? execDiff : scoreData.executionDifficulty}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Barrières logistiques, réglementaires et vélocité de déploiement.
            </p>
          </div>

          {/* 4. Competition Level */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-500" />
                <span>Pression Concurr.</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                {showSimulator ? comp : scoreData.competitionLevel}/100
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${showSimulator ? comp : scoreData.competitionLevel}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Acteurs en place, coûts d’acquisition et différentiation défendable.
            </p>
          </div>

          {/* 5. AI Opportunity Score */}
          <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Levier IA 2030</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                {showSimulator ? aiOpp : scoreData.aiOpportunityScore}/100
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full"
                style={{ width: `${showSimulator ? aiOpp : scoreData.aiOpportunityScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Automatisation par IA générative, vision multimodale et traduction.
            </p>
          </div>
        </div>

        {/* Sensitivity Simulator Drawer */}
        {showSimulator && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 bg-amber-50/30 dark:bg-amber-950/10 p-4 rounded-xl border border-amber-200/50 dark:border-amber-900/30 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
              <span>Simulateur en temps réel (Ajustez les curseurs pour observer l'impact)</span>
              <button
                onClick={() => {
                  setMarket(scoreData.marketPotential);
                  setRevenue(scoreData.revenuePotential);
                  setExecDiff(scoreData.executionDifficulty);
                  setComp(scoreData.competitionLevel);
                  setAiOpp(scoreData.aiOpportunityScore);
                }}
                className="underline hover:text-amber-800 dark:hover:text-amber-300"
              >
                Réinitialiser
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <label className="text-[11px] block text-slate-600 dark:text-slate-400 mb-1">
                  Marché : {market}%
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={market}
                  onChange={(e) => setMarket(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[11px] block text-slate-600 dark:text-slate-400 mb-1">
                  Revenus : {revenue}%
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={revenue}
                  onChange={(e) => setRevenue(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[11px] block text-slate-600 dark:text-slate-400 mb-1">
                  Difficulté : {execDiff}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={execDiff}
                  onChange={(e) => setExecDiff(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[11px] block text-slate-600 dark:text-slate-400 mb-1">
                  Concurrence : {comp}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={comp}
                  onChange={(e) => setComp(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[11px] block text-slate-600 dark:text-slate-400 mb-1">
                  Levier IA : {aiOpp}%
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={aiOpp}
                  onChange={(e) => setAiOpp(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
