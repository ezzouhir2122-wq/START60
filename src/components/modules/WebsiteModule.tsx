import React, { useState } from 'react';
import { WebsiteGeneratorData, BrandGeneratorData } from '../../types/venture';
import { Layout, Code2, Eye, Copy, Check, ChevronDown, ChevronUp, Zap, Globe, ShieldCheck, Trophy, Sparkles, Send } from 'lucide-react';

interface WebsiteModuleProps {
  website: WebsiteGeneratorData;
  brand: BrandGeneratorData;
}

export const WebsiteModule: React.FC<WebsiteModuleProps> = ({ website, brand }) => {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [demoEmail, setDemoEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState(false);

  const rawCodeSnippet = `<!-- Landing Page prête pour ${brand.startupName} -->
<section class="py-20 px-6 text-center bg-slate-950 text-white">
  <div class="max-w-4xl mx-auto space-y-6">
    <span class="px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
      ${website.hero.badge}
    </span>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight">
      ${website.hero.headline}
    </h1>
    <p class="text-lg text-slate-300 max-w-2xl mx-auto">
      ${website.hero.subheadline}
    </p>
    <div class="flex flex-wrap justify-center gap-4 pt-4">
      <button class="px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors">
        ${website.hero.primaryCta}
      </button>
      <button class="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">
        ${website.hero.secondaryCta}
      </button>
    </div>
  </div>
</section>

<!-- Features Grid -->
<section class="py-16 px-6 bg-slate-900 text-white">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
${website.features
  .map(
    (f) => `    <div class="p-6 rounded-2xl bg-slate-800 border border-slate-700">
      <h3 class="text-lg font-bold mb-2">${f.title}</h3>
      <p class="text-sm text-slate-400">${f.description}</p>
    </div>`
  )
  .join('\n')}
  </div>
</section>

<!-- Call to Action -->
<section class="py-20 px-6 text-center bg-gradient-to-r from-amber-500 to-rose-600 text-white">
  <h2 class="text-3xl font-extrabold">${website.callToAction.title}</h2>
  <p class="mt-2 text-slate-100">${website.callToAction.subtitle}</p>
  <button class="mt-6 px-8 py-3.5 bg-black text-white font-bold rounded-xl hover:bg-slate-900 transition-colors">
    ${website.callToAction.buttonText}
  </button>
</section>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(rawCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      default:
        return <Trophy className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>7. Générateur de Site Web & Landing Page</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Génération complète de la structure Hero, Features, CTA, FAQ et Footer prête à convertir vos premiers prospects.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'preview'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Aperçu en Direct</span>
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'code'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Source Prêt</span>
            </button>
          </div>

          {viewMode === 'code' && (
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-sm transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier le Code'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'code' ? (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl overflow-hidden font-mono text-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
            <span>landing-page.html (HTML + Tailwind CSS)</span>
            <span className="text-[10px]">Prêt à coller dans n'importe quel éditeur</span>
          </div>
          <pre className="text-slate-300 overflow-x-auto p-2 leading-relaxed">
            <code>{rawCodeSnippet}</code>
          </pre>
        </div>
      ) : (
        /* Live Rendered Landing Page Preview inside a polished mockup frame */
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-950 text-slate-100">
          {/* Mock Browser Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-slate-400 truncate">
                https://{brand.startupName.toLowerCase().replace(/\s+/g, '')}.com
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">● LIVE PREVIEW</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {/* 1. Hero Section */}
            <div className="relative py-16 px-6 text-center space-y-5 bg-gradient-to-b from-slate-900/50 to-slate-950">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{website.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
                {website.hero.headline}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {website.hero.subheadline}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => alert(`Bienvenue sur ${brand.startupName} ! Lancement de l'inscription pilote.`)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs hover:from-amber-600 hover:to-rose-600 transition-all shadow-lg"
                >
                  {website.hero.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => alert('Démonstration produit en cours de chargement...')}
                  className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
                >
                  {website.hero.secondaryCta}
                </button>
              </div>
            </div>

            {/* 2. Features Grid */}
            <div className="py-14 px-6 bg-slate-900/40">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <div className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1">
                    Fonctionnalités Piliers
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Tout ce dont vous avez besoin pour réussir
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {website.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                        {getFeatureIcon(feat.iconName)}
                      </div>
                      <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Call To Action Banner */}
            <div className="py-14 px-6 bg-gradient-to-r from-amber-500 via-rose-600 to-indigo-600 text-white text-center">
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black">{website.callToAction.title}</h2>
                <p className="text-xs sm:text-sm text-slate-100">{website.callToAction.subtitle}</p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="Votre adresse email professionnelle"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-xs focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    onClick={() => {
                      if (demoEmail) setSubmittedEmail(true);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-black hover:bg-slate-900 text-white font-bold text-xs shrink-0 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{website.callToAction.buttonText}</span>
                  </button>
                </div>
                {submittedEmail && (
                  <p className="text-xs font-semibold text-emerald-300">
                    ✓ Merci ! Votre invitation VIP a bien été envoyée.
                  </p>
                )}
              </div>
            </div>

            {/* 4. Interactive FAQ Section */}
            <div className="py-14 px-6 bg-slate-950">
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="text-center mb-6">
                  <div className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1">
                    Questions Fréquentes
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Réponses claires à vos interrogations
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {website.faq.map((item, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between text-xs font-semibold text-white hover:text-amber-400 transition-colors"
                        >
                          <span>{item.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-2.5">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 5. Footer */}
            <div className="py-8 px-6 bg-slate-950 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>{website.footer.copyright}</div>
              <div className="flex flex-wrap gap-4 text-slate-400">
                {website.footer.links.map((link, idx) => (
                  <span key={idx} className="hover:text-white cursor-pointer transition-colors">
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
