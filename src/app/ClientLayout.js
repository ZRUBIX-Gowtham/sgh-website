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
  }, []); // Runs only once on initial mount

  // Effect for subsequent route changes
  useEffect(() => {
    // This effect should only run AFTER the initial mount is complete
    // and when pathname or searchParams actually change.
    if (!isInitialMount.current) {
      setLoading(true); // Start loading for navigation

      const navigationTimer = setTimeout(() => {
        setLoading(false); // End loading after navigation delay
      }, 1000); // Navigation delay

      return () => clearTimeout(navigationTimer);
    }
  }, [pathname, searchParams]); // Re-run on route changes (after initial mount)

  return (
    <>
      {loading && <PageLoader />}
      {!loading && children}
      {!loading && <ChatWidget />}
    </>
  );
}