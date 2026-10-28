export type DecisionStatus = 'GO' | 'PIVOT' | 'NO GO';

export interface BusinessScoreData {
  overallScore: number;
  decision: DecisionStatus;
  decisionReason: string;
  marketPotential: number; // 0-100
  revenuePotential: number; // 0-100
  executionDifficulty: number; // 0-100
  competitionLevel: number; // 0-100
  aiOpportunityScore: number; // 0-100
  verdictSummary: string;
}

export interface BusinessModelCanvasData {
  valueProposition: string[];
  customerSegments: string[];
  revenueStreams: string[];
  costStructure: string[];
  acquisitionChannels: string[];
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  customerRelationships: string[];
}

export interface CompetitorItem {
  name: string;
  type: 'Direct' | 'Indirect';
  strengths: string;
  weaknesses: string;
  marketShareEstimate: string;
}

export interface MarketAnalysisData {
  tam: string;
  sam: string;
  som: string;
  tamValue: number; // For visualization
  samValue: number;
  somValue: number;
  marketGrowthRate: string;
  directCompetitors: CompetitorItem[];
  indirectCompetitors: CompetitorItem[];
  opportunities: string[];
  threats: string[];
  whySucceed: string; // "Pourquoi cette startup a une chance de réussir"
}

export interface FinancialEstimationData {
  currency: string;
  starterBudget: number;
  monthlyExpenses: number;
  recommendedPrice: string;
  unitPrice: number;
  customersNeeded: number;
  breakEvenMonth: number;
  projectedRevenue: {
    month1: number;
    month3: number;
    month6: number;
    month12: number;
    month24: number;
    month36: number;
  };
  monthlyBurnBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface MvpFeature {
  title: string;
  description: string;
  priority: 'Must-Have P0' | 'Ignorer V1';
  targetDay?: string;
  reasonIfIgnored?: string;
}

export interface MvpBuilderData {
  tagline: string;
  estimatedDays: number;
  estimatedCost: string;
  mustHaveFeatures: MvpFeature[];
  featuresToIgnore: MvpFeature[];
  recommendedTechStack: {
    frontend: string;
    backend: string;
    database: string;
    ai: string;
    payment: string;
    hosting: string;
  };
  launchChecklist: string[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
}

export interface BrandGeneratorData {
  startupName: string;
  alternativeNames: string[];
  slogan: string;
  brandStory: string;
  coreValues: string[];
  palette: ColorSwatch[];
  graphicStyle: {
    primaryFont: string;
    visualMood: string;
    toneOfVoice: string;
  };
  brandArchetype: string;
}

export interface WebsiteGeneratorData {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  features: {
    title: string;
    description: string;
    iconName: string;
  }[];
  callToAction: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  footer: {
    tagline: string;
    links: string[];
    copyright: string;
  };
}

export interface MarketingPlanData {
  minimumBudget: string;
  organicStrategy: string[];
  socialMediaStrategy: {
    platform: string;
    focus: string;
    frequency: string;
    growthTactic: string;
  }[];
  acquisitionChannels: string[];
  advertisingCampaigns: {
    platform: string;
    recommendedSpend: string;
    hookAngle: string;
    targetAudience: string;
  }[];
}

export interface RoadmapMonth {
  month: number;
  title: string;
  theme: string;
  kpis: string[];
  actions: { id: string; label: string; done: boolean }[];
}

export interface RoadmapData {
  month1: RoadmapMonth;
  month2: RoadmapMonth;
  month3: RoadmapMonth;
}

export type WorldCupSector =
  | 'Tourisme'
  | 'Transport'
  | 'Hébergement'
  | 'Restauration'
  | 'Digitalisation'
  | 'Logistique'
  | 'Artisanat'
  | 'Services';

export interface WorldCupSectorImpact {
  sector: WorldCupSector;
  score: number; // 0-100
  relevance: 'Très Forte' | 'Forte' | 'Moyenne' | 'Spécifique';
  opportunity: string;
  actionableTactic: string;
}

export interface WorldCupOpportunityData {
  worldCupScore: number; // 0-100
  headlineAssessment: string;
  sectorImpacts: WorldCupSectorImpact[];
  strategicAdvantages: string[];
  immediateStepsFor2030: string[];
}

export interface VentureProject {
  id: string;
  createdAt: string;
  ideaPrompt: string;
  businessScore: BusinessScoreData;
  businessModel: BusinessModelCanvasData;
  marketAnalysis: MarketAnalysisData;
  financialEstimation: FinancialEstimationData;
  mvpBuilder: MvpBuilderData;
  brandGenerator: BrandGeneratorData;
  websiteGenerator: WebsiteGeneratorData;
  marketingPlan: MarketingPlanData;
  roadmap: RoadmapData;
  worldCupAnalysis: WorldCupOpportunityData;
}

export interface IncubatorAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  status: 'pending' | 'analyzing' | 'completed';
}
