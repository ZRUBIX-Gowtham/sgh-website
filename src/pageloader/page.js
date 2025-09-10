// components/PageLoader.jsx
'use client';
import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999] overflow-hidden" role="status" aria-live="polite">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-black border-solid border-black"></div>
        <p className="text-black mt-2 text-base">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;