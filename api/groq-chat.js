// Vercel Serverless Function for Groq API (JavaScript version)
// This ensures compatibility if TypeScript compilation has issues

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid prompt' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
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
      return res.status(500).json({ error: errorMessage });
    }

    const data = await groqRes.json();
    const reply =
      data?.choices?.[0]?.message?.content ?? 'No response from model.';

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
