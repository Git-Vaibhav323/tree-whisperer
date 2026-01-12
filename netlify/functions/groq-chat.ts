// Netlify Serverless Function for Groq API
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { prompt } = JSON.parse(event.body || '{}');

    if (!prompt || typeof prompt !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid prompt' }),
      };
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Server not configured with GROQ_API_KEY. Please check your environment variables.',
        }),
      };
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
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: errorMessage }),
      };
    }

    const data = await groqRes.json();
    const reply =
      data?.choices?.[0]?.message?.content ?? 'No response from model.';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error('API error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
