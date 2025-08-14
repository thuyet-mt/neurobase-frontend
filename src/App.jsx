import React, { useState, useMemo, useCallback, useRef } from "react";
import Neurobase from "./components/Neurobase";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./services/ErrorBoundary";
import NotificationSystem from "./components/NotificationSystem";
import OptimizedCursor3D from "./components/OptimizedCursor3D";
import CursorCalibration from "./components/CursorCalibration";
import CursorPerformancePanel from "./components/CursorPerformancePanel";

import { useThrottledProgress } from "./hooks/useThrottledProgress";

function App() {
  // Add render counter for tracking re-renders
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  
  console.log(`🔄 App re-render #${renderCountRef.current}`);
  
  const [progressValue, updateProgress] = useThrottledProgress(35, 32); // Increased throttle to 32ms
  const [cursorOffset, setCursorOffset] = useState({ x: 0.15, y: 0.1 });

  // Calculate cursor size based on progress value (5x larger) - MEMOIZED
  const cursorSize = useMemo(() => {
    const size = 250 + (progressValue / 100) * 750; // Map 0-100 to 250-1000
    console.log(`📏 Cursor size calculated: ${size}px (progress: ${progressValue}%)`);
    return size;
  }, [progressValue]);

  const handleProgressChange = useCallback((newValue) => {
    console.log(`📊 Progress changed: ${progressValue}% → ${newValue}%`);
    updateProgress(newValue);
  }, [updateProgress, progressValue]);

  const handleCursorOffsetChange = useCallback((newOffset) => {
    console.log(`🎯 Cursor offset changed in App:`, newOffset);
    setCursorOffset(newOffset);
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <OptimizedCursor3D 
            size={cursorSize} 
            onOffsetChange={handleCursorOffsetChange}
          />
          <CursorCalibration 
            onOffsetChange={handleCursorOffsetChange}
            currentOffset={cursorOffset}
          />
          <CursorPerformancePanel />
          <NotificationSystem />
          <Neurobase 
            showMenuButton={true}
            showBackButton={true} 
            showModeButton={true}
            progressValue={progressValue}
            onProgressChange={handleProgressChange}
          />
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;