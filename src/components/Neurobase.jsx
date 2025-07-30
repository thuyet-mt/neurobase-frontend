import React, { useState, useEffect } from "react";
import "./Neurobase.css";
import backgroundImg from "../assets/background1.png";
import logoImg from "../assets/logo_neuro.png";
import MenuButton from "./MenuButton";
import ModeButton from "./ModeButton";
// Components ContainerFrame for ProgressBar
import ContainerFramePB from "./ContainerFrame";
// Components ContainerFrame for Menu
import ContainerFrameMenu from "./ContainerFrame";
import GoldenButton from "./GoldenButton";
import ProgressBar from "./ProgressBar";
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
// import Logo from "../assets/archives_icon.png";
import ArchivesIcon from "../assets/archives_icon.svg";
import TelephoneIcon from "../assets/telephone_icon.svg";
import AccueilIcon from "../assets/accueil_icon.svg"
import ReunionIcon from "../assets/reunion_icon.svg"
import CommandesIcon from "../assets/commandes_icon.svg"
import EmailsIcon from "../assets/email_icon.svg"
import AgendaIcon from "../assets/agenda_icon.svg"
import ColisIcon from "../assets/colis_icon.svg"
import BackButton from "./BackButton";
import BackIcon from "../assets/back_icon.svg";
// Import WebChannel Service
import webChannelService from '../services/WebChannelService';

