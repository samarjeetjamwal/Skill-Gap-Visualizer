import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { Dashboard } from './components/Dashboard';
import { analyzeSkills } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async (resumeText: string, targetText: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeSkills(resumeText, targetText);
      setResult(data);
    } catch (err: any) {
      console.error("Analysis failed", err);
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {!result ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Bridge Your <span className="text-primary">Skill Gap</span>
              </h1>
              <p className="text-lg text-slate-600">
                Upload your resume and a target job description. We'll use AI to visualize your proficiency gaps and build a custom learning plan.
              </p>
            </div>
            <InputForm onAnalyze={handleAnalysis} isLoading={isLoading} />
          </div>
        ) : (
          <Dashboard data={result} onReset={handleReset} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Skill Gap Visualizer. Created by Samar Jeet Jamwal.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;