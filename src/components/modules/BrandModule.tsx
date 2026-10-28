import React, { useState } from 'react';
import { BrandGeneratorData } from '../../types/venture';
import { Sparkles, Copy, Check, Palette, Compass, Type, Flame } from 'lucide-react';

interface BrandModuleProps {
  brand: BrandGeneratorData;
}

export const BrandModule: React.FC<BrandModuleProps> = ({ brand }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>6. Générateur de Marque & Identité Visuelle</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Nom de marque mémorable, slogan percutant, valeurs fondatrices et palette chromatique inspirée du design contemporain.
        </p>
      </div>

      {/* Main Brand Hero Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 rounded-2xl border border-amber-500/30 p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Nom de Startup Retenu</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {brand.startupName}
          </h3>

          <p className="text-base sm:text-lg font-medium text-amber-700 dark:text-amber-400 italic">
            "{brand.slogan}"
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
            {brand.brandStory}
          </p>

          {/* Alternative names */}
          <div className="pt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Alternatives de nom :</span>
            {brand.alternativeNames.map((alt, idx) => (
              <span
                key={idx}
                className="font-mono px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
              >
                {alt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Color Palette (Recommandations avec swatch & copie) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <Palette className="w-4 h-4 text-amber-500" />
            <span>Palette de Couleurs Recommandée</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Cliquez sur un code HEX pour copier</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {brand.palette.map((color, idx) => (
            <div
              key={idx}
              onClick={() => handleCopy(color.hex)}
              className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer hover:border-amber-500/50 transition-all group space-y-2"
            >
              <div
                className="w-full h-16 rounded-lg shadow-inner flex items-end justify-end p-1.5 transition-transform group-hover:scale-[1.02]"
                style={{ backgroundColor: color.hex }}
              >
                <div className="bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedHex === color.hex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHex === color.hex ? 'Copié' : 'Copier'}</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{color.name}</div>
                <div className="font-mono text-xs text-slate-500 dark:text-slate-400">{color.hex}</div>
                <div className="text-[10px] text-slate-500 line-clamp-2 mt-1">{color.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values & Graphic Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Values */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4 text-indigo-500" />
            <span>Valeurs Piliers</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {brand.coreValues.map((val, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/80 leading-relaxed">
                <span className="font-semibold text-slate-900 dark:text-white">0{idx + 1}. </span>
                <span>{val}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Graphic Style & Personality */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <Type className="w-4 h-4 text-rose-500" />
            <span>Style Graphique & Archétype de Marque</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-semibold text-slate-400 uppercase text-[10px]">Typographie Principale</span>
              <p className="font-medium text-slate-900 dark:text-white">{brand.graphicStyle.primaryFont}</p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-semibold text-slate-400 uppercase text-[10px]">Ambiance Visuelle & Mood</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{brand.graphicStyle.visualMood}</p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
              <span className="font-semibold text-slate-400 uppercase text-[10px]">Archétype & Tonalité</span>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {brand.brandArchetype} · <span className="font-normal">{brand.graphicStyle.toneOfVoice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
