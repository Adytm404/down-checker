import React from 'react';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <div className="inline-block bg-sky-500/10 p-4 rounded-full mb-4">
        <Icon icon="fas fa-server" className="text-4xl text-sky-400" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-100">Site Status Checker</h1>
      <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
        Instantly check if a website is down for everyone or just you.
      </p>
    </header>
  );
};