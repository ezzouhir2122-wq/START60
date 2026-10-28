import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { ventureResponseSchema } from './src/types/ventureSchema';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Venture Generation Endpoint
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt requis' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      fallback: true,
      message: 'Aucune clé GEMINI_API_KEY détectée, utilisation du moteur contextuel haute précision',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `Tu es l'équipe fondatrice et le comité d'investissement du prestigieux incubateur START60 - AI Venture Builder.
Tu es composé d'un Senior Product Manager, d'un Fondateur Y Combinator, d'un UX Designer, d'un Software Architect, d'un Full Stack Engineer, d'un Expert IA, d'un Consultant Business et d'un Analyste VC.
Ta mission est de transformer l'idée brute fournie par l'utilisateur en un dossier de startup complet et prêt à lancer en moins de 60 minutes.
Tu dois répondre STRICTEMENT en JSON respectant exactement le schéma suivant :
{
  "project": {
    "businessScore": {
      "overallScore": number (0-100),
      "decision": "GO" | "PIVOT" | "NO GO",
      "decisionReason": string,
      "marketPotential": number (0-100),
      "revenuePotential": number (0-100),
      "executionDifficulty": number (0-100),
      "competitionLevel": number (0-100),
      "aiOpportunityScore": number (0-100),
      "verdictSummary": string
    },
    "businessModel": {
      "valueProposition": string[],
      "customerSegments": string[],
      "revenueStreams": string[],
      "costStructure": string[],
      "acquisitionChannels": string[],
      "keyPartners": string[],
      "keyActivities": string[],
      "keyResources": string[],
      "customerRelationships": string[]
    },
    "marketAnalysis": {
      "tam": string,
      "sam": string,
      "som": string,
      "tamValue": number,
      "samValue": number,
      "somValue": number,
      "marketGrowthRate": string,
      "directCompetitors": [{ "name": string, "type": "Direct", "strengths": string, "weaknesses": string, "marketShareEstimate": string }],
      "indirectCompetitors": [{ "name": string, "type": "Indirect", "strengths": string, "weaknesses": string, "marketShareEstimate": string }],
      "opportunities": string[],
      "threats": string[],
      "whySucceed": string
    },
    "financialEstimation": {
      "currency": "€" | "$" | "MAD",
      "starterBudget": number,
      "monthlyExpenses": number,
      "recommendedPrice": string,
      "unitPrice": number,
      "customersNeeded": number,
      "breakEvenMonth": number,
      "projectedRevenue": {
        "month1": number,
        "month3": number,
        "month6": number,
        "month12": number,
        "month24": number,
        "month36": number
      },
      "monthlyBurnBreakdown": [{ "category": string, "amount": number, "percentage": number }]
    },
    "mvpBuilder": {
      "tagline": string,
      "estimatedDays": 7,
      "estimatedCost": string,
      "mustHaveFeatures": [{ "title": string, "description": string, "priority": "Must-Have P0", "targetDay": string }],
      "featuresToIgnore": [{ "title": string, "description": string, "priority": "Ignorer V1", "reasonIfIgnored": string }],
      "recommendedTechStack": {
        "frontend": string,
        "backend": string,
        "database": string,
        "ai": string,
        "payment": string,
        "hosting": string
      },
      "launchChecklist": string[]
    },
    "brandGenerator": {
      "startupName": string,
      "alternativeNames": string[],
      "slogan": string,
      "brandStory": string,
      "coreValues": string[],
      "palette": [{ "name": string, "hex": string, "role": string }],
      "graphicStyle": { "primaryFont": string, "visualMood": string, "toneOfVoice": string },
      "brandArchetype": string
    },
    "websiteGenerator": {
      "hero": { "badge": string, "headline": string, "subheadline": string, "primaryCta": string, "secondaryCta": string },
      "features": [{ "title": string, "description": string, "iconName": string }],
      "callToAction": { "title": string, "subtitle": string, "buttonText": string },
      "faq": [{ "question": string, "answer": string }],
      "footer": { "tagline": string, "links": string[], "copyright": string }
    },
    "marketingPlan": {
      "minimumBudget": string,
      "organicStrategy": string[],
      "socialMediaStrategy": [{ "platform": string, "focus": string, "frequency": string, "growthTactic": string }],
      "acquisitionChannels": string[],
      "advertisingCampaigns": [{ "platform": string, "recommendedSpend": string, "hookAngle": string, "targetAudience": string }]
    },
    "roadmap": {
      "month1": { "month": 1, "title": string, "theme": string, "kpis": string[], "actions": [{ "id": string, "label": string, "done": boolean }] },
      "month2": { "month": 2, "title": string, "theme": string, "kpis": string[], "actions": [{ "id": string, "label": string, "done": boolean }] },
      "month3": { "month": 3, "title": string, "theme": string, "kpis": string[], "actions": [{ "id": string, "label": string, "done": boolean }] }
    },
    "worldCupAnalysis": {
      "worldCupScore": number (0-100),
      "headlineAssessment": string,
      "sectorImpacts": [
        { "sector": "Tourisme" | "Transport" | "Hébergement" | "Restauration" | "Digitalisation" | "Logistique" | "Artisanat" | "Services", "score": number, "relevance": string, "opportunity": string, "actionableTactic": string }
      ],
      "strategicAdvantages": string[],
      "immediateStepsFor2030": string[]
    }
  }
}
Rédige en français avec une précision et un réalisme percutant.`;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Idée de projet à analyser et transformer en startup : "${prompt}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = aiResponse.text;
    if (!text) {
      return res.status(200).json({ fallback: true });
    }

    // Parse + validation stricte de la structure renvoyée par l'IA.
    const parsed = JSON.parse(text);
    const result = ventureResponseSchema.safeParse(parsed);
    if (!result.success) {
      console.error(
        'Réponse Gemini structurellement invalide, fallback contextuel:',
        result.error.issues.slice(0, 5),
      );
      return res.status(200).json({ fallback: true });
    }

    // Enrichissement des métadonnées (l'IA ne les fournit pas).
    const project = {
      ...result.data.project,
      id: 'venture-' + Date.now(),
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      ideaPrompt: prompt,
    };

    return res.json({ project });
  } catch (error) {
    console.error('Gemini generation error, falling back:', error);
    return res.status(200).json({ fallback: true });
  }
});

async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`START60 AI Venture Builder server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
