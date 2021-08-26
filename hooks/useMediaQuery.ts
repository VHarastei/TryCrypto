import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return null;

  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
