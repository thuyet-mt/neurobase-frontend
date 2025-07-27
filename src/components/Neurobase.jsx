import React, { useState } from "react";
import "./Neurobase.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo_neuro.png";
import MenuButton from "./MenuButton";
import BackButton from "./BackButton";
import ModeButton from "./ModeButton";
import ContainerFrame from "./ContainerFrame";
import GoldenButton from "./GoldenButton";
import { useTheme } from '../contexts/ThemeContext';

export default function Neurobase() {
  const { currentMode } = useTheme();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  
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

  const handleFunctionButtonClick = () => {
    // Hiển thị thông báo
    setNotificationMessage("Function Button đã được kích hoạt! 🎉");
    setShowNotification(true);
    
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    
    console.log("FunctionButton clicked!");
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
      <BackButton tooltip="Quay lại" onClick={handleBackButtonClick} />
      
      {/* Golden Button ở trung tâm */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}>
        <GoldenButton
          theme={currentMode === 'dark' ? 'dark' : currentMode === 'light' ? 'light' : 'gold'}
          onClick={handleGoldenButtonClick}
          tooltip="Golden Button - Click me! ✨"
          tooltipPosition="top"
          size={200}
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
      <ContainerFrame>
        {/* Text indicator để xác nhận ContainerFrame */}
        <div style={{ color: 'black', fontSize: '12px' }}>ContainerFrame Active</div>
        {/* ModeButton với vị trí tương đối */}
        {/* FunctionButton */}
        {/* Ví dụ thêm các component khác:
        <SomeOtherComponent />
        <AnotherComponent />
        <ModeButton/>
        */}
      </ContainerFrame>
      
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