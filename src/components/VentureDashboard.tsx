import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { VentureProject } from '../types/venture';
import { BusinessScoreModule } from './modules/BusinessScoreModule';
import { BusinessModelModule } from './modules/BusinessModelModule';
import { MarketAnalysisModule } from './modules/MarketAnalysisModule';
import { FinancialModule } from './modules/FinancialModule';
import { MvpModule } from './modules/MvpModule';
import { BrandModule } from './modules/BrandModule';
import { WebsiteModule } from './modules/WebsiteModule';
import { MarketingModule } from './modules/MarketingModule';
import { RoadmapModule } from './modules/RoadmapModule';
import { WorldCupModule } from './modules/WorldCupModule';
import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  RotateCcw,
  Sparkles,
  Share2,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface VentureDashboardProps {
  project: VentureProject;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onNewIdea: () => void;
  onOpenExport: () => void;
}

const TABS = [
  { id: 'all', label: 'Vue d’Ensemble (10 Modules)' },
  { id: 'score', label: '1. Business Score' },
  { id: 'canvas', label: '2. Business Model' },
  { id: 'market', label: '3. Analyse Marché' },
  { id: 'finance', label: '4. Finances & ROI' },
  { id: 'mvp', label: '5. MVP 7-Jours' },
  { id: 'brand', label: '6. Branding & Nom' },
  { id: 'website', label: '7. Site Web Généré' },
  { id: 'marketing', label: '8. Plan Marketing' },
  { id: 'roadmap', label: '9. Roadmap 90j' },
  { id: 'worldcup', label: '10. Coupe du Monde 2030', isKey: true },
];

export const VentureDashboard: React.FC<VentureDashboardProps> = ({
  project,
  activeTab,
  onSelectTab,
  onNewIdea,
  onOpenExport,
}) => {
  // Fire confetti once if decision is GO
  useEffect(() => {
    if (project.businessScore.decision === 'GO') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
        });
      } catch {
        // Safe confetti fallback
      }
    }
  }, [project.id]);

  const getDecisionBadge = () => {
    switch (project.businessScore.decision) {
      case 'GO':
        return {
          dot: '🟢',
          text: 'GO · Validé pour Lancement',
          color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
        };
      case 'PIVOT':
        return {
          dot: '🟠',
          text: 'PIVOT · Ajustement Recommandé',
          color: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
        };
      case 'NO GO':
        return {
          dot: '🔴',
          text: 'NO GO · Risque Critique',
          color: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
        };
    }
  };

  const decisionBadge = getDecisionBadge();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Executive Sub-Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${decisionBadge.color}`}
            >
              <span>{decisionBadge.dot}</span>
              <span>{decisionBadge.text}</span>
            </span>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Créé le {project.createdAt}
            </span>

            <span className="text-xs text-slate-400">·</span>

            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Score Mondial 2030 : {project.worldCupAnalysis.worldCupScore}/100</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span>{project.brandGenerator.startupName}</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-amber-500">
              ({project.businessScore.overallScore}/100)
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            "{project.brandGenerator.slogan}"
          </p>

          <p className="text-xs text-slate-500 line-clamp-1">
            <strong>Idée d'origine : </strong>"{project.ideaPrompt}"
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={onOpenExport}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-amber-500" />
            <span>Dossier Pitch VC</span>
          </button>

          <button
            onClick={onNewIdea}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tester Autre Idée</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation Strip */}
      <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max pb-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {tab.isKey && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isActive ? 'bg-black text-white' : 'bg-amber-500/20 text-amber-500'
                    }`}
                  >
                    Exclusif
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content Area */}
      <div className="space-y-12">
        {/* If 'all' is selected, render all 10 modules sequentially with divider lines */}
        {(activeTab === 'all' || activeTab === 'score') && (
          <section id="module-score">
            <BusinessScoreModule scoreData={project.businessScore} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'canvas') && (
          <section id="module-canvas">
            <BusinessModelModule canvas={project.businessModel} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'market') && (
          <section id="module-market">
            <MarketAnalysisModule market={project.marketAnalysis} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'finance') && (
          <section id="module-finance">
            <FinancialModule finance={project.financialEstimation} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'mvp') && (
          <section id="module-mvp">
            <MvpModule mvp={project.mvpBuilder} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'brand') && (
          <section id="module-brand">
            <BrandModule brand={project.brandGenerator} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'website') && (
          <section id="module-website">
            <WebsiteModule website={project.websiteGenerator} brand={project.brandGenerator} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'marketing') && (
          <section id="module-marketing">
            <MarketingModule marketing={project.marketingPlan} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'roadmap') && (
          <section id="module-roadmap">
            <RoadmapModule roadmap={project.roadmap} />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'worldcup') && (
          <section id="module-worldcup">
            <WorldCupModule worldCup={project.worldCupAnalysis} />
          </section>
        )}
      </div>
    </div>
  );
};
