import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Flame, Globe2, Layers, Cpu } from 'lucide-react';

interface IdeaInputSectionProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const PRESET_IDEAS = [
  {
    title: 'Marketplace Artisans Marocains (Exemple du Brief)',
    badge: 'Artisanat & Export',
    prompt:
      'Je souhaite créer une marketplace pour aider les artisans marocains à vendre leurs produits à l’international avec certification d’authenticité et logistique intégrée.',
  },
  {
    title: 'Mobilité & Navettes Coupe du Monde 2030',
    badge: 'Mondial 2030',
    prompt:
      'Plateforme unifiée de réservation de navettes privées et TGV inter-villes pour les supporters de la Coupe du Monde 2030 avec conciergerie IA multilingue.',
  },
  {
    title: 'SaaS B2B RSE & Bilan Carbone Automatisé',
    badge: 'GreenTech',
    prompt:
      'SaaS B2B pour PME marocaines et européennes calculant automatiquement l’empreinte carbone à partir des factures comptables et générant les rapports d’audit RSE.',
  },
  {
    title: 'Micro-Learning IA Darija / Français / Anglais',
    badge: 'EdTech & Tourisme',
    prompt:
      'Application mobile de micro-formation IA vocale en 5 min par jour pour former le personnel de l’hôtellerie et de la restauration aux langues pour 2030.',
  },
];

export const IdeaInputSection: React.FC<IdeaInputSectionProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState(
    'Je souhaite créer une marketplace pour aider les artisans marocains à vendre leurs produits à l’international.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  return (
    <div className="relative py-10 md:py-16">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Editorial Hero Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold tracking-wide">
            <Cpu className="w-3.5 h-3.5" />
            <span>Incubateur Numérique Nouvelle Génération</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
            Transformez votre simple idée en{' '}
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent">
              startup prête à lancer
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Notre slogan : <strong className="text-slate-900 dark:text-slate-200">"From Idea To Startup In 60 Minutes"</strong>.
            Fini les semaines perdues entre ChatGPT, Canva, Notion et Excel. Obtenez instantanément vos 10 modules validés par notre comité IA.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6 transition-all duration-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="idea-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Décrivez votre idée en langage naturel :
              </label>
              <textarea
                id="idea-input"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Exemple : Je souhaite créer une marketplace pour aider les artisans marocains à vendre leurs produits à l'international..."
                className="w-full p-4 rounded-xl text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm leading-relaxed resize-none transition-all"
                disabled={isLoading}
              />
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 px-1">
                <span>Plus vous donnez de contexte (cible, pays, problème), plus le scoring est précis.</span>
                <span className="font-mono">{prompt.length} car.</span>
              </div>
            </div>

            {/* Launch button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Génération des 10 modules + Diagnostic Coupe du Monde 2030 inclus</span>
              </div>

              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-600 hover:to-rose-600 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>Lancer l'Incubateur START60</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick Presets */}
        <div className="mt-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Idées prêtes à tester en 1 clic :</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESET_IDEAS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(item.prompt)}
                className="p-3 text-left rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-amber-400 dark:hover:border-amber-500/50 transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.prompt}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Team & Features Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono">7 Experts IA</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">YC Founder, VC, Tech Lead...</div>
          </div>
          <div className="space-y-1">
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono">10 Modules</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Score, Canvas, MVP 7j, Landing...</div>
          </div>
          <div className="space-y-1">
            <div className="text-base font-bold text-slate-900 dark:text-white font-mono">7 Jours Chrono</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Spécification MVP prête à coder</div>
          </div>
          <div className="space-y-1">
            <div className="text-base font-bold text-amber-500 font-mono">Mondial 2030</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Analyse d'impact exclusive</div>
          </div>
        </div>
      </div>
    </div>
  );
};
