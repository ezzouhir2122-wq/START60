import { VentureProject, DecisionStatus } from '../types/venture';

export const INCUBATOR_AGENTS = [
  {
    id: 'vc_analyst',
    name: 'Sarah Chen',
    role: 'Venture Capital Analyst',
    avatar: '💼',
    quote: 'Évaluation des unit economics et de la scalabilité du modèle...',
  },
  {
    id: 'yc_founder',
    name: 'Karim Bennani',
    role: 'Startup Founder (YC W21)',
    avatar: '🚀',
    quote: 'Découpage du MVP en 7 jours chrono et identification des vanités à éliminer...',
  },
  {
    id: 'pm_lead',
    name: 'Marc Lefebvre',
    role: 'Senior Product Manager',
    avatar: '📐',
    quote: 'Structuration du Business Model Canvas et priorisation des features P0...',
  },
  {
    id: 'tech_arch',
    name: 'Leila Amrani',
    role: 'Software Architect & Full-Stack',
    avatar: '⚡',
    quote: 'Sélection de la stack la plus véloce : Vite, React, PostgreSQL et LLM endpoints...',
  },
  {
    id: 'brand_designer',
    name: 'Alexandre Roy',
    role: 'UX/UI Designer & Brand Lead',
    avatar: '🎨',
    quote: 'Conception de l’identité de marque, des palettes et de la landing page Stripe-grade...',
  },
  {
    id: 'financial_analyst',
    name: 'Nadia Tazi',
    role: 'Financial Consultant',
    avatar: '📊',
    quote: 'Modélisation du burn rate, du point mort et des projections de cash-flow sur 36 mois...',
  },
  {
    id: 'wc2030_expert',
    name: 'Youssef El Mansouri',
    role: 'World Cup 2030 Strategic Lead',
    avatar: '🏆',
    quote: 'Cartographie des flux de 5M+ supporters et opportunités sectorielles Maroc-Espagne-Portugal...',
  },
];

export async function generateVenture(prompt: string): Promise<VentureProject> {
  // Try server-side Gemini API first
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.project && data.project.businessScore) {
        return data.project;
      }
    }
  } catch {
    // Fall back to contextual engine smoothly
  }

  // Artificial slight delay for incubation feel if executed client side
  await new Promise((r) => setTimeout(r, 600));

  return generateContextualVenture(prompt);
}

