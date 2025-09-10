'use client';

import { useState, useEffect, useRef } from 'react'; // Import useRef
import { usePathname, useSearchParams } from 'next/navigation';
import PageLoader from '../pageloader/page'; // Adjust path if necessary
import ChatWidget from './chatbot/page'; // Assuming this path is correct

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true); // Use a ref to track initial mount

  // Effect for initial page load
  useEffect(() => {
    if (isInitialMount.current) {
      const initialLoadTimer = setTimeout(() => {
        setLoading(false);
        isInitialMount.current = false; // Mark initial mount as complete
      }, 2800); // Initial load delay

      return () => clearTimeout(initialLoadTimer);
    }
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      {!loading && children}
      {!loading && <ChatWidget />}
    </>
  );
}