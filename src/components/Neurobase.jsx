import React, { useState } from "react";
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

export default function Neurobase() {
  const { currentMode } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [progressValue, setProgressValue] = useState(35); // Initial value at 35%
  
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

  const handleGoldenButtonClick = () => {
    // Hiển thị thông báo
    setNotificationMessage("Golden Button đã được kích hoạt! ✨");
    setShowNotification(true);
    
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    
    console.log("GoldenButton clicked!");
  };

  const handleTelephoneButtonClick = () => {
    setNotificationMessage("Telephone Button đã được kích hoạt! 📞");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    console.log("TelephoneButton clicked!");
  };

  const handleReunionButtonClick = () => {
    setNotificationMessage("Reunion Button đã được kích hoạt! 👥");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    console.log("ReunionButton clicked!");
  };

  const handleAccueilButtonClick = () => {
    setNotificationMessage("Accueil Button đã được kích hoạt! 🏠");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    console.log("AccueilButton clicked!");
  };

  const handleCommandesButtonClick = () => {
    setNotificationMessage("Commandes Button đã được kích hoạt! 📋");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    console.log("CommandesButton clicked!");
  };

  const handleEmailsButtonClick = () => {
    setNotificationMessage("Emails Button đã được kích hoạt! 📧");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    console.log("EmailsButton clicked!");
  };

  const handleAgendaButtonClick = () => {
    setNotificationMessage("Agenda Button đã được kích hoạt! 📅");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    console.log("AgendaButton clicked!");
  };

  const handleColisButtonClick = () => {
    setNotificationMessage("Colis Button đã được kích hoạt! 📦");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    console.log("ColisButton clicked!");
  };

  const handleBackButtonClick = () => {
    // Hiển thị thông báo
    setNotificationMessage("Back Button đã được kích hoạt! ⬅️");
    setShowNotification(true);
    
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    
    console.log("BackButton clicked!");
  };

  const handleProgressChange = (newValue) => {
    setProgressValue(newValue);
    setNotificationMessage(`Progress: ${Math.round(newValue)}% 📊`);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
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

  return (
    <div className="neurobase-root" style={getThemeStyles()}>
      <div className="neurobase-bg" />
      <div className="neurobase-image-bg">
        <img src={backgroundImg} alt="background" />
      </div>
      <div className="neurobase-logo">
        <img src={logoImg} alt="logo" />
      </div>
      <h1 className="neurobase-title">NEUROBASE</h1>
      {/* Menu Button ở góc trên bên phải */}
      <MenuButton />
      {/* Back Button */}
      {/* <BackButton tooltip="Quay lại" onClick={handleBackButtonClick} /> */}
      <BackButton 
        theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'balance'}
        onClick={handleBackButtonClick}
        tooltip="Back button"
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
              RETOUR
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
                ARCHIVES
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
                TÉLÉPHONE
              </div>
              <div style={getResponsiveTextStyle(16)}>
                & STANDARD
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
                REUNIONS
              </div>
              <div style={getResponsiveTextStyle(16)}>
                & SALLES
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
                ACCUEIL
              </div>
              <div style={getResponsiveTextStyle(16)}>
                VISITEURS
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
                COMMANDES
              </div>
              <div style={getResponsiveTextStyle(16)}>
                & STOCKS
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
                EMAILS
              </div>
              <div style={getResponsiveTextStyle(16)}>
                & MESSAGERIE
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
                AGENDA
              </div>
              <div style={getResponsiveTextStyle(16)}>
                & RENDEZ- 
              </div>         
              <div style={getResponsiveTextStyle(16)}>
                 VOUS
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
                COLIS
              </div>
              <div style={getResponsiveTextStyle(16)}>
                & COURRIERS
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
            text="Ajuster la taille du curseur"
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