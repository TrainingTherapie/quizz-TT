import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prenom, email, zone, programme, tag, date, timestamp } = req.body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email valide requis' });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL not configured');
    return res.status(500).json({ error: 'Webhook non configuré' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prenom, email, zone, programme, tag, date, timestamp }),
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
