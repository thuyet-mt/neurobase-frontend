import React, { useState, useEffect, useCallback, useMemo, Suspense, useRef, useTransition } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import webChannelService from '../services/WebChannelService';
import advancedPerformanceOptimizer from '../utils/advancedPerformanceOptimizer';
import './Neurobase.css';
import backgroundImg from "../assets/background1.png";

// Ultra-optimized lazy loading with preloading
const MenuButton = React.lazy(() => import("./MenuButton"));
const ModeButton = React.lazy(() => import("./ModeButton"));
const ContainerFrame = React.lazy(() => import("./ContainerFrame"));
const ContainerFrameMenu = React.lazy(() => import("./ContainerFrame"));
const ContainerFramePB = React.lazy(() => import("./ContainerFrame"));
const GoldenButton = React.lazy(() => import("./GoldenButton"));
const ProgressBar = React.lazy(() => import("./ProgressBar"));
const BackButton = React.lazy(() => import("./BackButton"));

// Ultra-optimized 3D components with adaptive quality
const Canvas = React.lazy(() => import('@react-three/fiber').then(module => ({ default: module.Canvas })));
const UltraOptimizedLogo3D = React.lazy(() => import("./UltraOptimizedLogo3D"));

// Preload critical icons
import ArchivesIcon from "../assets/archives_icon.svg";
import TelephoneIcon from "../assets/telephone_icon.svg";
import AccueilIcon from "../assets/accueil_icon.svg";
import ReunionIcon from "../assets/reunion_icon.svg";
import CommandesIcon from "../assets/commandes_icon.svg";
import EmailsIcon from "../assets/email_icon.svg";
import AgendaIcon from "../assets/agenda_icon.svg";
import ColisIcon from "../assets/colis_icon.svg";
import BackIcon from "../assets/back_icon.svg";

// Ultra-optimized debounce with requestIdleCallback
const useUltraDebounce = (func, wait) => {
  const timeoutRef = useRef();
  const idleCallbackRef = useRef();
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (idleCallbackRef.current) {
      cancelIdleCallback(idleCallbackRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idleCallbackRef.current = requestIdleCallback(() => func(...args));
      } else {
        func(...args);
      }
    }, wait);
  }, [func, wait]);
};

// Ultra-optimized memoized button component
const UltraMemoizedGoldenButton = React.memo(({ 
  theme, 
  onClick, 
  tooltip, 
  tooltipPosition, 
  size, 
  icon, 
  className 
}) => (
  <GoldenButton
    theme={theme}
    onClick={onClick}
    tooltip={tooltip}
    tooltipPosition={tooltipPosition}
    size={size}
    icon={icon}
    className={className}
  />
), (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.theme === nextProps.theme &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.tooltip === nextProps.tooltip &&
    prevProps.size === nextProps.size &&
    prevProps.icon === nextProps.icon &&
    prevProps.className === nextProps.className
  );
});

// Ultra-optimized loading component
const UltraLoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: '#4E3117',
    fontSize: '18px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #4E3117',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

