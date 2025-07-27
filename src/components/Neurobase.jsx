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

  return (
    <div className="neurobase-root" style={getThemeStyles()}>
      <div className="neurobase-bg" />
      <div className="neurobase-image-bg">
        <img src={backgroundImg} alt="background" />
      </div>
      <div className="neurobase-logo" style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        top: '44px',
        left: '44px',
        transform: 'rotate(0deg)',
        opacity: 1
      }}>
        <img src={logoImg} alt="logo" style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }} />
      </div>
      <h1 className="neurobase-title" style={{
        position: 'absolute',
        width: '279px',
        left: '50%',
        top: '7.03%',
        bottom: '86.72%',
        transform: 'translateX(-50%)',
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '46px',
        lineHeight: '139%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#DFAA2E'
      }}>NEUROBASE</h1>
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
              fontFamily: 'Open Sans',
              fontWeight: '700',
              fontStyle: 'normal',
              fontSize: '23px',
              lineHeight: '1',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#4E3117',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center'
            }}>
              RETOUR
            </div>          
          </div>
        }
      />
      
      {/* Archives Button với vị trí tương đối so với Menu Container Frame */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: 'calc(50% - 840px/2 + 68px + 640px)', /* Menu Container top + 640px */
        left: 'calc(50% - 840px/2 + 320px)', /* Menu Container left + 320px */
        zIndex: 10,
        opacity: 1,
        transform: 'rotate(0deg)'
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleGoldenButtonClick}
          tooltip="Golden Button - Click me! ✨"
          tooltipPosition="top"
          size={200}
          icon={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <img src={ArchivesIcon} alt="logo"/>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                ARCHIVES
              </div>
            </div>
          }
        />
      </div>

      {/* Telephone Button */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: 'calc(50% - 840px/2 + 68px)', /* Menu Container top */
        left: 'calc(50% - 840px/2 + 320px)', /* Menu Container left + 320px */
        zIndex: 10,
        opacity: 1,
        transform: 'rotate(0deg)'
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleTelephoneButtonClick}
          tooltip="Telephone Button - Click me! 📞"
          tooltipPosition="top"
          size={200}
          icon={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <img src={TelephoneIcon} alt="logo"/>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                TÉLÉPHONE
              </div>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'Bold',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                & STANDARD
              </div>              
            </div>
          }
        />
      </div>

      {/* Reunion Button */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: 'calc(50% - 840px/2 + 68px + 320px)', /* Menu Container top + 320px */
        left: 'calc(50% - 840px/2 + 640px)', /* Menu Container left + 640px */
        zIndex: 10,
        opacity: 1,
        transform: 'rotate(0deg)'
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleReunionButtonClick}
          tooltip="Reunion Button - Click me! 👥"
          tooltipPosition="top"
          size={200}
          icon={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <img src={ReunionIcon} alt="logo"/>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                REUNIONS
              </div>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'Bold',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                & SALLES
              </div>              
            </div>
          }
        />
      </div>

      {/* Accueil Button */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: 'calc(50% - 840px/2 + 68px + 320px)', /* Menu Container top + 320px */
        left: 'calc(50% - 840px/2)', /* Menu Container left */
        zIndex: 10,
        opacity: 1,
        transform: 'rotate(0deg)'
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleAccueilButtonClick}
          tooltip="Accueil Button - Click me! 🏠"
          tooltipPosition="top"
          size={200}
          icon={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <img src={AccueilIcon} alt="logo"/>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                ACCUEIL
              </div>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'Bold',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                VISITEURS
              </div>              
            </div>
          }
        />
      </div>

      {/* Commandes Button */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: 'calc(50% - 840px/2 + 68px + 540px)', /* Menu Container top + 540px */
        left: 'calc(50% - 840px/2 + 100px)', /* Menu Container left + 100px */
        zIndex: 10,
        opacity: 1,
        transform: 'rotate(0deg)'
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleCommandesButtonClick}
          tooltip="Commandes Button - Click me! 📋"
          tooltipPosition="top"
          size={200}
          icon={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <img src={CommandesIcon} alt="logo"/>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                COMMANDES
              </div>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'Bold',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                & STOCKS
              </div>              
            </div>
          }
        />
      </div>

      {/* Emails Button */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: 'calc(50% - 840px/2 + 68px + 100px)', /* Menu Container top + 100px */
        left: 'calc(50% - 840px/2 + 100px)', /* Menu Container left + 100px */
        zIndex: 10,
        opacity: 1,
        transform: 'rotate(0deg)'
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleEmailsButtonClick}
          tooltip="Emails Button - Click me! 📧"
          tooltipPosition="top"
          size={200}
          icon={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <img src={EmailsIcon} alt="logo"/>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                EMAILS
              </div>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'Bold',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                & MESSAGERIE
              </div>              
            </div>
          }
        />
      </div>

      {/* Agenda Button */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: 'calc(50% - 840px/2 + 68px + 540px)', /* Menu Container top + 540px */
        left: 'calc(50% - 840px/2 + 540px)', /* Menu Container left + 540px */
        zIndex: 10,
        opacity: 1,
        transform: 'rotate(0deg)'
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleAgendaButtonClick}
          tooltip="Agenda Button - Click me! 📅"
          tooltipPosition="top"
          size={200}
          icon={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <img src={AgendaIcon} alt="logo"/>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                AGENDA
              </div>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'Bold',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                & RENDEZ- 
              </div>         
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'Bold',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                 VOUS
              </div>       
            </div>
          }
        />
      </div>

      {/* Colis Button */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        top: 'calc(50% - 840px/2 + 68px + 100px)', /* Menu Container top + 100px */
        left: 'calc(50% - 840px/2 + 540px)', /* Menu Container left + 540px */
        zIndex: 10,
        opacity: 1,
        transform: 'rotate(0deg)'
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleColisButtonClick}
          tooltip="Colis Button - Click me! 📦"
          tooltipPosition="top"
          size={200}
          icon={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <img src={ColisIcon} alt="logo"/>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                COLIS
              </div>
              <div style={{
                fontFamily: 'Open Sans',
                fontWeight: '700',
                fontStyle: 'Bold',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#4E3117',
                textTransform: 'none'
              }}>
                & COURRIERS
              </div>              
            </div>
          }
        />
      </div>
      
      {/* Container Frame để chứa các component */}
      <div style={{
        position: 'absolute',
        bottom: '64px',
        right: '64px',
        zIndex: 10
      }}>
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
      
      {/* Menu Container Frame với kích thước 840x840px */}
      <ContainerFrameMenu
        style={{
          position: 'absolute',
          width: '840px',
          height: '840px',
          left: 'calc(50% - 840px/2)',
          top: 'calc(50% - 840px/2 + 68px)',
          zIndex: 5
        }}
      >
        {/* Text indicator để xác nhận Menu ContainerFrame */}
        <div style={{ 
          color: 'black', 
          fontSize: '16px', 
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
          padding: '20px'
        }}>
          Menu Container Frame (840x840px)
        </div>
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