import React from "react";
import "./Neurobase.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo_neuro.png";
import MenuButton from "./MenuButton";
import BackButton from "./BackButton";
import ModeButton from "./ModeButton";
import { useTheme } from '../contexts/ThemeContext';

export default function Neurobase() {
  const { currentMode } = useTheme();
  
  // Theme-based styling for main container
  const getThemeStyles = () => {
    switch (currentMode) {
      case 'light':
        return {
          filter: 'brightness(1.1)',
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'
        };
      case 'dark':
        return {
          filter: 'brightness(0.8) contrast(1.2)',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        };
      case 'balance':
        return {
          filter: 'brightness(1) saturate(1.05)',
          background: 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%)'
        };
      default:
        return {};
    }
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
      <BackButton />
      {/* Placeholder: Các phần tử khác như button, menu, ... */}
      <ModeButton />
    </div>
  );
}