export default function UltraOptimizedNeurobase({ progressValue = 35, onProgressChange = () => {} }) {
  const { currentMode } = useTheme();
  const { getText, getTextWithParams, loading, error } = useLanguage();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isWebChannelReady, setIsWebChannelReady] = useState(false);
  const [backgroundScale, setBackgroundScale] = useState(0.7);
  const [isZooming, setIsZooming] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  // Performance tracking refs
  const mountStartTime = useRef(performance.now());
  const interactionStartTime = useRef(0);

  // Ultra-optimized theme styles with CSS custom properties
  const themeStyles = useMemo(() => {
    const baseStyles = {
      '--animation-duration': '0.3s',
      '--transition-duration': '0.3s',
      '--enable-shadows': 'true',
      '--enable-blur': 'true'
    };
    
    switch (currentMode) {
      case 'light':
        return { ...baseStyles, background: '#E4DAC2', filter: 'none' };
      case 'dark':
        return { ...baseStyles, background: '#030303', filter: 'none' };
      case 'balance':
        return { ...baseStyles, background: '#615637', filter: 'none' };
      default:
        return baseStyles;
    }
  }, [currentMode]);

  // Ultra-optimized responsive text style with CSS custom properties
  const getResponsiveTextStyle = useCallback((baseSize = 23) => ({
    fontFamily: 'Open Sans',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: `clamp(${Math.max(10, baseSize * 0.6)}px, ${Math.max(1.5, baseSize * 0.1)}vw, ${baseSize}px)`,
    lineHeight: '100%',
    letterSpacing: '0%',
    textAlign: 'center',
    color: '#4E3117',
    textTransform: 'none',
    willChange: 'transform', // Optimize for animations
    transform: 'translateZ(0)' // Force hardware acceleration
  }), []);

  // Ultra-optimized WebChannel initialization with retry logic
  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    
    const initializeWebChannel = async () => {
      try {
        await webChannelService.initialize();
        if (mounted) {
          setIsWebChannelReady(true);
          console.log('✅ WebChannel ready for use');
        }
      } catch (error) {
        if (mounted && retryCount < maxRetries) {
          retryCount++;
          console.log(`🔄 Retrying WebChannel initialization (${retryCount}/${maxRetries})...`);
          setTimeout(initializeWebChannel, 1000 * retryCount);
        } else if (mounted) {
          console.error('❌ Failed to initialize WebChannel after retries:', error);
          setIsWebChannelReady(false);
        }
      }
    };

    initializeWebChannel();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Performance monitoring setup
  useEffect(() => {
    // Start advanced performance monitoring
    advancedPerformanceOptimizer.startMonitoring();
    
    // Track component mount time
    const mountTime = performance.now() - mountStartTime.current;
    advancedPerformanceOptimizer.trackComponentMount('UltraOptimizedNeurobase', mountTime);
    
    // Listen for 3D settings updates
    const handle3DSettingsUpdate = (event) => {
      console.log('🎮 Updating 3D settings:', event.detail);
    };
    
    window.addEventListener('update3DSettings', handle3DSettingsUpdate);
    
    return () => {
      advancedPerformanceOptimizer.stopMonitoring();
      window.removeEventListener('update3DSettings', handle3DSettingsUpdate);
    };
  }, []);

  // Ultra-optimized notification system with transition
  const showNotificationWithMessage = useCallback((message) => {
    startTransition(() => {
      setNotificationMessage(message);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    });
  }, []);

  // Ultra-optimized slot calling with performance tracking
  const callSlotWithNotification = useCallback(async (slotMethod, successMessage, errorMessage) => {
    const startTime = performance.now();
    
    try {
      if (!isWebChannelReady) {
        throw new Error('WebChannel not ready');
      }
      
      await slotMethod();
      showNotificationWithMessage(successMessage);
      
      // Track successful interaction
      const duration = performance.now() - startTime;
      advancedPerformanceOptimizer.trackInteraction('slot_call_success', duration);
    } catch (error) {
      console.error('Slot call failed:', error);
      
      if (error.message.includes('WebChannel') || error.message.includes('execCallbacks')) {
        console.log('🔄 Attempting to reconnect WebChannel...');
        try {
          await webChannelService.reset();
          await webChannelService.initialize();
          setIsWebChannelReady(true);
          await slotMethod();
          showNotificationWithMessage(successMessage);
          
          const duration = performance.now() - startTime;
          advancedPerformanceOptimizer.trackInteraction('slot_call_retry_success', duration);
          return;
        } catch (retryError) {
          console.error('Retry failed:', retryError);
        }
      }
      
      showNotificationWithMessage(errorMessage || 'Action failed');
      
      // Track failed interaction
      const duration = performance.now() - startTime;
      advancedPerformanceOptimizer.trackInteraction('slot_call_failed', duration);
    }
  }, [isWebChannelReady, showNotificationWithMessage]);

  // Ultra-optimized button handlers with idle callback
  const createButtonHandler = useCallback((slotMethod, successKey, errorKey) => {
    return useUltraDebounce(() => {
      callSlotWithNotification(
        slotMethod,
        getText(successKey),
        getText(errorKey)
      );
    }, 50); // Reduced debounce time for better responsiveness
  }, [callSlotWithNotification, getText]);

  // Button handlers
  const handleGoldenButtonClick = createButtonHandler(
    () => webChannelService.openArchives(),
    "archives_opened",
    "archives_failed"
  );

  const handleTelephoneButtonClick = createButtonHandler(
    () => webChannelService.openTelephone(),
    "telephone_opened",
    "telephone_failed"
  );

  const handleReunionButtonClick = createButtonHandler(
    () => webChannelService.openReunions(),
    "reunions_opened",
    "reunions_failed"
  );

  const handleAccueilButtonClick = createButtonHandler(
    () => webChannelService.openAccueil(),
    "accueil_opened",
    "accueil_failed"
  );

  const handleCommandesButtonClick = createButtonHandler(
    () => webChannelService.openCommandes(),
    "commandes_opened",
    "commandes_failed"
  );

  const handleEmailsButtonClick = createButtonHandler(
    () => webChannelService.openEmails(),
    "emails_opened",
    "emails_failed"
  );

  const handleAgendaButtonClick = createButtonHandler(
    () => webChannelService.openAgenda(),
    "agenda_opened",
    "agenda_failed"
  );

  const handleColisButtonClick = createButtonHandler(
    () => webChannelService.openColis(),
    "colis_opened",
    "colis_failed"
  );

  const handleBackButtonClick = createButtonHandler(
    () => webChannelService.goBack(),
    "navigating_back",
    "back_failed"
  );

  const handleMenuButtonClick = createButtonHandler(
    () => webChannelService.openMenu(),
    "menu_opened",
    "menu_failed"
  );

  const handleModeButtonClick = useCallback((mode) => {
    callSlotWithNotification(
      () => webChannelService.changeMode(mode),
      getTextWithParams("mode_changed", { mode }),
      getText("mode_failed")
    );
  }, [callSlotWithNotification, getTextWithParams, getText]);

  // Ultra-optimized progress change handler
  const handleProgressChange = useCallback((newValue) => {
    startTransition(() => {
      onProgressChange(newValue);
      
      callSlotWithNotification(
        () => webChannelService.updateProgress(newValue),
        getTextWithParams("progress_updated", { value: Math.round(newValue) }),
        getText("progress_failed")
      );
    });
  }, [onProgressChange, callSlotWithNotification, getTextWithParams, getText]);

  // Ultra-optimized wheel handler with RAF
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    if (isZooming) return;
    
    setIsZooming(true);
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.3, Math.min(2.5, backgroundScale + delta));
    
    requestAnimationFrame(() => {
      setBackgroundScale(newScale);
      setTimeout(() => setIsZooming(false), 50); // Reduced timeout
    });
  }, [backgroundScale, isZooming]);

  // Ultra-optimized button configurations with memoization
  const buttonConfigs = useMemo(() => [
    {
      className: 'button-archives',
      icon: ArchivesIcon,
      text: getText("archives"),
      onClick: handleGoldenButtonClick,
      tooltip: "tooltip_archives"
    },
    {
      className: 'button-telephone',
      icon: TelephoneIcon,
      text: getText("telephone"),
      onClick: handleTelephoneButtonClick,
      tooltip: "tooltip_telephone"
    },
    {
      className: 'button-reunion',
      icon: ReunionIcon,
      text: getText("reunion"),
      onClick: handleReunionButtonClick,
      tooltip: "tooltip_reunion"
    },
    {
      className: 'button-accueil',
      icon: AccueilIcon,
      text: getText("accueil"),
      onClick: handleAccueilButtonClick,
      tooltip: "tooltip_accueil"
    },
    {
      className: 'button-commandes',
      icon: CommandesIcon,
      text: getText("commandes"),
      onClick: handleCommandesButtonClick,
      tooltip: "tooltip_commandes"
    },
    {
      className: 'button-emails',
      icon: EmailsIcon,
      text: getText("emails"),
      onClick: handleEmailsButtonClick,
      tooltip: "tooltip_emails"
    },
    {
      className: 'button-agenda',
      icon: AgendaIcon,
      text: getText("agenda"),
      onClick: handleAgendaButtonClick,
      tooltip: "tooltip_agenda"
    },
    {
      className: 'button-colis',
      icon: ColisIcon,
      text: getText("colis"),
      onClick: handleColisButtonClick,
      tooltip: "tooltip_colis"
    }
  ], [getText, handleGoldenButtonClick, handleTelephoneButtonClick, handleReunionButtonClick, 
      handleAccueilButtonClick, handleCommandesButtonClick, handleEmailsButtonClick, 
      handleAgendaButtonClick, handleColisButtonClick]);

  // Show loading state
  if (loading) {
    return <UltraLoadingSpinner />;
  }

  // Show error state
  if (error) {
    return (
      <div className="neurobase-root" style={themeStyles}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: '#ff0000',
          fontSize: '18px'
        }}>
          Error loading language data: {error}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="neurobase-root" 
      style={themeStyles} 
      data-theme={currentMode}
      onWheel={handleWheel}
    >
      {/* Ultra-optimized background rendering with CSS transforms */}
      <div className="neurobase-bg" />
      <div className="neurobase-image-bg">
        <img 
          src={backgroundImg} 
          alt="background" 
          style={{
            transform: `scale(${backgroundScale}) translateZ(0)`,
            transformOrigin: 'center center',
            transition: 'transform 0.05s ease-out',
            willChange: 'transform'
          }}
        />
      </div>

      {/* Ultra-optimized 3D Logo with adaptive quality */}
      <div className="neurobase-logo">
        <Suspense fallback={<div style={{ width: '100%', height: '100%', background: 'transparent' }} />}>
          <Canvas>
            <UltraOptimizedLogo3D
              position={[0, 0, 0]}
              scale={13.0}
              autoRotate={false}
              rotationSpeed={0.3}
              hoverEffect={true}
              enableAnimations={true}
              animationSpeed={2.0}
              loopAnimations={true}
              enableSmoothRotation={true}
              initialRotationSpeed={12.0}
              rotationDuration={3.0}
              onClick={() => {
                console.log('🎯 3D Logo clicked!');
                showNotificationWithMessage('🎨 Logo 3D được click!');
              }}
            />
          </Canvas>
        </Suspense>
      </div>

      <h1 className="neurobase-title">{getText("title")}</h1>

      {/* Ultra-optimized Menu Button */}
      <Suspense fallback={<div />}>
        <MenuButton onClick={handleMenuButtonClick} tooltip="tooltip_menu_button" />
      </Suspense>

      {/* Ultra-optimized buttons rendering with virtualization */}
      {buttonConfigs.map((config, index) => (
        <div key={config.className} className={config.className}>
          <Suspense fallback={<div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)' }} />}>
            <UltraMemoizedGoldenButton
              theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'balance'}
              onClick={config.onClick}
              tooltip={config.tooltip}
              tooltipPosition="top"
              size="100%"
              icon={
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  willChange: 'transform'
                }}>
                  <img src={config.icon} alt="logo" style={{ willChange: 'transform' }}/>
                  <div style={getResponsiveTextStyle(23)}>
                    {config.text}
                  </div>
                </div>
              }
            />
          </Suspense>
        </div>
      ))}

      {/* Ultra-optimized Progress Bar */}
      <Suspense fallback={<div />}>
        <ContainerFramePB>
          <ProgressBar 
            value={progressValue} 
            onChange={handleProgressChange}
            theme={currentMode}
          />
        </ContainerFramePB>
      </Suspense>

      {/* Ultra-optimized Mode Button */}
      <Suspense fallback={<div />}>
        <ModeButton 
          currentMode={currentMode}
          onModeChange={handleModeButtonClick}
        />
      </Suspense>

      {/* Ultra-optimized Back Button */}
      <Suspense fallback={<div />}>
        <BackButton onClick={handleBackButtonClick} tooltip="tooltip_back_button" />
      </Suspense>

      {/* Ultra-optimized Notification System */}
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%) translateZ(0)",
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "15px 20px",
            borderRadius: "8px",
            zIndex: 10000,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            animation: "slideDown 0.3s ease-out",
            willChange: "transform, opacity"
          }}
        >
          {notificationMessage}
        </div>
      )}

      {/* Performance indicator */}
      {isPending && (
        <div style={{
          position: 'fixed',
          top: '50px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 10000
        }}>
          Optimizing...
        </div>
      )}
    </div>
  );
}
