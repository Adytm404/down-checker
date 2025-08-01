import React from 'react';
import type { CheckResult } from '../types';
import { CheckStatus } from '../types';
import { Icon } from './Icon';

interface ResultCardProps {
  result: CheckResult | null;
  isLoading: boolean;
}

const ResultItem: React.FC<{ label: string; value: React.ReactNode; icon: string }> = ({ label, value, icon }) => (
  <div className="flex items-start">
    <Icon icon={icon} className="text-slate-400 mt-1 mr-3 w-4 text-center" />
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="font-semibold text-slate-200">{value}</p>
    </div>
  </div>
);

export const ResultCard: React.FC<ResultCardProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full text-center p-8">
        <Icon icon="fas fa-spinner fa-spin" className="text-4xl text-sky-400" />
        <p className="mt-4 text-lg text-slate-300">Checking status...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full text-center p-8 bg-slate-800/50 border border-slate-700 rounded-lg">
        <p className="text-slate-400">Enter a domain or IP to begin the check.</p>
      </div>
    );
  }

  if (result.status === CheckStatus.ERROR) {
    return (
      <div className="p-6 border rounded-lg transition-all border-red-500/50 bg-red-900/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Icon icon="fas fa-circle-exclamation" className="text-4xl text-red-400" />
          <div>
            <h2 className="text-2xl font-bold text-slate-100">
              Check Failed for {result.domain}
            </h2>
            {result.error && <p className="text-slate-400 mt-1">{result.error}</p>}
          </div>
        </div>
      </div>
    );
  }

  const isUp = result.status === CheckStatus.UP;
  const cardColorClass = isUp ? 'border-green-500/50 bg-green-900/20' : 'border-red-500/50 bg-red-900/20';
  const iconClass = isUp ? 'text-green-400' : 'text-red-400';
  const statusIcon = isUp ? 'fas fa-circle-check' : 'fas fa-circle-xmark';

  return (
    <div className={`p-6 border rounded-lg transition-all ${cardColorClass}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Icon icon={statusIcon} className={`text-4xl ${iconClass}`} />
        <div>
          <h2 className="text-2xl font-bold text-slate-100">
            It's <span className={iconClass}>{isUp ? 'Up' : 'Down'}</span> for {result.domain}
          </h2>
          <p className="text-slate-400">
            {isUp 
              ? `The site is online and reachable.` 
              : result.error || `Our check indicates that ${result.domain} is unreachable.`
            }
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-700">
        <ResultItem label="IP Address" value={result.ipAddress || 'N/A'} icon="fas fa-network-wired" />
        <ResultItem label="Response Time" value={result.responseTime ? `${result.responseTime} ms` : 'N/A'} icon="fas fa-stopwatch" />
        <ResultItem label="Location" value={result.location || 'Unknown'} icon="fas fa-map-marker-alt" />
      </div>
    </div>
  );
};
