// Vercel Serverless Function for Groq API
// This file enables the API endpoint to work in production on Vercel

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = request.body;

    if (!prompt || typeof prompt !== 'string') {
      return response.status(400).json({ error: 'Missing or invalid prompt' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return response.status(500).json({
        error: 'Server not configured with GROQ_API_KEY. Please check your environment variables.',
      });
    }

    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content:
                'You are Tree Whisperer, an assistant that helps people care for trees. Be concise and practical. Provide helpful advice about tree planting, watering, health, and maintenance.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!groqRes.ok) {
      const errorText = await groqRes.text();
      let errorMessage = 'Failed to get response from AI service';
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (e) {
        // Keep default error message
      }
      return response.status(500).json({ error: errorMessage });
    }

    const data = await groqRes.json();
    const reply =
      data?.choices?.[0]?.message?.content ?? 'No response from model.';

    return response.status(200).json({ reply });
  } catch (err) {
    console.error('API error:', err);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