export function generateContextualVenture(prompt: string): VentureProject {
  const cleanPrompt = prompt.trim();
  const lower = cleanPrompt.toLowerCase();

  const isArtisan = lower.includes('artisan') || lower.includes('maroc') || lower.includes('souk') || lower.includes('tapis') || lower.includes('poterie');
  const isTransport = lower.includes('transport') || lower.includes('navette') || lower.includes('logistique') || lower.includes('voyage') || lower.includes('mobility');
  const isWorldCup = lower.includes('2030') || lower.includes('coupe du monde') || lower.includes('world cup') || lower.includes('fifa') || lower.includes('foot');
  const isEdTech = lower.includes('educ') || lower.includes('learn') || lower.includes('formation') || lower.includes('etudiant') || lower.includes('ecole');
  const isFintech = lower.includes('pay') || lower.includes('finance') || lower.includes('banque') || lower.includes('crypto') || lower.includes('facture');

  let startupName = 'AtlasVenture';
  let altNames = ['Novaflow', 'VanguardIQ'];
  let slogan = 'L’accélération instantanée pour transformer une vision en réalité.';
  let currency = '€';
  let unitPrice = 79;
  let starterBudget = 12500;
  let monthlyExpenses = 2800;
  let customersNeeded = 42;
  let breakEvenMonth = 5;

  let marketScore = 86;
  let revenueScore = 84;
  let execDifficulty = 46;
  let compLevel = 62;
  let aiScore = 88;
  let wcScore = 82;

  let tam = '$8.4B Global Market';
  let sam = '$1.2B Reachable Segment';
  let som = '$45M Year 1-3 Focus';

  let mustHaves = [
    { title: 'Onboarding simplifié & vérification en 2 min', description: 'Formulaire sans friction avec validation automatique des données.', priority: 'Must-Have P0' as const, targetDay: 'Jour 1-2' },
    { title: 'Moteur central de mise en relation & catalogue instantané', description: 'Recherche vectorielle intelligente et filtres directs.', priority: 'Must-Have P0' as const, targetDay: 'Jour 3-4' },
    { title: 'Passerelle de paiement sécurisée Stripe / Checkout 1-clic', description: 'Gestion des devises et facturation automatisée.', priority: 'Must-Have P0' as const, targetDay: 'Jour 5' },
    { title: 'Dashboard administrateur & suivi des transactions', description: 'Métriques clés et gestion des litiges en temps réel.', priority: 'Must-Have P0' as const, targetDay: 'Jour 6-7' },
  ];

  let toIgnore = [
    { title: 'Application mobile native iOS/Android', description: 'Remplacée par une Progressive Web App responsive et ultra-rapide.', priority: 'Ignorer V1' as const, reasonIfIgnored: 'Économise 3 mois de review stores et 20k€ de dev.' },
    { title: 'Système complexe de fidélité et gamification', description: 'Points, badges et classements utilisateurs.', priority: 'Ignorer V1' as const, reasonIfIgnored: 'Aucune utilité avant d’avoir validé la rétention organique initiale.' },
    { title: 'Génération de visuels 3D/AR en direct', description: 'Visualisation augmentée des produits.', priority: 'Ignorer V1' as const, reasonIfIgnored: 'Trop lourd pour un MVP 7 jours; de superbes photos suffisent.' },
  ];

  let whySucceed = 'Une proposition de valeur ciblée sur un point de douleur aigu où les solutions historiques sont lentes, fragmentées et opaques.';

  if (isArtisan) {
    startupName = 'DarArtisan';
    altNames = ['SoukExport', 'AtlasCraft AI'];
    slogan = 'L’excellence de l’artisanat marocain expédiée dans le monde entier en un clic.';
    currency = '€';
    unitPrice = 120;
    starterBudget = 14000;
    monthlyExpenses = 3200;
    customersNeeded = 38;
    breakEvenMonth = 5;
    marketScore = 91;
    revenueScore = 88;
    execDifficulty = 42;
    compLevel = 58;
    aiScore = 92;
    wcScore = 96;
    tam = '$4.8B Marché Mondial du Fait-Main Artisanal';
    sam = '$680M Demande Européenne & Nord-Américaine pour l’artisanat marocain';
    som = '$24M Objectif 36 mois avec 1,500 maîtres artisans affiliés';
    whySucceed = 'L’élimination de 4 intermédiaires historiques grâce à un passeport numérique d’authenticité IA et un hub logistique mutualisé à Casablanca et Marrakech.';
    mustHaves = [
      { title: 'Générateur de fiches produits IA par photo (Darija/Français)', description: 'L’artisan photographie son tapis ou sa céramique; l’IA génère titre SEO, histoire poétique, dimensions et traduction anglaise.', priority: 'Must-Have P0', targetDay: 'Jour 1-2' },
      { title: 'Marketplace multilingue bilingue (EUR / USD) avec paiement Stripe & PayPal', description: 'Interface acheteur internationale avec calcul automatique des taxes douanières.', priority: 'Must-Have P0', targetDay: 'Jour 3-4' },
      { title: 'Intégration logistique DHL / Aramex avec étiquettes pré-imprimées', description: 'Pickup direct chez l’artisan ou point relais coopérative.', priority: 'Must-Have P0', targetDay: 'Jour 5' },
      { title: 'Certificat d’Authenticité numérique QR Code dans chaque colis', description: 'Vidéo de l’artisan au travail + traçabilité des matières nobles.', priority: 'Must-Have P0', targetDay: 'Jour 6-7' },
    ];
    toIgnore = [
      { title: 'Scan 3D volumétrique de chaque atelier', description: 'Trop chronophage pour les artisans ruraux.', priority: 'Ignorer V1', reasonIfIgnored: 'Des photos HD smartphone bien éclairées génèrent 95% du même taux de conversion.' },
      { title: 'Flotte logistique propriétaire de camions', description: 'Investissement capital trop lourd (CapEx).', priority: 'Ignorer V1', reasonIfIgnored: 'Utiliser les API des transporteurs existants (DHL, Chronopost) avec tarifs négociés.' },
      { title: 'Gestion physique d’entrepôts à l’étranger', description: 'Frais de stockage fixes trop risqués au démarrage.', priority: 'Ignorer V1', reasonIfIgnored: 'Dropshipping artisanal direct depuis les coopératives marocaines.' },
    ];
  } else if (isWorldCup || isTransport) {
    startupName = 'AtlasFanPass 2030';
    altNames = ['MundialMove', 'SaharaExpress AI'];
    slogan = 'La mobilité et l’hospitalité sans couture pour les supporters de la Coupe du Monde 2030.';
    unitPrice = 45;
    starterBudget = 18000;
    monthlyExpenses = 4100;
    customersNeeded = 95;
    breakEvenMonth = 4;
    marketScore = 95;
    revenueScore = 93;
    execDifficulty = 52;
    compLevel = 55;
    aiScore = 90;
    wcScore = 99;
    tam = '$12.5B Dépenses Touristiques & Mobilité Coupe du Monde 2030 (Maroc-Espagne-Portugal)';
    sam = '$1.8B Marché des solutions de réservation et navettes inter-villes Maroc';
    som = '$55M Part de marché visée sur les 6 villes hôtes marocaines (Casablanca, Rabat, Tanger, Marrakech, Agadir, Fès)';
    whySucceed = 'Solution unifiée multi-transports (TGV Al Boraq, navettes privées, VTC partenaires et hébergements vérifiés) avec guidage IA multilingue en temps réel lors des jours de match.';
  } else if (isFintech) {
    startupName = 'PayAtlas';
    altNames = ['MaghrebPay', 'OmniTransact'];
    slogan = 'L’infrastructure de paiement transfrontalier nouvelle génération pour l’Afrique du Nord.';
    unitPrice = 150;
    starterBudget = 25000;
    monthlyExpenses = 5500;
    customersNeeded = 40;
    breakEvenMonth = 6;
    marketScore = 89;
    revenueScore = 91;
    execDifficulty = 68;
    compLevel = 74;
    aiScore = 85;
    wcScore = 88;
    tam = '$28B Volume de flux transfrontaliers MENA-Europe';
    sam = '$3.4B Paiements marchands et remittances digitaux';
    som = '$80M Volume traité d’ici l’échéance 2030';
    whySucceed = 'Licence partenaire bancaire locale, intégration instantanée de CMI / Stripe et frais divisés par 3 sur les conversions de devises.';
  } else if (isEdTech) {
    startupName = 'TalentAcademy AI';
    altNames = ['SkillRise', 'LearnAtlas'];
    slogan = 'La formation accélérée aux métiers d’avenir propulsée par des tuteurs IA immersifs.';
    unitPrice = 39;
    starterBudget = 9000;
    monthlyExpenses = 2100;
    customersNeeded = 60;
    breakEvenMonth = 4;
    marketScore = 85;
    revenueScore = 82;
    execDifficulty = 38;
    compLevel = 65;
    aiScore = 94;
    wcScore = 75;
    tam = '$6.2B EdTech & Corporate Upskilling MENA & Francophonie';
    sam = '$750M Formation aux compétences tech & langues pour l’hospitalité 2030';
    som = '$18M Marché cible sur 3 ans';
    whySucceed = 'Parcours de micro-learning de 10 min/jour avec correction audio en direct en Darija, Français et Anglais pour rendre les équipes opérationnelles en 30 jours.';
  }

  // Calculate overall score
  const overallScore = Math.round(
    marketScore * 0.28 +
    revenueScore * 0.26 +
    (100 - execDifficulty) * 0.18 +
    (100 - compLevel) * 0.1 +
    aiScore * 0.18
  );

  let decision: DecisionStatus = 'GO';
  let decisionReason = 'Feu vert d’investissement : potentiel de marché massif, proposition de valeur tranchée et barrière à l’entrée technologique solide.';
  if (overallScore < 55) {
    decision = 'NO GO';
    decisionReason = 'Projet à haut risque : marché trop étroit ou barrières réglementaires et d’exécution trop coûteuses pour un retour rapide.';
  } else if (overallScore < 75) {
    decision = 'PIVOT';
    decisionReason = 'Potentiel prometteur mais nécessite un recentrage sur une niche plus précise avec un coût d’acquisition client inférieur.';
  }

  const project: VentureProject = {
    id: 'venture-' + Date.now(),
    createdAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    ideaPrompt: cleanPrompt,
    businessScore: {
      overallScore,
      decision,
      decisionReason,
      marketPotential: marketScore,
      revenuePotential: revenueScore,
      executionDifficulty: execDifficulty,
      competitionLevel: compLevel,
      aiOpportunityScore: aiScore,
      verdictSummary: `Score global de ${overallScore}/100 validé par le jury d'investisseurs. ${decisionReason}`,
    },
    businessModel: {
      valueProposition: [
        `Accès direct et simplifié pour résoudre le problème : "${cleanPrompt.slice(0, 90)}..."`,
        'Réduction de 80% du temps de traitement et des coûts d’intermédiaires',
        'Automatisation intelligente assistée par l’IA (traduction, tarification, mise en relation)',
        'Garantie de qualité, transparence totale des flux et conformité internationale',
      ],
      customerSegments: [
        'Utilisateurs primaires & clients finaux recherchant une expérience moderne et rapide',
        'Professionnels et partenaires locaux cherchant à numériser leur offre',
        'Diaspora et clientèle internationale à fort pouvoir d’achat',
        'Organisateurs et délégations préparant l’horizon 2030',
      ],
      revenueStreams: [
        `Commission sur chaque transaction (10% à 15% du panier)`,
        `Abonnement Pro / Premium (${unitPrice} ${currency}/mois) avec analytics avancés`,
        'Options de visibilité sponsorisée et packaging prioritaire',
        'Frais de services additionnels (assurances, logistique express)',
      ],
      costStructure: [
        'Hébergement Cloud & inférence API LLM (20%)',
        'Acquisition client & marketing digital (35%)',
        'Support opérationnel et logistique locale (25%)',
        'Frais bancaires et conformité juridique (10%)',
        'Marge brute cible : 65%',
      ],
      acquisitionChannels: [
        'Partenariats directs avec les coopératives et fédérations professionnelles',
        'Stratégie de contenu organique virale (vidéos coulisses "makers" TikTok / Reels)',
        'SEO Programmatique ciblant les requêtes à forte intention d’achat',
        'Programme d’affiliation et de parrainage ambassadeurs (10% de remise)',
      ],
      keyPartners: [
        'Opérateurs logistiques (DHL, Fedex, transporteurs nationaux)',
        'Institutions financières et passerelles de paiement (CMI, Stripe, Apple Pay)',
        'Offices de tourisme, fédérations et comités d’organisation 2030',
        'Influenceurs de niche et créateurs de contenu culture & tech',
      ],
      keyActivities: [
        'Développement continu de la plateforme et des algorithmes d’IA',
        'Onboarding et contrôle qualité rigoureux des prestataires',
        'Gestion des campagnes d’acquisition et du service client 7j/7',
        'Négociation des accords de distribution et transport',
      ],
      keyResources: [
        'Plateforme logicielle propriétaire et base de données vérifiée',
        'Réseau d’artisans et de prestataires sous contrat exclusif',
        'Marque de confiance et communauté engagée',
        'Équipe cœur : Produit, Tech, Growth et Opérations terrain',
      ],
      customerRelationships: [
        'Support omnicanal automatisé par IA avec escalade humaine',
        'Suivi de commande et de réservation en temps réel par WhatsApp',
        'Communauté d’entraide et de retour d’expérience',
        'Garantie satisfait ou remboursé',
      ],
    },
    marketAnalysis: {
      tam,
      sam,
      som,
      tamValue: 8400,
      samValue: 1200,
      somValue: 45,
      marketGrowthRate: '+18.4% annuel d’ici 2030',
      directCompetitors: [
        {
          name: isArtisan ? 'Etsy / Novica' : 'Plateformes Généralistes Existantes',
          type: 'Direct',
          strengths: 'Volume de trafic historique et notoriété mondiale établie.',
          weaknesses: 'Commissions exorbitantes, aucune vérification locale d’authenticité, logistique complexe pour les vendeurs non anglophones.',
          marketShareEstimate: '42%',
        },
        {
          name: isArtisan ? 'Boutiques locales physiques de souk' : 'Agences & prestataires traditionnels',
          type: 'Direct',
          strengths: 'Contact physique et relation directe avec le client.',
          weaknesses: 'Zéro présence en ligne, dépendance à la météo et aux flux touristiques saisonniers.',
          marketShareEstimate: '28%',
        },
      ],
      indirectCompetitors: [
        {
          name: 'Groupes WhatsApp / Instagram informels',
          type: 'Indirect',
          strengths: 'Zéro frais fixes, adoption naturelle sur mobile.',
          weaknesses: 'Aucune garantie de paiement, litiges fréquents, aucun suivi de livraison.',
          marketShareEstimate: '18%',
        },
        {
          name: 'Grandes surfaces et chaînes industrielles de répliques',
          type: 'Indirect',
          strengths: 'Prix bas et distribution de masse.',
          weaknesses: 'Perte totale d’âme, qualité médiocre, mauvaise conscience environnementale.',
          marketShareEstimate: '12%',
        },
      ],
      opportunities: [
        'Effet de levier exceptionnel de la Coupe du Monde 2030 (visibilité mondiale sur le Maroc)',
        'Engouement international massif pour les produits authentiques, éthiques et traçables',
        'Maturité des solutions de paiement et de micro-crédit mobile',
        'Capacité de l’IA à briser la barrière de la langue instantanément (Darija / Arabe / Français / Anglais)',
      ],
      threats: [
        'Volatilité potentielle des coûts de fret aérien international',
        'Risque de copies industrielles à bas coût venues d’Asie',
        'Délais administratifs d’exportation douanière si non automatisés dès le départ',
      ],
      whySucceed,
    },
    financialEstimation: {
      currency,
      starterBudget,
      monthlyExpenses,
      recommendedPrice: `${unitPrice} ${currency} / commande moyenne`,
      unitPrice,
      customersNeeded,
      breakEvenMonth,
      projectedRevenue: {
        month1: 1800,
        month3: 7400,
        month6: 19500,
        month12: 52000,
        month24: 165000,
        month36: 420000,
      },
      monthlyBurnBreakdown: [
        { category: 'Acquisition & Ads', amount: Math.round(monthlyExpenses * 0.38), percentage: 38 },
        { category: 'Opérations & Logistique', amount: Math.round(monthlyExpenses * 0.28), percentage: 28 },
        { category: 'Serveurs & Inférence IA', amount: Math.round(monthlyExpenses * 0.18), percentage: 18 },
        { category: 'Légal & Comptabilité', amount: Math.round(monthlyExpenses * 0.16), percentage: 16 },
      ],
    },
    mvpBuilder: {
      tagline: 'Le produit minimum viable prêt à valider les premiers euros de chiffre d’affaires en 7 jours chrono.',
      estimatedDays: 7,
      estimatedCost: `${Math.round(starterBudget * 0.3)} ${currency}`,
      mustHaveFeatures: mustHaves,
      featuresToIgnore: toIgnore,
      recommendedTechStack: {
        frontend: 'React 19 + TypeScript + Tailwind CSS (Vite)',
        backend: 'Node.js / Express ou Edge Functions',
        database: 'PostgreSQL (Supabase / Neon) + Redis Cache',
        ai: 'Gemini 2.5 Flash (vision multimodal + traduction)',
        payment: 'Stripe Connect + Passerelle CMI locale',
        hosting: 'Cloud Run / Vercel + Cloudflare CDN',
      },
      launchChecklist: [
        '10 premiers utilisateurs ou vendeurs onboardés manuellement par appel vidéo',
        'Landing page avec formulaire de paiement testé en conditions réelles',
        'Processus de livraison validé avec un premier colis envoyé avec succès',
        'Tracking analytics (PostHog / Google Analytics) configuré',
      ],
    },
    brandGenerator: {
      startupName,
      alternativeNames: altNames,
      slogan,
      brandStory: `Née de la conviction que la technologie doit révéler l’authenticité et catalyser le talent plutôt que de l’uniformiser, ${startupName} connecte instantanément l'offre à la demande mondiale avec l'élégance du design moderne et la puissance de l'IA.`,
      coreValues: [
        'Authenticité Radicale : Zéro intermédiaire inutile, valorisation directe des créateurs.',
        'Vélocité d’Exécution : Répondre aux besoins en quelques secondes au lieu de plusieurs semaines.',
        'Standard International : Design soigné, fiabilité digne des meilleures fintechs mondiales.',
        'Héritage & Futur : Célébrer les savoir-faire traditionnels tout en préparant 2030.',
      ],
      palette: [
        { name: 'Ocre Terracotta', hex: '#C25E3E', role: 'Couleur primaire - Chaleur & Authenticité' },
        { name: 'Bleu Majorelle', hex: '#1E40AF', role: 'Accent secondaire - Confiance & Modernité' },
        { name: 'Vert Palme Royale', hex: '#0F766E', role: 'Accent de succès - Prospérité & Sérénité' },
        { name: 'Noir Ébène', hex: '#0F172A', role: 'Fond sombre structurant - Élégance premium' },
        { name: 'Sable Chaud', hex: '#FAF5EF', role: 'Fond clair lumineux - Naturel & Organique' },
      ],
      graphicStyle: {
        primaryFont: 'Plus Jakarta Sans (Moderne, net, lisibilité parfaite)',
        visualMood: 'Inspiré de Stripe et Linear : fonds épurés, typographie contrastée, photographies lumineuses et micro-interactions fluides.',
        toneOfVoice: 'Chaleureux, déterminé, professionnel et résolument tourné vers le succès des utilisateurs.',
      },
      brandArchetype: 'Le Créateur & Le Catalyseur (The Creator & Ruler)',
    },
    websiteGenerator: {
      hero: {
        badge: '✨ Déjà plus de 250 membres pionniers inscrits',
        headline: `${startupName} : ${slogan}`,
        subheadline: `La solution tout-en-un qui accélère votre activité, automatise vos flux et vous connecte aux opportunités majeures de la Coupe du Monde 2030.`,
        primaryCta: 'Démarrer gratuitement en 2 min',
        secondaryCta: 'Voir la démonstration vidéo',
      },
      features: [
        {
          iconName: 'Zap',
          title: 'Déploiement Instantané',
          description: 'Votre espace opérationnel prêt à recevoir des commandes en moins de 10 minutes.',
        },
        {
          iconName: 'Globe',
          title: 'Rayonnement International',
          description: 'Paiements multidevises, douanes gérées et traductions automatiques par IA.',
        },
        {
          iconName: 'ShieldCheck',
          title: 'Sécurité & Traçabilité Garantie',
          description: 'Paiements bloqués sous séquestre jusqu’à la livraison certifiée.',
        },
        {
          iconName: 'Trophy',
          title: 'Accélérateur Coupe du Monde 2030',
          description: 'Intégration native des flux de visiteurs et supporters pour capter la demande 2030.',
        },
      ],
      callToAction: {
        title: 'Prêt à transformer cette idée en startup rentable ?',
        subtitle: 'Rejoignez la nouvelle génération d’entrepreneurs audacieux qui bâtissent l’avenir.',
        buttonText: 'Créer mon compte maintenant',
      },
      faq: [
        {
          question: 'Comment fonctionne la mise en place au démarrage ?',
          answer: 'Il suffit de créer votre profil, de synchroniser vos premières informations et notre IA se charge d’optimiser votre catalogue et vos tarifs.',
        },
        {
          question: 'Quels sont les frais appliqués sur les ventes ?',
          answer: 'Aucun frais fixe d’inscription. Nous prélevons une commission transparente uniquement sur les transactions validées.',
        },
        {
          question: 'Comment préparez-vous l’échéance de la Coupe du Monde 2030 ?',
          answer: 'Nous avons cartographié les corridors touristiques et logistiques clés pour vous positionner en tête de liste auprès des partenaires internationaux.',
        },
      ],
      footer: {
        tagline: `${startupName} — Conçu avec excellence pour les bâtisseurs de demain.`,
        links: ['Produit', 'Tarifs', 'Documentation', 'Sécurité', 'Mentions Légales', 'Contact'],
        copyright: `© 2026 ${startupName} Inc. Tous droits réservés.`,
      },
    },
    marketingPlan: {
      minimumBudget: `800 ${currency} à 1,500 ${currency} pour le premier mois`,
      organicStrategy: [
        'Vidéos courtes "Behind the scenes" (Secrets d’ateliers, histoires de fondateurs) sur Instagram Reels et TikTok (3 vidéos par semaine)',
        'SEO programmatique ciblant les requêtes de niche à forte intention d’achat (ex: "Acheter tapis Beni Ouarain certifié livraison Paris")',
        'Lancement officiel sur Product Hunt, Indie Hackers et communautés tech marocaines (Maroc Entrepreneurs, 1337, EHTP)',
      ],
      socialMediaStrategy: [
        {
          platform: 'Instagram & TikTok',
          focus: 'Storytelling visuel, esthétique des produits et authenticité humaine',
          frequency: '4 posts/semaine + stories quotidiennes',
          growthTactic: 'Collabs avec 10 micro-créateurs lifestyle (5k à 25k abonnés) avec envoi de produits contre vidéos unboxing sincères.',
        },
        {
          platform: 'LinkedIn',
          focus: 'Vision business, impact économique local, partenariats B2B et coulisses de l’aventure',
          frequency: '2 posts/semaine par le fondateur',
          growthTactic: 'Partage transparent des métriques "Build in Public" pour attirer investisseurs et talents.',
        },
      ],
      acquisitionChannels: [
        'Prospection ciblée B2B auprès des architectes d’intérieur, hôtels et agences réceptives',
        'Partenariats croisés avec des marques complémentaires éco-responsables',
        'Campagnes de parrainage avec bon d’achat de 15€ offert pour le parrain et le filleul',
      ],
      advertisingCampaigns: [
        {
          platform: 'Meta Ads (Instagram / Facebook)',
          recommendedSpend: `450 ${currency}/mois`,
          hookAngle: 'Arrêtez d’acheter des copies industrielles : offrez-vous une pièce unique façonnée à la main.',
          targetAudience: 'Femmes et hommes 28-55 ans, CSP+, centres d’intérêt Décoration d’intérieur, Design et Voyages.',
        },
        {
          platform: 'Google Search Ads',
          recommendedSpend: `350 ${currency}/mois`,
          hookAngle: 'Livraison express garantie & certificat d’authenticité sous 72h.',
          targetAudience: 'Mots-clés ultra-qualifiés avec intention d’achat immédiate.',
        },
      ],
    },
    roadmap: {
      month1: {
        month: 1,
        title: 'Validation & MVP 7-Jours',
        theme: 'De zéro au premier client payant',
        kpis: [
          'MVP opérationnel déployé en 7 jours',
          '10 premiers utilisateurs pilotes actifs',
          '3 premières transactions réelles validées',
        ],
        actions: [
          { id: 'm1-1', label: 'Déployer la landing page avec formulaire de pré-inscription Stripe', done: true },
          { id: 'm1-2', label: 'Sélectionner et onboarder les 5 premiers partenaires / vendeurs référents', done: true },
          { id: 'm1-3', label: 'Effectuer 15 entretiens utilisateurs qualitatifs approfondis', done: false },
          { id: 'm1-4', label: 'Générer les 500 premiers euros de volume d’affaires', done: false },
        ],
      },
      month2: {
        month: 2,
        title: 'Traction & Itération Produit',
        theme: 'Atteinte des 100 premiers clients & fluidification',
        kpis: [
          '100 clients payants cumulés',
          'NPS (Net Promoter Score) > 60',
          'Taux de conversion visiteur > 2.8%',
        ],
        actions: [
          { id: 'm2-1', label: 'Automatiser le flux logistique et les notifications WhatsApp', done: false },
          { id: 'm2-2', label: 'Lancer les campagnes Meta Ads ciblées avec 3 variations de visuels', done: false },
          { id: 'm2-3', label: 'Signer le premier partenariat stratégique B2B ou institutionnel', done: false },
          { id: 'm2-4', label: 'Recruter le premier stagiaire opérations / support client', done: false },
        ],
      },
      month3: {
        month: 3,
        title: 'Scale & Préparation Accélération',
        theme: 'Préparation du tour de financement & horizon 2030',
        kpis: [
          `MRR (Revenu Mensuel Récurrent) > 7,500 ${currency}`,
          'Taux de réachat à 60 jours > 22%',
          'Partenariat officiel Coupe du Monde 2030 initié',
        ],
        actions: [
          { id: 'm3-1', label: 'Présenter le dossier complet aux incubateurs (Plug & Play, 212Founders, Flat6Labs)', done: false },
          { id: 'm3-2', label: 'Ouvrir l’interface multilingue espagnole et anglaise complète', done: false },
          { id: 'm3-3', label: 'Lancer le programme d’affiliation pour 50 micro-influenceurs', done: false },
          { id: 'm3-4', label: 'Auditer l’infrastructure technique pour supporter des pics de 100k visiteurs', done: false },
        ],
      },
    },
    worldCupAnalysis: {
      worldCupScore: wcScore,
      headlineAssessment: `Opportunité historique : La Coupe du Monde 2030 (Maroc - Espagne - Portugal) représente un afflux de plus de 5,5 millions de visiteurs et 12 milliards d'euros d'impact économique. Cette startup est positionnée pour en capturer une part significative.`,
      sectorImpacts: [
        {
          sector: 'Tourisme',
          score: 96,
          relevance: 'Très Forte',
          opportunity: 'Demande exponentielle d’expériences immersives et d’achats souvenirs mémorables par les supporters.',
          actionableTactic: 'Créer des "Fan Gift Packs" officiels livrés directement dans les hôtels et fan zones des 6 villes hôtes.',
        },
        {
          sector: 'Transport',
          score: 88,
          relevance: 'Forte',
          opportunity: 'Navettes inter-villes, transferts aéroport-stade et liaisons rapides TGV Al Boraq saturées.',
          actionableTactic: 'Pré-réserver des créneaux de livraison et logistique hors des heures de match critiques.',
        },
        {
          sector: 'Hébergement',
          score: 92,
          relevance: 'Très Forte',
          opportunity: 'Les hôtels et Riads chercheront à offrir des cadeaux d’accueil exclusifs et des services digitalisés.',
          actionableTactic: 'Partenariat d’approvisionnement direct avec 100 Riads haut de gamme pour équiper les chambres.',
        },
        {
          sector: 'Restauration',
          score: 84,
          relevance: 'Forte',
          opportunity: 'Besoin de produits du terroir et vaisselle artisanale pour les espaces VIP et restaurants éphémères.',
          actionableTactic: 'Fourniture de vaisselle en poterie personnalisée "World Cup Edition" pour restaurants branchés.',
        },
        {
          sector: 'Digitalisation',
          score: 95,
          relevance: 'Très Forte',
          opportunity: 'Accélération massive des paiements sans contact, QR codes et applications bilingues pour les supporters.',
          actionableTactic: 'Intégration d’Apple Pay, Google Pay et passeports numériques scannables en 1 seconde.',
        },
        {
          sector: 'Logistique',
          score: 90,
          relevance: 'Très Forte',
          opportunity: 'Modernisation des corridors de fret maritime et aérien entre le Maroc, l’Espagne et le Portugal.',
          actionableTactic: 'Mutualisation des envois groupés vers Madrid, Lisbonne et Barcelone avec des tarifs dégressifs.',
        },
        {
          sector: 'Artisanat',
          score: 98,
          relevance: 'Très Forte',
          opportunity: 'L’artisanat marocain sera la vitrine culturelle star célébrée devant des milliards de téléspectateurs.',
          actionableTactic: 'Collection capsule officielle "Maroc 2030 Heritage" labellisée avec les coopératives royales.',
        },
        {
          sector: 'Services',
          score: 86,
          relevance: 'Forte',
          opportunity: 'Services de conciergerie, traduction instantanée et guides locaux certifiés.',
          actionableTactic: 'Service client WhatsApp trilingue disponible 24/7 avec IA entraînée sur les questions des supporters.',
        },
      ],
      strategicAdvantages: [
        'Premier entrant sur un corridor de demande tri-nationale (Maroc - Espagne - Portugal)',
        'Effet de fierté nationale et soutien actif des institutions publiques et régionales',
        'Opportunité d’acquérir des clients internationaux qui continueront à commander après leur retour chez eux',
      ],
      immediateStepsFor2030: [
        'Déposer les marques et domaines web associés à l’échéance 2030',
        'Contacter la commission d’organisation pour soumettre une candidature de partenaire accrédité',
        'Intégrer les devises Euro, Dirham et Dollar avec taux de change garanti',
      ],
    },
  };

  return project;
}
