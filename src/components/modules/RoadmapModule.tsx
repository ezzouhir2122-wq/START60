import React, { useState } from 'react';
import { RoadmapData } from '../../types/venture';
import { Calendar, CheckSquare, Square, Target, Flag, TrendingUp, Sparkles } from 'lucide-react';

interface RoadmapModuleProps {
  roadmap: RoadmapData;
}

export const RoadmapModule: React.FC<RoadmapModuleProps> = ({ roadmap: initialRoadmap }) => {
  const [roadmap, setRoadmap] = useState(initialRoadmap);

  const toggleAction = (monthKey: 'month1' | 'month2' | 'month3', actionId: string) => {
    setRoadmap((prev) => {
      const monthObj = prev[monthKey];
      const updatedActions = monthObj.actions.map((act) =>
        act.id === actionId ? { ...act, done: !act.done } : act
      );
      return {
        ...prev,
        [monthKey]: {
          ...monthObj,
          actions: updatedActions,
        },
      };
    });
  };

  const calculateMonthProgress = (monthKey: 'month1' | 'month2' | 'month3') => {
    const actions = roadmap[monthKey].actions;
    const completed = actions.filter((a) => a.done).length;
    return Math.round((completed / actions.length) * 100);
  };

  const months: Array<{ key: 'month1' | 'month2' | 'month3'; color: string; badge: string }> = [
    { key: 'month1', color: 'border-blue-500/40 text-blue-500', badge: 'Mois 1 · Décollage' },
    { key: 'month2', color: 'border-amber-500/40 text-amber-500', badge: 'Mois 2 · Traction' },
    { key: 'month3', color: 'border-emerald-500/40 text-emerald-500', badge: 'Mois 3 · Scale' },
  ];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>9. Feuille de Route 90 Jours (90-Day Execution Roadmap)</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Découpage mensuel structuré : Objectifs, KPIs mesurables et jalons interactifs cochables en temps réel.
        </p>
      </div>

      {/* 3-Month Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {months.map(({ key, color, badge }) => {
          const monthData = roadmap[key];
          const progress = calculateMonthProgress(key);

          return (
            <div
              key={key}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Header of Month */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className={`text-xs font-bold font-mono uppercase tracking-wider ${color}`}>
                    {badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500">
                    <span>{progress}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Month title & theme */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {monthData.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {monthData.theme}
                  </p>
                </div>

                {/* KPIs Target */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <Target className="w-3.5 h-3.5 text-amber-500" />
                    <span>KPIs Cibles du Mois</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {monthData.kpis.map((kpi, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 font-medium">
                        <span className="text-amber-500 font-bold">›</span>
                        <span>{kpi}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Checklist (Clickable) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <Flag className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Actions Concrètes (Cochez pour valider)</span>
                  </div>

                  <div className="space-y-2">
                    {monthData.actions.map((act) => (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => toggleAction(key, act.id)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                          act.done
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                            : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {act.done ? (
                          <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span className={`leading-relaxed ${act.done ? 'line-through opacity-80' : ''}`}>
                          {act.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Validation jalons</span>
                <span className="font-mono">{monthData.actions.filter((a) => a.done).length} / {monthData.actions.length} faits</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
