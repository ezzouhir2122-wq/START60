import React from 'react';
import { Sun, Moon, Sparkles, RefreshCw, FileText, History } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNewIdea: () => void;
  onOpenExport?: () => void;
  onOpenHistory?: () => void;
  historyCount?: number;
  hasActiveProject: boolean;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onNewIdea,
  onOpenExport,
  onOpenHistory,
  historyCount = 0,
  hasActiveProject,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors duration-200 border-slate-200/80 bg-white/90 dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={onNewIdea}
          className="flex items-center gap-2.5 text-left text-slate-900 dark:text-white hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            60
          </div>
          <div>
            <div className="text-base font-bold tracking-tight flex items-center gap-1.5">
              <span>START60</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-600 dark:text-amber-400">
                Venture Builder
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              From Idea To Startup In 60 Minutes
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        {hasActiveProject ? (
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button
              onClick={() => onSelectTab('score')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap ${
                activeTab === 'score' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              1. Business Score
            </button>
            <button
              onClick={() => onSelectTab('canvas')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap ${
                activeTab === 'canvas' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              2. Model Canvas
            </button>
            <button
              onClick={() => onSelectTab('market')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap ${
                activeTab === 'market' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              3. Marché & Finance
            </button>
            <button
              onClick={() => onSelectTab('mvp')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap ${
                activeTab === 'mvp' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              4. MVP 7-Jours
            </button>
            <button
              onClick={() => onSelectTab('worldcup')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap flex items-center gap-1 ${
                activeTab === 'worldcup' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              <span>5. Coupe du Monde 2030</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
                KEY
              </span>
            </button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span>Incubateur Numérique Propulsé par 7 Agents IA</span>
            <span aria-hidden="true">·</span>
            <span>Accélération 60 Minutes</span>
            <span aria-hidden="true">·</span>
            <span>Focus Coupe du Monde 2030</span>
          </div>
        )}

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              title="Historique des dossiers sauvegardés"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Historique</span>
              {historyCount > 0 && (
                <span className="ml-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  {historyCount}
                </span>
              )}
            </button>
          )}

          {hasActiveProject && onOpenExport && (
            <button
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              title="Exporter le dossier complet"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dossier Pitch</span>
            </button>
          )}

          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            aria-label="Basculer thème"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <button
            onClick={onNewIdea}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-950 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>Nouvelle Idée</span>
          </button>
        </div>
      </div>
    </header>
  );
};
