
import React, { useState } from 'react';
import { Icon } from './Icon';

interface SearchFormProps {
  onCheck: (domain: string) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onCheck, isLoading }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (domain.trim()) {
      onCheck(domain.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-grow">
        <Icon icon="fas fa-globe" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain or IP address (e.g., google.com)"
          className="w-full h-14 pl-12 pr-4 bg-slate-800 border-2 border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !domain.trim()}
        className="h-14 px-6 bg-sky-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <Icon icon="fas fa-spinner fa-spin" />
            <span>Checking...</span>
          </>
        ) : (
          <>
            <Icon icon="fas fa-magnifying-glass" />
            <span>Check Status</span>
          </>
        )}
      </button>
    </form>
  );
};
