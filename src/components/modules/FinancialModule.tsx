import React, { useState } from 'react';
import { FinancialEstimationData } from '../../types/venture';
import { DollarSign, Flame, Target, TrendingUp, CalendarCheck, PieChart, ArrowUpRight } from 'lucide-react';

interface FinancialModuleProps {
  finance: FinancialEstimationData;
}

export const FinancialModule: React.FC<FinancialModuleProps> = ({ finance }) => {
  const [customPrice, setCustomPrice] = useState(finance.unitPrice);

  // Recalculate break-even customers
  const clientsNeededDynamic = Math.ceil(finance.monthlyExpenses / (customPrice * 0.7)); // assuming 70% contribution margin

  const revenuePoints = [
    { label: 'Mois 1', val: finance.projectedRevenue.month1 },
    { label: 'Mois 3', val: finance.projectedRevenue.month3 },
    { label: 'Mois 6', val: finance.projectedRevenue.month6 },
    { label: 'Mois 12', val: finance.projectedRevenue.month12 },
    { label: 'Mois 24', val: finance.projectedRevenue.month24 },
    { label: 'Mois 36', val: finance.projectedRevenue.month36 },
  ];

  const maxVal = Math.max(...revenuePoints.map((p) => p.val));

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>4. Estimations Financières & Dashboard de Rentabilité</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Modélisation du point mort (break-even), allocation du burn rate mensuel et trajectoire de cash-flow sur 36 mois.
        </p>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* 1. Starter Budget */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Budget Démarrage</span>
            <DollarSign className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {finance.starterBudget.toLocaleString()} {finance.currency}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">CapEx initial (dev, légal)</div>
        </div>

        {/* 2. Monthly Expenses */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Burn Rate Mensuel</span>
            <Flame className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {finance.monthlyExpenses.toLocaleString()} {finance.currency}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">Dépenses fixes & acquisition</div>
        </div>

        {/* 3. Recommended Price */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Prix Recommandé</span>
            <Target className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {customPrice} {finance.currency}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">Panier moyen unitaire</div>
        </div>

        {/* 4. Customers Needed */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Clients Point Mort</span>
            <Target className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            {clientsNeededDynamic} clients
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">Seuil mensuel d'équilibre</div>
        </div>

        {/* 5. Break-Even Month */}
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-emerald-500/10 via-white to-white dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-900 rounded-2xl border-2 border-emerald-500/40 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">Point Mort (Break-Even)</span>
            <CalendarCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            Mois {finance.breakEvenMonth}
          </div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">Rentabilité opérationnelle</div>
        </div>
      </div>

      {/* Visual Chart: Revenue Trajectory (36 Months) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Trajectoire du Chiffre d'Affaires Prévisionnel (Mois 1 à 36)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Montée en charge progressive avec accélération lors des phases d'expansion.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>M36 : {finance.projectedRevenue.month36.toLocaleString()} {finance.currency}/an</span>
          </div>
        </div>

        {/* Bar chart representation */}
        <div className="pt-6 pb-2 grid grid-cols-6 gap-2 sm:gap-4 items-end h-56 border-b border-slate-100 dark:border-slate-800">
          {revenuePoints.map((item, idx) => {
            const heightPercent = Math.max(12, Math.round((item.val / maxVal) * 100));
            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.val >= 1000 ? `${(item.val / 1000).toFixed(0)}k` : item.val} {finance.currency}
                </span>
                <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden flex items-end">
                  <div
                    className="w-full rounded-t-xl transition-all duration-500 bg-gradient-to-t from-amber-500 to-rose-500 group-hover:from-amber-400 group-hover:to-rose-400"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 mt-2">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Cost Breakdown Progress Bars */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span>Répartition du Burn Rate Mensuel ({finance.monthlyExpenses} {finance.currency})</span>
            <PieChart className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {finance.monthlyBurnBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.category}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {item.amount.toLocaleString()} {finance.currency} / mois
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Pricing Sensitivity */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50/40 dark:bg-amber-950/15 border border-amber-200/50 dark:border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-bold text-amber-800 dark:text-amber-400 block">
              Tester l'impact du prix de vente sur le seuil de rentabilité :
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Modifiez le tarif unitaire pour recalculer le nombre de clients mensuels requis.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={customPrice}
              onChange={(e) => setCustomPrice(parseInt(e.target.value))}
              className="accent-amber-500 cursor-pointer w-32"
            />
            <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0">
              {customPrice} {finance.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
