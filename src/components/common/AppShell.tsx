'use client';

import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f3f4f8] flex justify-center selection:bg-[#712CDC]/20 selection:text-[#712CDC]">
      <div className="w-full max-w-[500px] min-h-screen bg-white relative flex flex-col shadow-xl md:border-x md:border-gray-200/80">
        <div className="flex-1 flex flex-col pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}
