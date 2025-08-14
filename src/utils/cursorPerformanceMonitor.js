// Cursor Performance Monitor
// Utility for monitoring and optimizing Cursor3D performance

class CursorPerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 0,
      frameTime: 0,
      memoryUsage: 0,
      renderCount: 0,
      loadTime: 0,
      errors: 0
    };
    
    this.history = [];
    this.maxHistorySize = 100;
    this.isMonitoring = false;
    this.monitorInterval = null;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
  }

  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    
    this.monitorInterval = setInterval(() => {
      this.updateMetrics();
      this.checkPerformance();
    }, 1000); // Check every second
    
    console.log('🎯 Cursor Performance Monitor started');
  }

  stop() {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
    
    console.log('🎯 Cursor Performance Monitor stopped');
  }

  updateMetrics() {
    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    
    // Calculate FPS
    this.metrics.fps = Math.round((this.frameCount * 1000) / deltaTime);
    this.metrics.frameTime = deltaTime / this.frameCount || 0;
    
    // Reset counters
    this.frameCount = 0;
    this.lastFrameTime = now;
    
    // Memory usage (if available)
    if (performance.memory) {
      this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    
    // Store in history
    this.history.push({
      timestamp: now,
      ...this.metrics
    });
    
    // Keep history size manageable
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
  }

  recordFrame() {
    this.frameCount++;
    this.metrics.renderCount++;
  }

  recordLoadTime(loadTime) {
    this.metrics.loadTime = loadTime;
  }

  recordError() {
    this.metrics.errors++;
  }

  checkPerformance() {
    const { fps, frameTime, memoryUsage, errors } = this.metrics;
    
    // Performance warnings
    if (fps < 30) {
      console.warn(`⚠️ Low FPS detected: ${fps} - Consider reducing cursor complexity`);
    }
    
    if (frameTime > 33) { // More than 30fps equivalent
      console.warn(`⚠️ High frame time: ${frameTime.toFixed(2)}ms`);
    }
    
    if (memoryUsage > 100) { // More than 100MB
      console.warn(`⚠️ High memory usage: ${memoryUsage.toFixed(2)}MB`);
    }
    
    if (errors > 5) {
      console.warn(`⚠️ Multiple errors detected: ${errors}`);
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }

  getHistory() {
    return [...this.history];
  }

  getAverageFPS() {
    if (this.history.length === 0) return 0;
    
    const totalFPS = this.history.reduce((sum, entry) => sum + entry.fps, 0);
    return Math.round(totalFPS / this.history.length);
  }

  getPerformanceReport() {
    const avgFPS = this.getAverageFPS();
    const recentMetrics = this.history.slice(-10);
    const avgFrameTime = recentMetrics.length > 0 
      ? recentMetrics.reduce((sum, entry) => sum + entry.frameTime, 0) / recentMetrics.length
      : 0;
    
    return {
      current: this.metrics,
      average: {
        fps: avgFPS,
        frameTime: avgFrameTime,
        memoryUsage: this.metrics.memoryUsage
      },
      recommendations: this.getRecommendations()
    };
  }

  getRecommendations() {
    const recommendations = [];
    const { fps, frameTime, memoryUsage } = this.metrics;
    
    if (fps < 45) {
      recommendations.push('Reduce cursor size or complexity');
      recommendations.push('Disable animations temporarily');
      recommendations.push('Check for background processes');
    }
    
    if (frameTime > 25) {
      recommendations.push('Optimize render loop');
      recommendations.push('Reduce model complexity');
    }
    
    if (memoryUsage > 80) {
      recommendations.push('Clear model cache');
      recommendations.push('Reduce texture quality');
    }
    
    return recommendations;
  }

  reset() {
    this.metrics = {
      fps: 0,
      frameTime: 0,
      memoryUsage: 0,
      renderCount: 0,
      loadTime: 0,
      errors: 0
    };
    this.history = [];
    this.frameCount = 0;
  }
}

// Global instance
const cursorPerformanceMonitor = new CursorPerformanceMonitor();

// Performance optimization utilities
export const optimizeCursorPerformance = {
  // Throttle function for mouse events
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Debounce function for size updates
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Frame rate limiter
  limitFrameRate: (callback, targetFPS = 60) => {
    let lastTime = 0;
    const frameInterval = 1000 / targetFPS;
    
    return function(currentTime) {
      if (currentTime - lastTime >= frameInterval) {
        callback(currentTime);
        lastTime = currentTime;
      }
    };
  },

  // Memory cleanup utility
  cleanupMemory: () => {
    // Clear Three.js caches
    if (window.THREE) {
      // Clear texture cache
      if (window.THREE.Cache) {
        window.THREE.Cache.clear();
      }
      
      // Clear geometry cache
      if (window.THREE.GeometryCache) {
        window.THREE.GeometryCache.clear();
      }
    }
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  },

  // Model optimization
  optimizeModel: (model) => {
    if (!model) return;
    
    model.traverse((child) => {
      if (child.isMesh) {
        // Disable frustum culling for cursor
        child.frustumCulled = false;
        
        // Disable auto matrix updates for better performance
        child.matrixAutoUpdate = false;
        child.updateMatrix();
        
        // Optimize geometry
        if (child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
        
        // Optimize materials
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat) {
                mat.needsUpdate = false;
                mat.transparent = false; // Disable transparency if not needed
              }
            });
          } else {
            child.material.needsUpdate = false;
            child.material.transparent = false;
          }
        }
      }
    });
  },

  // Renderer optimization
  optimizeRenderer: (renderer) => {
    if (!renderer) return;
    
    // Performance settings
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false;
    renderer.autoClear = false;
    renderer.sortObjects = false;
    
    // Disable features for better performance
    renderer.info.autoReset = false;
  }
};

export default cursorPerformanceMonitor;
