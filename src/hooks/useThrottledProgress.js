import { useState, useCallback, useRef } from 'react';

export const useThrottledProgress = (initialValue = 35, throttleMs = 16) => {
  const [progressValue, setProgressValue] = useState(initialValue);
  const timeoutRef = useRef(null);
  const lastUpdateRef = useRef(initialValue);

  const updateProgress = useCallback((newValue) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only update if the change is significant
    if (Math.abs(newValue - lastUpdateRef.current) < 2) {
      return;
    }

    // Throttle the update
    timeoutRef.current = setTimeout(() => {
      setProgressValue(newValue);
      lastUpdateRef.current = newValue;
    }, throttleMs);
  }, [throttleMs]);

  return [progressValue, updateProgress];
}; 