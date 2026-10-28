/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VentureProject } from './types/venture';
import { generateVenture, generateContextualVenture } from './services/ventureGenerator';
import { Header } from './components/Header';
import { IdeaInputSection } from './components/IdeaInputSection';
import { IncubatorLoading } from './components/IncubatorLoading';
import { VentureDashboard } from './components/VentureDashboard';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('start60-theme');
    if (saved) return saved === 'dark';
    return true; // Default dark high-end mode
  });

  const [currentProject, setCurrentProject] = useState<VentureProject | null>(() => {
    // Initialize immediately with the brief's primary case study
    return generateContextualVenture(
      'Je souhaite créer une marketplace pour aider les artisans marocains à vendre leurs produits à l’international.'
    );
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingPrompt, setLoadingPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('start60-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('start60-theme', 'light');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setLoadingPrompt(prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const project = await generateVenture(prompt);
      setCurrentProject(project);
      setActiveTab('all');
    } catch (err) {
      console.error('Error generating venture:', err);
      const fallbackProject = generateContextualVenture(prompt);
      setCurrentProject(fallbackProject);
      setActiveTab('all');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewIdea = () => {
    setCurrentProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Bar Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onNewIdea={handleNewIdea}
        onOpenExport={currentProject ? () => setIsExportOpen(true) : undefined}
        hasActiveProject={Boolean(currentProject)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content */}
      <main className="flex-1">
        {isLoading ? (
          <IncubatorLoading prompt={loadingPrompt} />
        ) : currentProject ? (
          <VentureDashboard
            project={currentProject}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onNewIdea={handleNewIdea}
            onOpenExport={() => setIsExportOpen(true)}
          />
        ) : (
          <IdeaInputSection onGenerate={handleGenerate} isLoading={isLoading} />
        )}
      </main>

      {/* Export Modal */}
      {isExportOpen && currentProject && (
        <ExportModal project={currentProject} onClose={() => setIsExportOpen(false)} />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-500 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-slate-200">START60</span>
            <span aria-hidden="true">·</span>
            <span>AI Venture Builder</span>
            <span aria-hidden="true">·</span>
            <span className="italic">"From Idea To Startup In 60 Minutes"</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Propulsé par le Comité des 7 Experts IA</span>
            <span aria-hidden="true">·</span>
            <span>Prêt pour le Mondial 2030</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
