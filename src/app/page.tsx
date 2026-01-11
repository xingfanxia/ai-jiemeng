'use client';

import { useState } from 'react';
import { Moon, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserMenu } from '@/components/auth';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  const [dreamContent, setDreamContent] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);

  const handleInterpret = async () => {
    if (!dreamContent.trim()) return;

    setIsInterpreting(true);
    // TODO: Implement dream interpretation API call
    setTimeout(() => {
      setIsInterpreting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Dream Interpreter
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Dream Analysis
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Discover the Hidden Meanings
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                in Your Dreams
              </span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Share your dream and let our AI reveal the symbols, emotions, and insights
              hidden within your subconscious mind.
            </p>
          </div>

          {/* Dream Input Card */}
          <Card className="dream-gradient-subtle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" />
                Describe Your Dream
              </CardTitle>
              <CardDescription>
                Share as many details as you remember - places, people, feelings, colors, and symbols.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Last night I dreamed that I was flying over a vast ocean. The water was crystal clear and I could see colorful fish swimming below. Suddenly, I started to descend towards the water..."
                value={dreamContent}
                onChange={(e) => setDreamContent(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {dreamContent.length} characters
                </span>
                <Button
                  variant="dream"
                  size="lg"
                  onClick={handleInterpret}
                  disabled={!dreamContent.trim() || isInterpreting}
                  className="gap-2"
                >
                  {isInterpreting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Interpreting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Interpret Dream
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for interpretation results */}
          {/* TODO: Add InterpretationResult component */}

          {/* Tips Section */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '✨',
                title: 'Be Detailed',
                description: 'Include colors, emotions, and specific objects you remember.',
              },
              {
                icon: '🎭',
                title: 'Note Feelings',
                description: 'How did you feel during the dream? This is key to interpretation.',
              },
              {
                icon: '🔄',
                title: 'Recurring Dreams',
                description: 'Mention if this is a recurring theme for deeper analysis.',
              },
            ].map((tip, index) => (
              <Card key={index} className="text-center p-4">
                <div className="text-2xl mb-2">{tip.icon}</div>
                <h3 className="font-medium text-foreground">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AI Dream Interpreter - Unlock the secrets of your subconscious</p>
        </div>
      </footer>
    </div>
  );
}
