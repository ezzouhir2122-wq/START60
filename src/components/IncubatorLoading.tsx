import React, { useEffect, useState } from 'react';
import { INCUBATOR_AGENTS } from '../services/ventureGenerator';
import { Cpu, CheckCircle2, Loader2, Sparkles, Trophy } from 'lucide-react';

interface IncubatorLoadingProps {
  prompt: string;
}

const GENERATION_STEPS = [
  'Initialisation du comité d’investissement IA...',
  'Audit de faisabilité & scoring de potentiel marché...',
  'Synthèse du Business Model Canvas en 9 piliers...',
  'Extraction des concurrents directs et barrières à l’entrée...',
  'Modélisation financière du burn rate et point mort...',
  'Élagage du MVP 7 jours (P0 vs fonctionnalités à ignorer)...',
  'Conception de la marque, slogan & identité graphique...',
  'Génération de la landing page et des argumentaires de vente...',
  'Cartographie des opportunités Coupe du Monde 2030 (Maroc-Espagne-Portugal)...',
  'Finalisation du dossier Venture prêt à lancer !',
];

export const IncubatorLoading: React.FC<IncubatorLoadingProps> = ({ prompt }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < GENERATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 450);

    const agentInterval = setInterval(() => {
      setActiveAgentIndex((prev) => (prev + 1) % INCUBATOR_AGENTS.length);
    }, 600);

    return () => {
      clearInterval(stepInterval);
      clearInterval(agentInterval);
    };
  }, []);

  const progressPercent = Math.min(
    100,
    Math.round(((currentStepIndex + 1) / GENERATION_STEPS.length) * 100)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Central Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-lg animate-pulse mb-2">
            <Cpu className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Incubateur Numérique en Action
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
            Analyse de votre idée : "{prompt.length > 70 ? prompt.slice(0, 70) + '...' : prompt}"
          </p>

          {/* Progress bar */}
          <div className="pt-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>{GENERATION_STEPS[currentStepIndex]}</span>
              </span>
              <span className="font-bold text-amber-500">{progressPercent}%</span>
            </div>

            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 7 AI Agents Grid */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 text-center">
            Les 7 Experts IA du Comité START60
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {INCUBATOR_AGENTS.map((agent, index) => {
              const isActive = index === activeAgentIndex;
              const isPast = index < activeAgentIndex;

              return (
                <div
                  key={agent.id}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md scale-[1.02]'
                      : isPast
                      ? 'border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-lg">{agent.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate">
                        {agent.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {agent.role}
                      </div>
                    </div>
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : isActive ? (
                      <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin shrink-0" />
                    ) : null}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 italic line-clamp-2 leading-relaxed">
                    "{agent.quote}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature highlight */}
        <div className="mt-6 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Moteur exclusif : Analyseur d'opportunités Coupe du Monde 2030 (Maroc-Espagne-Portugal)</span>
          </div>
          <span className="font-mono text-amber-500 font-medium">Actif</span>
        </div>
      </div>
    </div>
  );
};
