import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Particles from '@/components/Particles';

const AIMode: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    setError(null);
    setResponse(null);

    if (!prompt.trim()) {
      setError('Please enter a question or instruction for the AI.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/groq-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      const text: string = data?.reply ?? 'No response from model.';
      setResponse(text);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while talking to the AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Particles Background */}
      <div className="fixed inset-0 z-0" style={{ width: '100%', height: '100%' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl bg-card/80 backdrop-blur-md border border-border/60 rounded-2xl shadow-soft p-8 space-y-6">

        <div>
          <h1 className="font-display text-2xl md:text-3xl mb-2 text-foreground">
            AI mode
          </h1>
          <p className="text-sm text-muted-foreground">
            Ask the AI about tree health, care, and planting decisions. No setup needed — just start chatting.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="prompt">
            Ask Tree Whisperer
          </label>
          <Textarea
            id="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="For example: I planted a neem tree near Rajiv Gandhi Nagar, how often should I water it?"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end">
          <Button type="button" onClick={handleAsk} disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Ask AI'}
          </Button>
        </div>

        {response && (
          <div className="mt-4 p-4 rounded-lg bg-muted/60 border border-border/60">
            <p className="text-sm whitespace-pre-wrap text-foreground">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMode;

