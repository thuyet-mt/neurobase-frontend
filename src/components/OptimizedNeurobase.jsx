import React, { useState, useEffect, useCallback, useMemo, Suspense, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import webChannelService from '../services/WebChannelService';
import './Neurobase.css';
import backgroundImg from "../assets/background1.png";

// Lazy load components để cải thiện performance
const MenuButton = React.lazy(() => import("./MenuButton"));
const ModeButton = React.lazy(() => import("./ModeButton"));
const ContainerFrame = React.lazy(() => import("./ContainerFrame"));
const ContainerFrameMenu = React.lazy(() => import("./ContainerFrame"));
const ContainerFramePB = React.lazy(() => import("./ContainerFrame"));
const GoldenButton = React.lazy(() => import("./GoldenButton"));
const ProgressBar = React.lazy(() => import("./ProgressBar"));
const BackButton = React.lazy(() => import("./BackButton"));

// Lazy load 3D components
const Canvas = React.lazy(() => import('@react-three/fiber').then(module => ({ default: module.Canvas })));
const OptimizedLogo3D = React.lazy(() => import("./OptimizedLogo3D"));

// Icons - preload để tránh re-render
import ArchivesIcon from "../assets/archives_icon.svg";
import TelephoneIcon from "../assets/telephone_icon.svg";
import AccueilIcon from "../assets/accueil_icon.svg";
import ReunionIcon from "../assets/reunion_icon.svg";
import CommandesIcon from "../assets/commandes_icon.svg";
import EmailsIcon from "../assets/email_icon.svg";
import AgendaIcon from "../assets/agenda_icon.svg";
import ColisIcon from "../assets/colis_icon.svg";
import BackIcon from "../assets/back_icon.svg";

// Performance optimized debounce
const useDebounce = (func, wait) => {
  const timeoutRef = useRef();
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => func(...args), wait);
  }, [func, wait]);
};

