import React, { useState, useMemo, useCallback } from "react";
import Neurobase from "./components/Neurobase";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./services/ErrorBoundary";
import NotificationSystem from "./components/NotificationSystem";
import OptimizedCursor3D from "./components/OptimizedCursor3D";
import CursorCalibration from "./components/CursorCalibration";
import { POSITION_CONFIG } from "./constants/buttons";
import { useThrottledProgress } from "./hooks/useThrottledProgress";

function App() {
  const [progressValue, updateProgress] = useThrottledProgress(35, 16); // Throttled progress
  const [cursorOffset, setCursorOffset] = useState({ x: 0.15, y: 0.1 });

  // Calculate cursor size based on progress value (5x larger) - MEMOIZED
  const cursorSize = useMemo(() => {
    return 250 + (progressValue / 100) * 750; // Map 0-100 to 250-1000
  }, [progressValue]);

  const handleProgressChange = useCallback((newValue) => {
    updateProgress(newValue);
  }, [updateProgress]);

  const handleCursorOffsetChange = useCallback((newOffset) => {
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
          <NotificationSystem />
          <Neurobase 
            {...POSITION_CONFIG}
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