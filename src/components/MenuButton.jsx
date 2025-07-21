import React from "react";
import "./MenuButton.css";

export default function MenuButton({ onClick }) {
  return (
    <div className="menu-btn-root" onClick={onClick}>
      <svg width="80" height="80" viewBox="0 0 106 107" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="53" cy="47" r="40.5" fill="url(#paint0_linear_813_1485)" stroke="#3D241B"/>
        <g filter="url(#filter0_dii_813_1485)">
          <circle cx="53" cy="47" r="40" fill="url(#paint1_linear_813_1485)"/>
          <circle cx="53" cy="47" r="39.5" stroke="#3D241B"/>
        </g>
        <path d="M65 63C65 59.8174 63.7357 56.7652 61.4853 54.5147C59.2348 52.2643 56.1826 51 53 51C49.8174 51 46.7652 52.2643 44.5147 54.5147C42.2643 56.7652 41 59.8174 41 63" stroke="#3D241B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M53 51C57.4183 51 61 47.4183 61 43C61 38.5817 57.4183 35 53 35C48.5817 35 45 38.5817 45 43C45 47.4183 48.5817 51 53 51Z" stroke="#3D241B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M53 67C64.0457 67 73 58.0457 73 47C73 35.9543 64.0457 27 53 27C41.9543 27 33 35.9543 33 47C33 58.0457 41.9543 67 53 67Z" stroke="#3D241B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <filter id="filter0_dii_813_1485" x="0.2" y="0.6" width="105.6" height="105.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="6.4"/>
            <feGaussianBlur stdDeviation="6.4"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_813_1485"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_813_1485" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="-8" dy="-8"/>
            <feGaussianBlur stdDeviation="3.2"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_813_1485"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="8" dy="8"/>
            <feGaussianBlur stdDeviation="4.8"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
            <feBlend mode="normal" in2="effect2_innerShadow_813_1485" result="effect3_innerShadow_813_1485"/>
          </filter>
          <linearGradient id="paint0_linear_813_1485" x1="12" y1="6" x2="94" y2="88" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A9873F"/>
            <stop offset="1" stopColor="#8C6925"/>
          </linearGradient>
          <linearGradient id="paint1_linear_813_1485" x1="13" y1="7" x2="93" y2="87" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A9873F"/>
            <stop offset="1" stopColor="#8C6925"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
} 