// Memoized button component để tránh re-render không cần thiết
const MemoizedGoldenButton = React.memo(({ 
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
));

// Performance optimized loading component
const LoadingSpinner = () => (
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

export default function OptimizedNeurobase({ progressValue = 35, onProgressChange = () => {} }) {
  const { currentMode } = useTheme();
  const { getText, getTextWithParams, loading, error } = useLanguage();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isWebChannelReady, setIsWebChannelReady] = useState(false);
  const [backgroundScale, setBackgroundScale] = useState(0.7);
  const [isZooming, setIsZooming] = useState(false);

  // Memoized theme styles để tránh re-calculate
  const themeStyles = useMemo(() => {
    switch (currentMode) {
      case 'light':
        return { background: '#E4DAC2', filter: 'none' };
      case 'dark':
        return { background: '#030303', filter: 'none' };
      case 'balance':
        return { background: '#615637', filter: 'none' };
      default:
        return {};
    }
  }, [currentMode]);

  // Memoized responsive text style
  const getResponsiveTextStyle = useCallback((baseSize = 23) => ({
    fontFamily: 'Open Sans',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: `clamp(${Math.max(10, baseSize * 0.6)}px, ${Math.max(1.5, baseSize * 0.1)}vw, ${baseSize}px)`,
    lineHeight: '100%',
    letterSpacing: '0%',
    textAlign: 'center',
    color: '#4E3117',
    textTransform: 'none'
  }), []);

  // Optimized WebChannel initialization
  useEffect(() => {
    let mounted = true;
    
    const initializeWebChannel = async () => {
      try {
        await webChannelService.initialize();
        if (mounted) {
          setIsWebChannelReady(true);
          console.log('✅ WebChannel ready for use');
        }
      } catch (error) {
        if (mounted) {
          console.error('❌ Failed to initialize WebChannel:', error);
          setIsWebChannelReady(false);
        }
      }
    };

    initializeWebChannel();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Optimized notification system
  const showNotificationWithMessage = useCallback((message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  }, []);

  // Optimized slot calling with better error handling
  const callSlotWithNotification = useCallback(async (slotMethod, successMessage, errorMessage) => {
    try {
      if (!isWebChannelReady) {
        throw new Error('WebChannel not ready');
      }
      
      await slotMethod();
      showNotificationWithMessage(successMessage);
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
          return;
        } catch (retryError) {
          console.error('Retry failed:', retryError);
        }
      }
      
      showNotificationWithMessage(errorMessage || 'Action failed');
    }
  }, [isWebChannelReady, showNotificationWithMessage]);

  // Optimized button handlers với debounce
  const createButtonHandler = useCallback((slotMethod, successKey, errorKey) => {
    return useDebounce(() => {
      callSlotWithNotification(
        slotMethod,
        getText(successKey),
        getText(errorKey)
      );
    }, 100);
  }, [callSlotWithNotification, getText]);

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

  // Optimized progress change handler
  const handleProgressChange = useCallback((newValue) => {
    onProgressChange(newValue);
    
    callSlotWithNotification(
      () => webChannelService.updateProgress(newValue),
      getTextWithParams("progress_updated", { value: Math.round(newValue) }),
      getText("progress_failed")
    );
  }, [onProgressChange, callSlotWithNotification, getTextWithParams, getText]);

  // Optimized wheel handler với throttling
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    if (isZooming) return;
    
    setIsZooming(true);
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.3, Math.min(2.5, backgroundScale + delta));
    
    setBackgroundScale(newScale);
    
    setTimeout(() => setIsZooming(false), 100);
  }, [backgroundScale, isZooming]);

  // Memoized button configurations
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
    return <LoadingSpinner />;
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
      {/* Optimized background rendering */}
      <div className="neurobase-bg" />
      <div className="neurobase-image-bg">
        <img 
          src={backgroundImg} 
          alt="background" 
          style={{
            transform: `scale(${backgroundScale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      {/* Optimized 3D Logo with Suspense */}
      <div className="neurobase-logo">
        <Suspense fallback={<div style={{ width: '100%', height: '100%', background: 'transparent' }} />}>
          <Canvas>
            <OptimizedLogo3D
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

      {/* Optimized Menu Button */}
      <Suspense fallback={<div />}>
        <MenuButton onClick={handleMenuButtonClick} tooltip="tooltip_menu_button" />
      </Suspense>

      {/* Optimized buttons rendering */}
      {buttonConfigs.map((config, index) => (
        <div key={config.className} className={config.className}>
          <Suspense fallback={<div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)' }} />}>
            <MemoizedGoldenButton
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
                  gap: '10px'
                }}>
                  <img src={config.icon} alt="logo"/>
                  <div style={getResponsiveTextStyle(23)}>
                    {config.text}
                  </div>
                </div>
              }
            />
          </Suspense>
        </div>
      ))}

      {/* Optimized Progress Bar */}
      <Suspense fallback={<div />}>
        <ContainerFramePB>
          <ProgressBar 
            value={progressValue} 
            onChange={handleProgressChange}
            theme={currentMode}
          />
        </ContainerFramePB>
      </Suspense>

      {/* Optimized Mode Button */}
      <Suspense fallback={<div />}>
        <ModeButton 
          currentMode={currentMode}
          onModeChange={handleModeButtonClick}
        />
      </Suspense>

      {/* Optimized Back Button */}
      <Suspense fallback={<div />}>
        <BackButton onClick={handleBackButtonClick} tooltip="tooltip_back_button" />
      </Suspense>

      {/* Notification System */}
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "15px 20px",
            borderRadius: "8px",
            zIndex: 10000,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            animation: "slideDown 0.3s ease-out",
          }}
        >
          {notificationMessage}
        </div>
      )}

      {/* Benchmark Panel */}
      <Suspense fallback={<div />}>
        <BenchmarkPanel />
      </Suspense>
    </div>
  );
}
