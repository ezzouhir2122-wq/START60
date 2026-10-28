/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';

/**
 * Schéma Zod de validation de la réponse IA (`/api/generate`).
 *
 * Il reflète les 10 modules de `VentureProject` tels que l'IA doit les
 * renvoyer. Les champs `id` / `createdAt` / `ideaPrompt` ne sont PAS inclus :
 * ils sont ajoutés côté serveur après validation (l'IA ne les génère pas).
 *
 * But : rejeter une réponse structurellement invalide (JSON parseable mais
 * incomplet) et basculer proprement sur le moteur contextuel, plutôt que de
 * laisser l'UI planter sur un champ manquant.
 */

const competitorSchema = z.object({
  name: z.string(),
  type: z.string(),
  strengths: z.string(),
  weaknesses: z.string(),
  marketShareEstimate: z.string(),
});

const mvpFeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  targetDay: z.string().optional(),
  reasonIfIgnored: z.string().optional(),
});

const roadmapMonthSchema = z.object({
  month: z.number(),
  title: z.string(),
  theme: z.string(),
  kpis: z.array(z.string()),
  actions: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      done: z.boolean(),
    }),
  ),
});

export const ventureProjectSchema = z
  .object({
    businessScore: z.object({
      overallScore: z.number(),
      decision: z.enum(['GO', 'PIVOT', 'NO GO']),
      decisionReason: z.string(),
      marketPotential: z.number(),
      revenuePotential: z.number(),
      executionDifficulty: z.number(),
      competitionLevel: z.number(),
      aiOpportunityScore: z.number(),
      verdictSummary: z.string(),
    }),
    businessModel: z.object({
      valueProposition: z.array(z.string()),
      customerSegments: z.array(z.string()),
      revenueStreams: z.array(z.string()),
      costStructure: z.array(z.string()),
      acquisitionChannels: z.array(z.string()),
      keyPartners: z.array(z.string()),
      keyActivities: z.array(z.string()),
      keyResources: z.array(z.string()),
      customerRelationships: z.array(z.string()),
    }),
    marketAnalysis: z.object({
      tam: z.string(),
      sam: z.string(),
      som: z.string(),
      tamValue: z.number(),
      samValue: z.number(),
      somValue: z.number(),
      marketGrowthRate: z.string(),
      directCompetitors: z.array(competitorSchema),
      indirectCompetitors: z.array(competitorSchema),
      opportunities: z.array(z.string()),
      threats: z.array(z.string()),
      whySucceed: z.string(),
    }),
    financialEstimation: z.object({
      currency: z.string(),
      starterBudget: z.number(),
      monthlyExpenses: z.number(),
      recommendedPrice: z.string(),
      unitPrice: z.number(),
      customersNeeded: z.number(),
      breakEvenMonth: z.number(),
      projectedRevenue: z.object({
        month1: z.number(),
        month3: z.number(),
        month6: z.number(),
        month12: z.number(),
        month24: z.number(),
        month36: z.number(),
      }),
      monthlyBurnBreakdown: z.array(
        z.object({
          category: z.string(),
          amount: z.number(),
          percentage: z.number(),
        }),
      ),
    }),
    mvpBuilder: z.object({
      tagline: z.string(),
      estimatedDays: z.number(),
      estimatedCost: z.string(),
      mustHaveFeatures: z.array(mvpFeatureSchema),
      featuresToIgnore: z.array(mvpFeatureSchema),
      recommendedTechStack: z.object({
        frontend: z.string(),
        backend: z.string(),
        database: z.string(),
        ai: z.string(),
        payment: z.string(),
        hosting: z.string(),
      }),
      launchChecklist: z.array(z.string()),
    }),
    brandGenerator: z.object({
      startupName: z.string(),
      alternativeNames: z.array(z.string()),
      slogan: z.string(),
      brandStory: z.string(),
      coreValues: z.array(z.string()),
      palette: z.array(
        z.object({ name: z.string(), hex: z.string(), role: z.string() }),
      ),
      graphicStyle: z.object({
        primaryFont: z.string(),
        visualMood: z.string(),
        toneOfVoice: z.string(),
      }),
      brandArchetype: z.string(),
    }),
    websiteGenerator: z.object({
      hero: z.object({
        badge: z.string(),
        headline: z.string(),
        subheadline: z.string(),
        primaryCta: z.string(),
        secondaryCta: z.string(),
      }),
      features: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          iconName: z.string(),
        }),
      ),
      callToAction: z.object({
        title: z.string(),
        subtitle: z.string(),
        buttonText: z.string(),
      }),
      faq: z.array(z.object({ question: z.string(), answer: z.string() })),
      footer: z.object({
        tagline: z.string(),
        links: z.array(z.string()),
        copyright: z.string(),
      }),
    }),
    marketingPlan: z.object({
      minimumBudget: z.string(),
      organicStrategy: z.array(z.string()),
      socialMediaStrategy: z.array(
        z.object({
          platform: z.string(),
          focus: z.string(),
          frequency: z.string(),
          growthTactic: z.string(),
        }),
      ),
      acquisitionChannels: z.array(z.string()),
      advertisingCampaigns: z.array(
        z.object({
          platform: z.string(),
          recommendedSpend: z.string(),
          hookAngle: z.string(),
          targetAudience: z.string(),
        }),
      ),
    }),
    roadmap: z.object({
      month1: roadmapMonthSchema,
      month2: roadmapMonthSchema,
      month3: roadmapMonthSchema,
    }),
    worldCupAnalysis: z.object({
      worldCupScore: z.number(),
      headlineAssessment: z.string(),
      sectorImpacts: z.array(
        z.object({
          sector: z.string(),
          score: z.number(),
          relevance: z.string(),
          opportunity: z.string(),
          actionableTactic: z.string(),
        }),
      ),
      strategicAdvantages: z.array(z.string()),
      immediateStepsFor2030: z.array(z.string()),
    }),
  })
  .passthrough();

/** Réponse attendue de l'endpoint : `{ project: VentureProject }`. */
export const ventureResponseSchema = z.object({
  project: ventureProjectSchema,
});
