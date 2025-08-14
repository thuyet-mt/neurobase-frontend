import React, { memo, useRef, useEffect } from 'react';
import Cursor3D from './Cursor3D';
import cursorPerformanceMonitor, { optimizeCursorPerformance } from '../utils/cursorPerformanceMonitor';

// Optimized memoized wrapper for Cursor3D with performance monitoring
const OptimizedCursor3D = memo(({ size, onOffsetChange }) => {
  const renderCountRef = useRef(0);
  const lastSizeRef = useRef(size);
  const performanceReportRef = useRef(null);
  
  renderCountRef.current += 1;
  
  // Start performance monitoring on mount
  useEffect(() => {
    cursorPerformanceMonitor.start();
    
    // Log performance report every 10 seconds
    const reportInterval = setInterval(() => {
      const report = cursorPerformanceMonitor.getPerformanceReport();
      performanceReportRef.current = report;
      
      // Only log if there are performance issues
      if (report.current.fps < 45 || report.current.frameTime > 25) {
        console.log('📊 Cursor Performance Report:', report);
      }
    }, 10000);
    
    return () => {
      cursorPerformanceMonitor.stop();
      clearInterval(reportInterval);
    };
  }, []);
  
  // Log performance issues
  useEffect(() => {
    if (performanceReportRef.current) {
      const { current, recommendations } = performanceReportRef.current;
      
      if (current.fps < 30) {
        console.warn(`🚨 Critical: Cursor FPS too low (${current.fps})`);
        console.log('💡 Recommendations:', recommendations);
      }
    }
  }, [performanceReportRef.current]);
  
  console.log(`🎯 OptimizedCursor3D rendering #${renderCountRef.current} with size: ${size}`);

  return (
    <Cursor3D 
      size={size} 
      onOffsetChange={onOffsetChange}
    />
  );
}, (prevProps, nextProps) => {
  const sizeDiff = Math.abs(prevProps.size - nextProps.size);
  const onOffsetChangeChanged = prevProps.onOffsetChange !== nextProps.onOffsetChange;
  
  // Adaptive threshold based on performance
  const performanceReport = cursorPerformanceMonitor.getPerformanceReport();
  const adaptiveThreshold = performanceReport.current.fps < 45 ? 50 : 20;
  
  const shouldSkip = sizeDiff < adaptiveThreshold && !onOffsetChangeChanged;
  
  console.log(`🔍 OptimizedCursor3D memo comparison:`, {
    prevSize: prevProps.size,
    nextSize: nextProps.size,
    sizeDiff: sizeDiff.toFixed(1),
    adaptiveThreshold,
    onOffsetChangeChanged,
    shouldSkip,
    currentFPS: performanceReport.current.fps
  });
  
  return shouldSkip;
});

OptimizedCursor3D.displayName = 'OptimizedCursor3D';

// Export performance utilities for external use
export { cursorPerformanceMonitor, optimizeCursorPerformance };

export default OptimizedCursor3D; 