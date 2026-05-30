import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const PayloadSchema = z.object({
  prenom: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  zone: z.string().max(100),
  programme: z.string().min(1).max(200),
  tag: z.string().max(100),
  date: z.string().max(50),
  timestamp: z.number().int().positive(),
  // Profil commun
  genre: z.string().max(10).optional(),
  age: z.string().max(50).optional(),
  objectif: z.string().max(20).optional(),
  motivation: z.number().int().min(0).max(10).optional(),
  // Branche douleur
  douleur_raisons: z.array(z.string().max(200)).optional(),
  douleur_zone: z.string().max(100).optional(),
  douleur_sous_zone: z.string().max(100).optional(),
  douleur_duree: z.string().max(100).optional(),
  douleur_sport: z.string().max(100).optional(),
  douleur_entrainement: z.string().max(200).optional(),
  douleur_kine: z.string().max(10).optional(),
  douleur_kine_type: z.string().max(100).optional(),
  douleur_salle: z.string().max(10).optional(),
  douleur_intensite: z.number().int().min(0).max(10).optional(),
  // Branche mobilité
  mob_raisons: z.array(z.string().max(200)).optional(),
  mob_zone: z.string().max(100).optional(),
  mob_duree: z.string().max(100).optional(),
  mob_experience: z.string().max(200).optional(),
  mob_blocages: z.array(z.string().max(200)).optional(),
});

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

function pickAllowedOrigin(origin: string | undefined): string | null {
  if (!origin) return null;
  return ALLOWED_ORIGINS.includes(origin) ? origin : null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
  const allowedOrigin = pickAllowedOrigin(origin);

  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (ALLOWED_ORIGINS.length > 0 && !allowedOrigin) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  const parsed = PayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Données invalides' });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL not configured');
    return res.status(500).json({ error: 'Webhook non configuré' });
  }

  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(webhookSecret ? { 'X-Webhook-Secret': webhookSecret } : {}),
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      console.error('N8N responded with', response.status);
      return res.status(502).json({ error: 'Erreur webhook' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Webhook call failed:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
