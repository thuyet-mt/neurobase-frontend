import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useTheme } from '../contexts/ThemeContext';

// Performance constants
const PERFORMANCE_CONFIG = {
  MOUSE_THROTTLE_MS: 16, // ~60fps
  SIZE_UPDATE_THROTTLE_MS: 50,
  RENDER_THROTTLE_MS: 16,
  MIN_SIZE_CHANGE: 10,
  MAX_FPS: 60,
  MEMORY_CLEANUP_INTERVAL: 30000, // 30 seconds
};

// Global model cache to prevent reloading
const modelCache = new Map();
const loaderInstance = new GLTFLoader();

const Cursor3D = ({ size = 150, onOffsetChange }) => {
  // Performance tracking
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(0);
  const frameCountRef = useRef(0);
  const lastFpsCheckRef = useRef(0);
  
  renderCountRef.current += 1;
  
  // Only log every 10th render to reduce console spam
  if (renderCountRef.current % 10 === 0) {
    console.log(`🔄 Cursor3D re-render #${renderCountRef.current} - Size: ${size}`);
  }
  
  const mountRef = useRef(null);
  const { currentMode } = useTheme();
  
  // Optimized state management
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  
  // Enhanced refs with performance tracking
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const animationFrameRef = useRef(null);
  const isInitializedRef = useRef(false);
  const lastSizeRef = useRef(size);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseThrottleRef = useRef(null);
  const memoryCleanupRef = useRef(null);

  // Optimized cursor offset with debouncing
  const [cursorOffset, setCursorOffset] = useState(() => {
    try {
      const saved = localStorage.getItem('cursorOffset');
      return saved ? JSON.parse(saved) : { x: 0.5, y: 0.5 };
    } catch (e) {
      console.warn('Failed to parse saved cursor offset, using defaults');
      return { x: 0.5, y: 0.5 };
    }
  });

  // Highly optimized base scale calculation
  const baseScale = useMemo(() => {
    const minSize = 250;
    const maxSize = 1000;
    const minScale = 0.4;
    const maxScale = 1.2;
    
    const normalizedSize = Math.max(minSize, Math.min(maxSize, size));
    const scale = minScale + ((normalizedSize - minSize) / (maxSize - minSize)) * (maxScale - minScale);
    return scale;
  }, [size]);

  // Optimized model path with caching
  const modelPath = useMemo(() => {
    const paths = {
      dark: '/neuro_core/config/models_3d/hand_robot_dark_v2.glb',
      balance: '/neuro_core/config/models_3d/hand_robot_balance_v2.glb',
      light: '/neuro_core/config/models_3d/hand_robot_light_v2.glb',
    };
    return paths[currentMode] || paths.balance;
  }, [currentMode]);

  // Optimized cursor offset calculation
  const cursorOffsetPixels = useMemo(() => ({
    x: size * cursorOffset.x,
    y: size * cursorOffset.y
  }), [size, cursorOffset.x, cursorOffset.y]);

  // Debounced offset change handler
  const handleOffsetChange = useCallback((newOffset) => {
    setCursorOffset(newOffset);
    
    // Debounce localStorage writes
    if (handleOffsetChange.timeout) {
      clearTimeout(handleOffsetChange.timeout);
    }
    handleOffsetChange.timeout = setTimeout(() => {
      try {
        localStorage.setItem('cursorOffset', JSON.stringify(newOffset));
      } catch (e) {
        console.warn('Failed to save cursor offset to localStorage');
      }
    }, 100);
    
    if (onOffsetChange) {
      onOffsetChange(newOffset);
    }
  }, [onOffsetChange]);

  // Performance monitoring
  const monitorPerformance = useCallback(() => {
    const now = performance.now();
    frameCountRef.current++;
    
    if (now - lastFpsCheckRef.current >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / (now - lastFpsCheckRef.current));
      if (fps < PERFORMANCE_CONFIG.MAX_FPS * 0.8) {
        console.warn(`⚠️ Low FPS detected: ${fps}`);
      }
      frameCountRef.current = 0;
      lastFpsCheckRef.current = now;
    }
  }, []);

  // Optimized render loop with frame limiting
  const renderLoop = useCallback(() => {
    const now = performance.now();
    
    // Frame limiting for consistent performance
    if (now - lastRenderTimeRef.current < (1000 / PERFORMANCE_CONFIG.MAX_FPS)) {
      animationFrameRef.current = requestAnimationFrame(renderLoop);
      return;
    }
    
    lastRenderTimeRef.current = now;
    
    // Update animations
    if (mixerRef.current) {
      const delta = clockRef.current.getDelta();
      mixerRef.current.update(delta);
    }
    
    // Render only if scene exists
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    
    monitorPerformance();
    animationFrameRef.current = requestAnimationFrame(renderLoop);
  }, [monitorPerformance]);

  // Memory cleanup function
  const cleanupMemory = useCallback(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat && mat.dispose());
          } else {
            child.material.dispose && child.material.dispose();
          }
        }
      });
    }
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }, []);

  // Initialize Three.js scene with performance optimizations
  useEffect(() => {
    if (!mountRef.current || isInitializedRef.current) {
      return;
    }
    
    isInitializedRef.current = true;
    console.log('🎯 Initializing optimized 3D cursor scene');

    // Scene setup with performance optimizations
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Optimized camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // High-performance renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disable antialiasing for performance
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
      stencil: false,
      depth: false,
      logarithmicDepthBuffer: false,
      precision: "mediump" // Use medium precision for better performance
    });
    
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio
    renderer.shadowMap.enabled = false; // Disable shadows for performance
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Start optimized render loop
    renderLoop();

    // Setup memory cleanup interval
    memoryCleanupRef.current = setInterval(cleanupMemory, PERFORMANCE_CONFIG.MEMORY_CLEANUP_INTERVAL);

    console.log('✅ Optimized scene initialization complete');

    // Enhanced cleanup function
    return () => {
      console.log('🧹 Cleaning up optimized scene');
      
      // Clear intervals
      if (memoryCleanupRef.current) {
        clearInterval(memoryCleanupRef.current);
      }
      
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Clear mouse throttle
      if (mouseThrottleRef.current) {
        clearTimeout(mouseThrottleRef.current);
      }
      
      // Remove DOM element
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      cleanupMemory();
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }
      
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
      
      isInitializedRef.current = false;
    };
  }, [renderLoop, cleanupMemory]);

  // Optimized model loading with caching
  useEffect(() => {
    if (!sceneRef.current) {
      return;
    }

    console.log('🎯 Loading cursor model with caching:', currentMode);
    
    // Clear existing model
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat && mat.dispose());
          } else {
            child.material.dispose && child.material.dispose();
          }
        }
      });
      modelRef.current = null;
    }
    
    if (mixerRef.current) {
      mixerRef.current = null;
    }

    // Check cache first
    if (modelCache.has(modelPath)) {
      const cachedModel = modelCache.get(modelPath);
      sceneRef.current.add(cachedModel.clone());
      modelRef.current = cachedModel.clone();
      modelRef.current.scale.set(baseScale, baseScale, baseScale);
      setIsLoaded(true);
      return;
    }

    // Load new model
    loaderInstance.load(
      modelPath,
      (gltf) => {
        console.log('✅ Cursor model loaded and cached');
        const model = gltf.scene;
        
        // Optimize model for performance
        model.traverse((child) => {
          if (child.isMesh) {
            child.frustumCulled = false; // Disable frustum culling for cursor
            child.matrixAutoUpdate = false; // Disable auto matrix updates
            child.updateMatrix();
          }
        });
        
        // Cache the model
        modelCache.set(modelPath, model.clone());
        
        // Add to scene
        model.scale.set(baseScale, baseScale, baseScale);
        sceneRef.current.add(model);
        modelRef.current = model;

        // Setup animations if available
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          mixerRef.current = mixer;
          mixerRef.current._action = action;
          
          action.clampWhenFinished = true;
          action.loop = THREE.LoopOnce;
        }

        setIsLoaded(true);
      },
      (progress) => {
        // Only log significant progress
        const percent = (progress.loaded / progress.total * 100);
        if (percent % 25 === 0) {
          console.log('🎯 Loading cursor model:', percent.toFixed(0) + '%');
        }
      },
      (error) => {
        console.error('❌ Error loading cursor model:', error);
        // Create optimized fallback cursor
        const geometry = new THREE.SphereGeometry(0.1, 8, 6);
        const material = new THREE.MeshBasicMaterial({ 
          color: currentMode === 'dark' ? 0xffffff : 0x000000,
          transparent: true,
          opacity: 0.8
        });
        const fallbackModel = new THREE.Mesh(geometry, material);
        sceneRef.current.add(fallbackModel);
        modelRef.current = fallbackModel;
        setIsLoaded(true);
      }
    );
  }, [currentMode, modelPath, baseScale]);

  // Optimized scale updates
  useEffect(() => {
    if (modelRef.current && isLoaded) {
      const targetScale = isHovering ? baseScale * 1.1 : baseScale;
      modelRef.current.scale.set(targetScale, targetScale, targetScale);
    }
  }, [baseScale, isLoaded, isHovering]);

  // Highly optimized renderer size updates
  useEffect(() => {
    if (!rendererRef.current) {
      return;
    }

    const sizeDiff = Math.abs(size - lastSizeRef.current);
    if (sizeDiff < PERFORMANCE_CONFIG.MIN_SIZE_CHANGE) {
      return;
    }

    // Throttle size updates
    if (rendererRef.current.sizeUpdateTimeout) {
      clearTimeout(rendererRef.current.sizeUpdateTimeout);
    }
    
    rendererRef.current.sizeUpdateTimeout = setTimeout(() => {
      rendererRef.current.setSize(size, size);
      lastSizeRef.current = size;
    }, PERFORMANCE_CONFIG.SIZE_UPDATE_THROTTLE_MS);
  }, [size]);

  // Optimized mouse tracking with throttling
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if position actually changed
      if (e.clientX === lastMousePositionRef.current.x && 
          e.clientY === lastMousePositionRef.current.y) {
        return;
      }
      
      // Throttle mouse updates
      if (mouseThrottleRef.current) {
        return;
      }
      
      mouseThrottleRef.current = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
        mouseThrottleRef.current = null;
      }, PERFORMANCE_CONFIG.MOUSE_THROTTLE_MS);
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      if (modelRef.current && !isClicking) {
        modelRef.current.scale.set(baseScale * 1.1, baseScale * 1.1, baseScale * 1.1);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      if (modelRef.current && !isClicking) {
        modelRef.current.scale.set(baseScale, baseScale, baseScale);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (mouseThrottleRef.current) {
        clearTimeout(mouseThrottleRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isLoaded, baseScale, isClicking]);

  // Optimized click handling
  useEffect(() => {
    const handleMouseDown = () => {
      setIsClicking(true);
      if (modelRef.current) {
        const currentScale = isHovering ? baseScale * 1.1 : baseScale;
        modelRef.current.scale.set(currentScale, currentScale, currentScale);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      if (modelRef.current) {
        const targetScale = isHovering ? baseScale * 1.1 : baseScale;
        modelRef.current.scale.set(targetScale, targetScale, targetScale);
      }
      
      // Trigger animation if available
      if (mixerRef.current && mixerRef.current._action) {
        const action = mixerRef.current._action;
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.reset();
        action.play();
        
        // Optimized mesh visibility management
        if (modelRef.current) {
          modelRef.current.traverse((child) => {
            if (child.isMesh) {
              if (child.name.toLowerCase().includes('static') || 
                  child.name.toLowerCase().includes('base') ||
                  child.name.toLowerCase().includes('default')) {
                child.visible = false;
              } else {
                child.visible = true;
              }
            }
          });
        }
        
        // Restore visibility after animation
        const duration = action.getClip().duration || 1;
        setTimeout(() => {
          if (modelRef.current) {
            modelRef.current.traverse((child) => {
              if (child.isMesh) {
                child.visible = true;
              }
            });
          }
        }, duration * 1000);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isLoaded, baseScale, isHovering]);

  // Calibration keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        console.log('🎛️ Calibration shortcut triggered');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Optimized cursor positioning
  const cursorStyle = useMemo(() => ({
    position: 'fixed',
    top: mousePosition.y - cursorOffsetPixels.y,
    left: mousePosition.x - cursorOffsetPixels.x,
    width: `${size}px`,
    height: `${size}px`,
    pointerEvents: 'none',
    zIndex: 9999,
    transition: 'none',
    willChange: 'transform' // Optimize for GPU acceleration
  }), [mousePosition.x, mousePosition.y, cursorOffsetPixels.x, cursorOffsetPixels.y, size]);

  return (
    <div 
      ref={mountRef} 
      style={cursorStyle}
      className="cursor-3d-container"
    />
  );
};

export default Cursor3D; 