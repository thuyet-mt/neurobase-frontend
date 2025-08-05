import React, { memo } from 'react';
import Cursor3D from './Cursor3D';

// Memoized wrapper to prevent unnecessary re-renders
const OptimizedCursor3D = memo(({ size, onOffsetChange }) => {
  return (
    <Cursor3D 
      size={size} 
      onOffsetChange={onOffsetChange}
    />
  );
}, (prevProps, nextProps) => {
  // Custom comparison to prevent re-renders when size changes are minimal
  const sizeDiff = Math.abs(prevProps.size - nextProps.size);
  return sizeDiff < 10 && prevProps.onOffsetChange === nextProps.onOffsetChange;
});

OptimizedCursor3D.displayName = 'OptimizedCursor3D';

export default OptimizedCursor3D; 