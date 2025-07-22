import React from "react";
import "./BackButton.css";

export default function BackButton({ onClick }) {
  return (
    <div className="back-btn" onClick={onClick}>
      <svg width="156" height="76" viewBox="0 0 156 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_iiii_813_1603)">
          <path d="M0 38C0 17.0132 17.0132 0 38 0H118C138.987 0 156 17.0132 156 38C156 58.9868 138.987 76 118 76H38C17.0132 76 0 58.9868 0 38Z" fill="#1D1D1D" style={{mixBlendMode:'plus-lighter'}}/>
          <path d="M0 38C0 17.0132 17.0132 0 38 0H118C138.987 0 156 17.0132 156 38C156 58.9868 138.987 76 118 76H38C17.0132 76 0 58.9868 0 38Z" fill="#1D1D1D" fillOpacity="0.2" style={{mixBlendMode:'color-burn'}}/>
          <path d="M0 38C0 17.0132 17.0132 0 38 0H118C138.987 0 156 17.0132 156 38C156 58.9868 138.987 76 118 76H38C17.0132 76 0 58.9868 0 38Z" fill="url(#paint0_linear_813_1603)" fillOpacity="0.4" style={{mixBlendMode:'plus-lighter'}}/>
          <path d="M0 38C0 17.0132 17.0132 0 38 0H118C138.987 0 156 17.0132 156 38C156 58.9868 138.987 76 118 76H38C17.0132 76 0 58.9868 0 38Z" fill="url(#paint1_linear_813_1603)" fillOpacity="0.2" style={{mixBlendMode:'plus-lighter'}}/>
        </g>
        <rect x="5.15" y="5.15" width="145.7" height="65.7" rx="32.85" fill="url(#paint2_linear_813_1603)" stroke="url(#paint3_linear_813_1603)" strokeWidth="2.3"/>
        <g filter="url(#filter1_i_813_1603)">
          <rect x="11" y="10" width="134" height="56" rx="28" fill="url(#paint4_linear_813_1603)"/>
        </g>
        <rect x="12.1458" y="11.1458" width="131.708" height="53.7083" rx="26.8542" stroke="url(#paint5_linear_813_1603)" strokeWidth="2.29167"/>
        <path d="M46 44L40 38L46 32" stroke="#3D241B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
          <filter id="filter0_iiii_813_1603" x="-100" y="-100" width="356" height="276" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="27.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.94902 0 0 0 0 0.94902 0 0 0 0 0.94902 0 0 0 0.5 0"/>
            <feBlend mode="plus-darker" in2="shape" result="effect1_innerShadow_813_1603"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="5" operator="dilate" in="SourceAlpha" result="effect2_innerShadow_813_1603"/>
            <feOffset dx="5" dy="5"/>
            <feGaussianBlur stdDeviation="1.25"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect1_innerShadow_813_1603" result="effect2_innerShadow_813_1603"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="35" operator="dilate" in="SourceAlpha" result="effect3_innerShadow_813_1603"/>
            <feOffset dx="-30" dy="-30"/>
            <feGaussianBlur stdDeviation="7.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect2_innerShadow_813_1603" result="effect3_innerShadow_813_1603"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="45" operator="dilate" in="SourceAlpha" result="effect4_innerShadow_813_1603"/>
            <feOffset dx="40" dy="40"/>
            <feGaussianBlur stdDeviation="11.25"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect3_innerShadow_813_1603" result="effect4_innerShadow_813_1603"/>
          </filter>
          <filter id="filter1_i_813_1603" x="11" y="10" width="134" height="65.1667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="9.16667"/>
            <feGaussianBlur stdDeviation="6.875"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_813_1603"/>
          </filter>
          <linearGradient id="paint0_linear_813_1603" x1="78" y1="0" x2="78" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0.5" stopColor="#666666" stopOpacity="0"/>
            <stop offset="1" stopColor="#666666"/>
          </linearGradient>
          <linearGradient id="paint1_linear_813_1603" x1="78" y1="0" x2="78" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#666666"/>
            <stop offset="0.326923" stopColor="#666666" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_813_1603" x1="124.208" y1="84.0889" x2="20.7138" y2="5.41506" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5D180"/>
            <stop offset="0.215843" stopColor="#C39E4A"/>
            <stop offset="0.82216" stopColor="#866B2D"/>
            <stop offset="1" stopColor="#3C241B"/>
          </linearGradient>
          <linearGradient id="paint3_linear_813_1603" x1="78" y1="4" x2="78" y2="62.0833" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.53"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint4_linear_813_1603" x1="92.9645" y1="6.4" x2="76.2851" y2="75.7329" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D2B676"/>
            <stop offset="0.149207" stopColor="#B99239"/>
            <stop offset="0.82216" stopColor="#A37817"/>
            <stop offset="1" stopColor="#8A6413"/>
          </linearGradient>
          <linearGradient id="paint5_linear_813_1603" x1="78" y1="10" x2="93.6328" y2="62.3856" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.53"/>
            <stop offset="1" stopColor="#9B7B5F"/>
          </linearGradient>
          <linearGradient id="paint6_linear_813_1603" x1="89.0986" y1="51" x2="88.4947" y2="24.0091" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEE69B"/>
            <stop offset="1" stopColor="#FEE69B" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
      <span className="back-btn-text">BACK</span>
    </div>
  );
} 