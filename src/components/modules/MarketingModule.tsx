import React from 'react';
import { MarketingPlanData } from '../../types/venture';
import { Megaphone, DollarSign, Share2, Sparkles, Target, CheckCircle2, TrendingUp } from 'lucide-react';

interface MarketingModuleProps {
  marketing: MarketingPlanData;
}

export const MarketingModule: React.FC<MarketingModuleProps> = ({ marketing }) => {
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>8. Plan Marketing & Stratégie d'Acquisition Client</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Canaux d'acquisition organiques, stratégie social media, partenariats et campagnes publicitaires au budget optimisé.
        </p>
      </div>

      {/* Minimum Budget Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-indigo-500/10 rounded-2xl border border-emerald-500/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span>Budget Marketing Minimum Recommandé</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Investissement mensuel amorçage pour valider les 100 premiers clients payants.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 shadow-sm shrink-0">
          {marketing.minimumBudget}
        </div>
      </div>

      {/* Organic Strategy & Acquisition Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Organic Strategy */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>Stratégie Organique & Viralité Naturelle</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {marketing.organicStrategy.map((item, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-2.5 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Acquisition Channels */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <Target className="w-4 h-4 text-amber-500" />
            <span>Canaux d'Acquisition Directs & Partenariats</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {marketing.acquisitionChannels.map((item, idx) => (
              <li key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/80 flex items-start gap-2.5 leading-relaxed">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Media Strategy */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          <Share2 className="w-4 h-4 text-purple-500" />
          <span>Stratégie Réseaux Sociaux & Calendrier Éditorial</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketing.socialMediaStrategy.map((chan, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs space-y-2"
            >
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span className="text-sm">{chan.platform}</span>
                <span className="font-mono text-[10px] text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full">
                  {chan.frequency}
                </span>
              </div>
              <div>
                <strong className="text-slate-700 dark:text-slate-300">Format & Focus : </strong>
                <span className="text-slate-600 dark:text-slate-400">{chan.focus}</span>
              </div>
              <div className="pt-1 border-t border-slate-200/50 dark:border-slate-800/80 text-slate-600 dark:text-slate-400">
                <strong className="text-purple-600 dark:text-purple-400">Tactique Growth : </strong>
                <span>{chan.growthTactic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertising Campaigns (Hooks & Audiences) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          <Megaphone className="w-4 h-4 text-rose-500" />
          <span>Campagnes Publicitaires Recommandées (Angles & Dépenses)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketing.advertisingCampaigns.map((ad, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs space-y-2"
            >
              <div className="flex items-center justify-between font-bold">
                <span className="text-sm text-slate-900 dark:text-white">{ad.platform}</span>
                <span className="font-mono text-emerald-500 font-bold">{ad.recommendedSpend}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 italic text-slate-800 dark:text-slate-200">
                "{ad.hookAngle}"
              </div>
              <div>
                <strong className="text-slate-500 uppercase text-[10px] block">Ciblage Recommandé :</strong>
                <span className="text-slate-600 dark:text-slate-400">{ad.targetAudience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
