import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { ResultCard } from './components/ResultCard';
import { checkDomain } from './services/checkerService';
import type { CheckResult } from './types';
import { CheckStatus } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckDomain = useCallback(async (domain: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const checkResult = await checkDomain(domain);
      setResult(checkResult);
    } catch (e) {
      const err = e as Error;
      setResult({
        domain,
        status: CheckStatus.ERROR,
        timestamp: new Date().toISOString(),
        error: err.message || 'An unexpected error occurred during the check.',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main>
          <SearchForm onCheck={handleCheckDomain} isLoading={isLoading} />
          <div className="mt-6">
            <ResultCard 
              result={result} 
              isLoading={isLoading} 
            />
          </div>
        </main>
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Site Status Checker. All rights reserved.</p>
          <p className="mt-1">Powered by React and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
