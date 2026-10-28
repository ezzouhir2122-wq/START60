import React, { useState } from 'react';
import { VentureProject } from '../types/venture';
import { X, Printer, Download, Copy, Check, FileText, CheckCircle2 } from 'lucide-react';

interface ExportModalProps {
  project: VentureProject;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ project, onClose }) => {
  const [copiedMd, setCopiedMd] = useState(false);

  const generateMarkdown = () => {
    return `# START60 VENTURE DOSSIER: ${project.brandGenerator.startupName.toUpperCase()}
> "${project.brandGenerator.slogan}"
Date: ${project.createdAt}
Décision Comité: ${project.businessScore.decision} (Score: ${project.businessScore.overallScore}/100)

---

## 1. BUSINESS SCORE & DIAGNOSTIC
- Score Global: ${project.businessScore.overallScore}/100
- Décision: ${project.businessScore.decision}
- Potentiel Marché: ${project.businessScore.marketPotential}/100
- Potentiel Revenus: ${project.businessScore.revenuePotential}/100
- Complexité Exécution: ${project.businessScore.executionDifficulty}/100
- Niveau Concurrence: ${project.businessScore.competitionLevel}/100
- Levier IA: ${project.businessScore.aiOpportunityScore}/100
- Motif: ${project.businessScore.decisionReason}

---

## 2. BUSINESS MODEL CANVAS
### Proposition de Valeur
${project.businessModel.valueProposition.map((v) => `- ${v}`).join('\n')}

### Segments Clients
${project.businessModel.customerSegments.map((v) => `- ${v}`).join('\n')}

### Flux de Revenus
${project.businessModel.revenueStreams.map((v) => `- ${v}`).join('\n')}

### Structure de Coûts
${project.businessModel.costStructure.map((v) => `- ${v}`).join('\n')}

---

## 3. ANALYSE DE MARCHÉ
- TAM: ${project.marketAnalysis.tam}
- SAM: ${project.marketAnalysis.sam}
- SOM: ${project.marketAnalysis.som}
- Croissance: ${project.marketAnalysis.marketGrowthRate}
- Pourquoi cette startup a une chance de réussir: "${project.marketAnalysis.whySucceed}"

---

## 4. ESTIMATIONS FINANCIÈRES
- Budget Démarrage: ${project.financialEstimation.starterBudget} ${project.financialEstimation.currency}
- Burn Rate Mensuel: ${project.financialEstimation.monthlyExpenses} ${project.financialEstimation.currency}
- Prix Recommandé: ${project.financialEstimation.recommendedPrice}
- Clients nécessaires pour break-even: ${project.financialEstimation.customersNeeded}
- Mois du Point Mort: Mois ${project.financialEstimation.breakEvenMonth}
- CA Prévisionnel M36: ${project.financialEstimation.projectedRevenue.month36} ${project.financialEstimation.currency}

---

## 5. MVP 7-JOURS (SPÉCIFICATIONS)
- Must-Have P0:
${project.mvpBuilder.mustHaveFeatures.map((f) => `- ${f.title} (${f.targetDay}): ${f.description}`).join('\n')}

- Fonctionnalités à Ignorer V1:
${project.mvpBuilder.featuresToIgnore.map((f) => `- ${f.title}: ${f.reasonIfIgnored}`).join('\n')}

- Stack: ${project.mvpBuilder.recommendedTechStack.frontend} + ${project.mvpBuilder.recommendedTechStack.backend} + ${project.mvpBuilder.recommendedTechStack.database}

---

## 6. WORLD CUP 2030 OPPORTUNITY ANALYZER
- Score Opportunité 2030: ${project.worldCupAnalysis.worldCupScore}/100
- Synthèse: ${project.worldCupAnalysis.headlineAssessment}
- 8 Secteurs:
${project.worldCupAnalysis.sectorImpacts.map((s) => `- ${s.sector} (${s.score}/100 - ${s.relevance}): ${s.opportunity}`).join('\n')}

---
Généré par START60 - AI Venture Builder. "From Idea To Startup In 60 Minutes".`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${project.brandGenerator.startupName.toLowerCase().replace(/\s+/g, '-')}-venture-dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              <span>Exportation du Dossier Complet d'Accélération</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Projet {project.brandGenerator.startupName} · Validé par le comité START60
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Fiche Synthèse Exécutive
              </span>
              <span className="font-mono text-xs font-bold text-amber-500">
                Score: {project.businessScore.overallScore}/100 ({project.businessScore.decision})
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Slogan : </strong>"{project.brandGenerator.slogan}"
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Avantage Injuste : </strong>"{project.marketAnalysis.whySucceed}"
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Impact Coupe du Monde 2030 : </strong>
              {project.worldCupAnalysis.worldCupScore}/100 ({project.worldCupAnalysis.headlineAssessment})
            </p>
          </div>

          <div className="font-mono text-xs bg-slate-950 text-slate-300 p-4 rounded-xl border border-slate-800 max-h-64 overflow-y-auto leading-relaxed">
            <pre className="whitespace-pre-wrap">{generateMarkdown()}</pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/40">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Prêt pour jury VC, incubateurs et partenaires institutionnels.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {copiedMd ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedMd ? 'Markdown Copié !' : 'Copier Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
