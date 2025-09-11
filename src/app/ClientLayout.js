'use client';

import { useState, useEffect, useRef } from 'react'; // Import useRef
import { usePathname, useSearchParams } from 'next/navigation';
import PageLoader from '../pageloader/page'; // Adjust path if necessary
import ChatWidget from './chatbot/page'; // Assuming this path is correct

export default function ClientLayout({ children }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true); // Use a ref to track initial mount

  useEffect(() => {
    if (isInitialMount.current) {
      const initialLoadTimer = setTimeout(() => {
        setInitialLoading(false);
        isInitialMount.current = false;
      }, 200); // Initial load delay

      return () => clearTimeout(initialLoadTimer);
    }
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) { // Only trigger page loading after initial mount
      setPageLoading(true);
      const pageLoadTimer = setTimeout(() => {
        setPageLoading(false);
      }, 100); // Short delay for page-wise loading

      return () => clearTimeout(pageLoadTimer);
    }
  }, [pathname, searchParams]);

  return (
    <>
      {(initialLoading || pageLoading) && <PageLoader />}
      {!(initialLoading || pageLoading) && children}
      {!(initialLoading || pageLoading) && <ChatWidget />}
    </>
  );
}