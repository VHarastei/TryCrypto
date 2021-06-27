import { useEffect, useRef } from 'react';

export const useDidMount = () => {
  const mountRef = useRef(true);

  useEffect(() => {
    mountRef.current = false;
  }, []);
  return mountRef.current;
};
