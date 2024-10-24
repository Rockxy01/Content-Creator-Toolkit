import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Type, Hash, Clock, AlertCircle, Search, Brain,
  MessageSquare, Copy, CheckCircle, RefreshCcw, Heading
} from 'lucide-react';

const ContentCreatorToolkit = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    readabilityScore: 0,
    keywordDensity: 0,
    longSentences: 0,
    passiveVoice: 0,
    readabilityLevel: ''
  });

  // Calculate readability metrics
  const analyzeReadability = (text) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.length > 0);
    const paragraphs = text.split('\n\n').filter(para => para.length > 0);
    const avgWordsPerSentence = words.length / sentences.length;
    
    // Count complex words (3+ syllables)
    const complexWords = words.filter(word => {
      const syllables = word.toLowerCase()
        .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
        .match(/[aeiouy]{1,2}/g);
      return syllables && syllables.length >= 3;
    }).length;

    // Calculate Flesch-Kincaid Grade Level
    const readabilityScore = Math.round(
      206.835 - 1.015 * avgWordsPerSentence - 84.6 * (complexWords / words.length)
    );

    // Count long sentences (more than 20 words)
    const longSentences = sentences.filter(sentence => 
      sentence.split(/\s+/).length > 20
    ).length;

    // Detect passive voice (simple implementation)
    const passiveVoiceCount = (text.match(/\b(am|is|are|was|were|be|been|being)\s+\w+ed\b/gi) || []).length;

    return {
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readingTime: Math.ceil(words.length / 225),
      readabilityScore,
      longSentences,
      passiveVoice: passiveVoiceCount,
      readabilityLevel: getReadabilityLevel(readabilityScore)
    };
  };

  const getReadabilityLevel = (score) => {
    if (score >= 90) return 'Very Easy';
    if (score >= 80) return 'Easy';
    if (score >= 70) return 'Fairly Easy';
    if (score >= 60) return 'Standard';
    if (score >= 50) return 'Fairly Difficult';
    if (score >= 30) return 'Difficult';
    return 'Very Difficult';
  };

  // Generate headline variations
  const generateHeadlines = () => {
    if (!inputText) return [];
    const baseText = inputText.split('\n')[0];
    return [
      `How to ${baseText}`,
      `${baseText}: A Complete Guide`,
      `${baseText} - Everything You Need to Know`,
      `The Ultimate Guide to ${baseText}`,
      `Why ${baseText} Matters`,
      `${baseText}: Tips & Tricks`,
    ];
  };

  // Generate meta description
  const generateMetaDescription = () => {
    if (!inputText) return '';
    const words = inputText.split(/\s+/).slice(0, 30).join(' ');
    return `${words}...`.slice(0, 155);
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    
    // Update all stats
    const readabilityStats = analyzeReadability(newText);
    const keywordDensity = focusKeyword ? 
      ((newText.toLowerCase().match(new RegExp(focusKeyword.toLowerCase(), 'g')) || []).length / 
      newText.split(/\s+/).length * 100).toFixed(1) : 0;

    setStats({
      characters: newText.length,
      keywordDensity,
      ...readabilityStats
    });
  };

  const handleKeywordChange = (e) => {
    setFocusKeyword(e.target.value);
    // Recalculate keyword density
    if (inputText) {
      const density = ((inputText.toLowerCase().match(new RegExp(e.target.value.toLowerCase(), 'g')) || []).length / 
        inputText.split(/\s+/).length * 100).toFixed(1);
      setStats(prev => ({ ...prev, keywordDensity: density }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="w-6 h-6" />
            Advanced Content Creator's Toolkit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="editor" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="seo">SEO Analysis</TabsTrigger>
              <TabsTrigger value="readability">Readability</TabsTrigger>
              <TabsTrigger value="headlines">Headlines</TabsTrigger>
            </TabsList>

            <div className="grid gap-4">
              <div className="flex gap-4">
                <Textarea 
                  placeholder="Enter your content here..." 
                  className="min-h-[400px]"
                  value={inputText}
                  onChange={handleInputChange}
                />

                <div className="w-64 space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Characters</span>
                          <span className="font-bold">{stats.characters}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Words</span>
                          <span className="font-bold">{stats.words}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sentences</span>
                          <span className="font-bold">{stats.sentences}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Paragraphs</span>
                          <span className="font-bold">{stats.paragraphs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reading Time</span>
                          <span className="font-bold">{stats.readingTime} min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <TabsContent value="seo" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Focus Keyword</label>
                        <Input 
                          value={focusKeyword}
                          onChange={handleKeywordChange}
                          placeholder="Enter your focus keyword"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Keyword Density</label>
                        <div className="flex items-center gap-2">
                          <Progress value={stats.keywordDensity * 10} className="w-full" />
                          <span className="text-sm">{stats.keywordDensity}%</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Meta Description</label>
                        <Textarea 
                          value={generateMetaDescription()}
                          readOnly
                          className="h-24"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="readability" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Readability Score</span>
                            <Badge>{stats.readabilityLevel}</Badge>
                          </div>
                          <Progress value={stats.readabilityScore} className="w-full" />
                        </div>

                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {stats.longSentences} long sentences found
                          </AlertDescription>
                        </Alert>

                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {stats.passiveVoice} instances of passive voice
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Suggestions</h3>
                        <ul className="space-y-2 text-sm">
                          {stats.readabilityScore < 60 && (
                            <li>• Try using shorter sentences and simpler words</li>
                          )}
                          {stats.longSentences > 0 && (
                            <li>• Consider breaking down sentences longer than 20 words</li>
                          )}
                          {stats.passiveVoice > 0 && (
                            <li>• Try to use more active voice in your writing</li>
                          )}
                          {stats.words < 300 && (
                            <li>• Consider adding more content for better depth</li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="headlines" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Headline Variations</h3>
                      <div className="space-y-2">
                        {generateHeadlines().map((headline, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                            <span>{headline}</span>
                            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(headline)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreatorToolkit;