export default function Neurobase() {
  const { currentMode } = useTheme();
  const { getText, getTextWithParams, loading, error } = useLanguage();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [progressValue, setProgressValue] = useState(35); // Initial value at 35%
  const [isWebChannelReady, setIsWebChannelReady] = useState(false);

  // Khởi tạo WebChannel khi component mount
  useEffect(() => {
    const initializeWebChannel = async () => {
      try {
        await webChannelService.initialize();
        setIsWebChannelReady(true);
        console.log('✅ WebChannel ready for use');
      } catch (error) {
        console.error('❌ Failed to initialize WebChannel:', error);
        setIsWebChannelReady(false);
      }
    };

    initializeWebChannel();
  }, []);

  // Helper function để hiển thị notification
  const showNotificationWithMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Helper function để gọi slot với error handling
  const callSlotWithNotification = async (slotMethod, successMessage, errorMessage) => {
    try {
      await slotMethod();
      showNotificationWithMessage(successMessage);
    } catch (error) {
      console.error('Slot call failed:', error);
      showNotificationWithMessage(errorMessage || 'Action failed');
    }
  };

  // Theme-based styling for main container
  const getThemeStyles = () => {
    switch (currentMode) {
      case 'light':
        return {
          background: '#E4DAC2',
          filter: 'none'
        };
      case 'dark':
        return {
          background: '#030303',
          filter: 'none'
        };
      case 'balance':
        return {
          background: '#615637',
          filter: 'none'
        };
      default:
        return {};
    }
  };

  // === Handler functions với WebChannel integration ===

  const handleGoldenButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openArchives(),
      getText("archives_opened"),
      getText("archives_failed")
    );
  };

  const handleTelephoneButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openTelephone(),
      getText("telephone_opened"),
      getText("telephone_failed")
    );
  };

  const handleReunionButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openReunions(),
      getText("reunions_opened"),
      getText("reunions_failed")
    );
  };

  const handleAccueilButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openAccueil(),
      getText("accueil_opened"),
      getText("accueil_failed")
    );
  };

  const handleCommandesButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openCommandes(),
      getText("commandes_opened"),
      getText("commandes_failed")
    );
  };

  const handleEmailsButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openEmails(),
      getText("emails_opened"),
      getText("emails_failed")
    );
  };

  const handleAgendaButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openAgenda(),
      getText("agenda_opened"),
      getText("agenda_failed")
    );
  };

  const handleColisButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openColis(),
      getText("colis_opened"),
      getText("colis_failed")
    );
  };

  const handleBackButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.goBack(),
      getText("navigating_back"),
      getText("back_failed")
    );
  };

  const handleProgressChange = (newValue) => {
    setProgressValue(newValue);
    
    // Gọi slot để cập nhật progress
    callSlotWithNotification(
      () => webChannelService.updateProgress(newValue),
      getTextWithParams("progress_updated", { value: Math.round(newValue) }),
      getText("progress_failed")
    );
  };

  // === Additional handlers cho Menu và Mode buttons ===
  
  const handleMenuButtonClick = () => {
    callSlotWithNotification(
      () => webChannelService.openMenu(),
      getText("menu_opened"),
      getText("menu_failed")
    );
  };

  const handleModeButtonClick = (mode) => {
    callSlotWithNotification(
      () => webChannelService.changeMode(mode),
      getTextWithParams("mode_changed", { mode }),
      getText("mode_failed")
    );
  };

  // === Test Handlers ===
  
  const handleTestClose = () => {
    callSlotWithNotification(
      () => webChannelService.testCloseWindow(),
      getText("testing_close"),
      getText("test_failed")
    );
  };

  // Responsive text styles helper
  const getResponsiveTextStyle = (baseSize = 23) => ({
    fontFamily: 'Open Sans',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: `clamp(${Math.max(10, baseSize * 0.6)}px, ${Math.max(1.5, baseSize * 0.1)}vw, ${baseSize}px)`,
    lineHeight: '100%',
    letterSpacing: '0%',
    textAlign: 'center',
    color: '#4E3117',
    textTransform: 'none'
  });

  // Show loading state if language data is still loading
  if (loading) {
    return (
      <div className="neurobase-root" style={getThemeStyles()}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: '#4E3117',
          fontSize: '18px'
        }}>
          Loading language data...
        </div>
      </div>
    );
  }

  // Show error state if language loading failed
  if (error) {
    return (
      <div className="neurobase-root" style={getThemeStyles()}>
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
    <div className="neurobase-root" style={getThemeStyles()}>
      <div className="neurobase-bg" />
      <div className="neurobase-image-bg">
        <img src={backgroundImg} alt="background" />
      </div>
      <div className="neurobase-logo">
        <img src={logoImg} alt="logo" />
      </div>
      <h1 className="neurobase-title">{getText("title")}</h1>
      {/* Menu Button ở góc trên bên phải */}
      <MenuButton onClick={handleMenuButtonClick} />
      {/* Back Button */}
      {/* <BackButton tooltip="Quay lại" onClick={handleBackButtonClick} /> */}
      <BackButton 
        theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'balance'}
        onClick={handleBackButtonClick}
        tooltip={getText("back")}
        icon={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <img src={BackIcon} alt="logo"/>
            <div style={{
              ...getResponsiveTextStyle(23),
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center'
            }}>
              {getText("back")}
            </div>          
          </div>
        }
      />
      
      {/* Archives Button với vị trí tương đối so với Menu Container Frame */}
      <div className="button-archives">
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleGoldenButtonClick}
          tooltip="Golden Button - Click me! ✨"
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
              <img src={ArchivesIcon} alt="logo"/>
              <div style={getResponsiveTextStyle(23)}>
                {getText("archives")}
              </div>
            </div>
          }
        />
      </div>

      {/* Telephone Button */}
      <div className="button-telephone">
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleTelephoneButtonClick}
          tooltip="Telephone Button - Click me! 📞"
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
              <img src={TelephoneIcon} alt="logo"/>
              <div style={getResponsiveTextStyle(23)}>
                {getText("telephone")}
              </div>
            </div>
          }
        />
      </div>

      {/* Reunion Button */}
      <div className="button-reunion">
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleReunionButtonClick}
          tooltip="Reunion Button - Click me! 👥"
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
              <img src={ReunionIcon} alt="logo"/>
              <div style={getResponsiveTextStyle(23)}>
                {getText("reunions")}
              </div>
            </div>
          }
        />
      </div>

      {/* Accueil Button */}
      <div className="button-accueil">
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleAccueilButtonClick}
          tooltip="Accueil Button - Click me! 🏠"
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
              <img src={AccueilIcon} alt="logo"/>
              <div style={getResponsiveTextStyle(23)}>
                {getText("accueil")}
              </div>
            </div>
          }
        />
      </div>

      {/* Commandes Button */}
      <div className="button-commandes">
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleCommandesButtonClick}
          tooltip="Commandes Button - Click me! 📋"
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
              <img src={CommandesIcon} alt="logo"/>
              <div style={getResponsiveTextStyle(23)}>
                {getText("commandes")}
              </div>
            </div>
          }
        />
      </div>

      {/* Emails Button */}
      <div className="button-emails">
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleEmailsButtonClick}
          tooltip="Emails Button - Click me! 📧"
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
              <img src={EmailsIcon} alt="logo"/>
              <div style={getResponsiveTextStyle(23)}>
                {getText("emails")}
              </div>
            </div>
          }
        />
      </div>

      {/* Agenda Button */}
      <div className="button-agenda">
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleAgendaButtonClick}
          tooltip="Agenda Button - Click me! 📅"
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
              <img src={AgendaIcon} alt="logo"/>
              <div style={getResponsiveTextStyle(23)}>
                {getText("agenda")}
              </div>
            </div>
          }
        />
      </div>

      {/* Colis Button */}
      <div className="button-colis">
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleColisButtonClick}
          tooltip="Colis Button - Click me! 📦"
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
              <img src={ColisIcon} alt="logo"/>
              <div style={getResponsiveTextStyle(23)}>
                {getText("colis")}
              </div>
            </div>
          }
        />
      </div>
      
      {/* Container Frame để chứa các component */}
      <div className="button-mode">
        <ModeButton
          size={80}
          tooltip="Switch Theme Mode"
          tooltipPosition="top"
          onModeChange={handleModeButtonClick}
        />
      </div>
      <ContainerFramePB>
        {/* Text indicator để xác nhận ContainerFrame */}
        {/* <div style={{ color: 'black', fontSize: '12px' }}>ContainerFrame Active</div> */}
        
        {/* ProgressBar Component */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <ProgressBar 
            value={progressValue}
            onChange={handleProgressChange}
            min={0}
            max={100}
            text={getText("adjust_cursor_size")}
          />
        </div>
        
        {/* ModeButton với vị trí tương đối */}
        {/* FunctionButton */}
        {/* Ví dụ thêm các component khác:
        <SomeOtherComponent />
        <AnotherComponent />
        <ModeButton/>
        */}
      </ContainerFramePB>
      
      {/* Menu Container Frame với kích thước responsive */}
      <ContainerFrameMenu
        style={{
          position: 'absolute',
          width: 'clamp(600px, 60vw, 840px)',
          height: 'clamp(600px, 60vw, 840px)',
          left: 'calc(50% - clamp(600px, 60vw, 840px)/2)',
          top: 'calc(50% - clamp(600px, 60vw, 840px)/2 + clamp(40px, 4vw, 68px))',
          zIndex: 5
        }}
      >
        {/* Text indicator để xác nhận Menu ContainerFrame */}
        {/* <div style={{ 
          color: 'black', 
          fontSize: '16px', 
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
          padding: '20px'
        }}>
          Menu Container Frame (840x840px)
        </div> */}
        {/* Có thể thêm các component menu ở đây */}
      </ContainerFrameMenu>
      
      {/* Thông báo popup */}
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-content">
            <span className="notification-message">{notificationMessage}</span>
            <button 
              className="notification-close"
              onClick={() => setShowNotification(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}