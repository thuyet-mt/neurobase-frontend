import React from "react";
import "./Neurobase.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo_neuro.png";
import MenuButton from "./MenuButton";
import BackButton from "./BackButton";

export default function Neurobase() {
  return (
    <div className="neurobase-root">
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

    </div>
  );
}