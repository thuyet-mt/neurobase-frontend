import React from "react";
import "./Neurobase.css";
import imagePhotoroom from "../assets/logo_neuro.png";
import logo from "../assets/logo_neuro.png"; // Đổi tên file cho đúng
import menuPage from "../assets/background.png";

export default function Neurobase() {
  return (
    <div className="neurobase-root">
      {/* Background image */}
      <img src={imagePhotoroom} alt="background" className="background-img" />

      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {/* Title */}
      <h1 className="neurobase-title">NEUROBASE</h1>

      {/* Menu (ví dụ, bạn có thể thêm các nút, icon, ... ở đây) */}
      <div className="menu">
        <div className="menu-bg">
          <img src={menuPage} alt="menu-bg" />
        </div>
        {/* Thêm các nút, icon, text... */}
      </div>

      {/* Button ví dụ */}
      <button className="neurobase-btn">Button</button>
    </div>
  );
}