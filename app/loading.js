'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname } from 'next/navigation';
import 'nprogress/nprogress.css'; // Import the default NProgress styles

export default function Loading() {
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    // Start the progress bar when route change starts
    const handleStart = () => NProgress.start();

    // Complete the progress bar when route change completes
    const handleComplete = () => NProgress.done();

    // Trigger progress bar when pathname changes
    const handleRouteChange = (url) => {
      handleStart();  // Start the loading progress
      NProgress.done(); // End the progress
    };

    // Observe changes in the pathname and start the progress bar
    if (pathname) {
      handleRouteChange(pathname);
    }

    // Cleanup (optional for better resource management)
    return () => {
      handleComplete(); // Clean up progress bar after component unmounts
    };
  }, [pathname]); // Only re-run the effect when pathname changes

  return null
}
