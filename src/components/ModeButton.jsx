import React from "react";
import "./ModeButton.css";
import { useTheme } from '../contexts/ThemeContext';

const BUTTON_MODES = [
  {
    key: "light",
    label: "Light Mode",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_iiii_813_1323)">
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="#1D1D1D" style={{mixBlendMode:'plus-lighter'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="#1D1D1D" fillOpacity="0.2" style={{mixBlendMode:'color-burn'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="url(#paint0_linear_813_1323)" fillOpacity="0.4" style={{mixBlendMode:'plus-lighter'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="url(#paint1_linear_813_1323)" fillOpacity="0.2" style={{mixBlendMode:'plus-lighter'}}/>
        </g>
        <rect x="3.65922" y="3.66007" width="72.68" height="72.68" rx="36.34" fill="url(#paint2_linear_813_1323)" stroke="url(#paint3_linear_813_1323)" strokeWidth="0.92"/>
        <g filter="url(#filter1_i_813_1323)">
          <rect x="6.87891" y="6.88007" width="66.24" height="66.24" rx="33.12" fill="url(#paint4_linear_813_1323)"/>
        </g>
        <rect x="7.33891" y="7.34007" width="65.32" height="65.32" rx="32.66" stroke="url(#paint5_linear_813_1323)" strokeWidth="0.92"/>
        <g clipPath="url(#clip0_813_1323)">
          <path d="M39.998 48.3333C35.398 48.3333 31.6647 44.6 31.6647 40C31.6647 35.4 35.398 31.6667 39.998 31.6667C44.598 31.6667 48.3314 35.4 48.3314 40C48.3314 44.6 44.598 48.3333 39.998 48.3333ZM39.998 35C37.248 35 34.998 37.25 34.998 40C34.998 42.75 37.248 45 39.998 45C42.748 45 44.998 42.75 44.998 40C44.998 37.25 42.748 35 39.998 35ZM41.6647 26.6667V21.6667C41.6647 20.75 40.9147 20 39.998 20C39.0814 20 38.3314 20.75 38.3314 21.6667V26.6667C38.3314 27.5833 39.0814 28.3333 39.998 28.3333C40.9147 28.3333 41.6647 27.5833 41.6647 26.6667ZM41.6647 58.3333V53.3333C41.6647 52.4167 40.9147 51.6667 39.998 51.6667C39.0814 51.6667 38.3314 52.4167 38.3314 53.3333V58.3333C38.3314 59.25 39.0814 60 39.998 60C40.9147 60 41.6647 59.25 41.6647 58.3333ZM28.3314 40C28.3314 39.0833 27.5814 38.3333 26.6647 38.3333H21.6647C20.748 38.3333 19.998 39.0833 19.998 40C19.998 40.9167 20.748 41.6667 21.6647 41.6667H26.6647C27.5814 41.6667 28.3314 40.9167 28.3314 40ZM59.998 40C59.998 39.0833 59.248 38.3333 58.3314 38.3333H53.3314C52.4147 38.3333 51.6647 39.0833 51.6647 40C51.6647 40.9167 52.4147 41.6667 53.3314 41.6667H58.3314C59.248 41.6667 59.998 40.9167 59.998 40ZM31.1814 31.1833C31.8314 30.5333 31.8314 29.4833 31.1814 28.8333L27.848 25.5C27.198 24.85 26.148 24.85 25.498 25.5C24.848 26.15 24.848 27.2 25.498 27.85L28.8314 31.1833C29.1647 31.5167 29.5814 31.6667 30.0147 31.6667C30.448 31.6667 30.8647 31.5 31.198 31.1833H31.1814ZM54.5147 54.5167C55.1647 53.8667 55.1647 52.8167 54.5147 52.1667L51.1814 48.8333C50.5314 48.1833 49.4814 48.1833 48.8314 48.8333C48.1814 49.4833 48.1814 50.5333 48.8314 51.1833L52.1647 54.5167C52.498 54.85 52.9147 55 53.348 55C53.7814 55 54.198 54.8333 54.5314 54.5167H54.5147ZM27.848 54.5167L31.1814 51.1833C31.8314 50.5333 31.8314 49.4833 31.1814 48.8333C30.5314 48.1833 29.4814 48.1833 28.8314 48.8333L25.498 52.1667C24.848 52.8167 24.848 53.8667 25.498 54.5167C25.8314 54.85 26.248 55 26.6814 55C27.1147 55 27.5314 54.8333 27.8647 54.5167H27.848ZM51.1814 31.1833L54.5147 27.85C55.1647 27.2 55.1647 26.15 54.5147 25.5C53.8647 24.85 52.8147 24.85 52.1647 25.5L48.8314 28.8333C48.1814 29.4833 48.1814 30.5333 48.8314 31.1833C49.1647 31.5167 49.5814 31.6667 50.0147 31.6667C50.448 31.6667 50.8647 31.5 51.198 31.1833H51.1814Z" fill="#4E3117"/>
        </g>
        <defs>
          <filter id="filter0_iiii_813_1323" x="-40" y="-40" width="160" height="160" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="11"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.94902 0 0 0 0 0.94902 0 0 0 0 0.94902 0 0 0 0.5 0"/>
            <feBlend mode="plus-darker" in2="shape" result="effect1_innerShadow_813_1323"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect2_innerShadow_813_1323"/>
            <feOffset dx="2" dy="2"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect1_innerShadow_813_1323" result="effect2_innerShadow_813_1323"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="14" operator="dilate" in="SourceAlpha" result="effect3_innerShadow_813_1323"/>
            <feOffset dx="-12" dy="-12"/>
            <feGaussianBlur stdDeviation="3"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect2_innerShadow_813_1323" result="effect3_innerShadow_813_1323"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="18" operator="dilate" in="SourceAlpha" result="effect4_innerShadow_813_1323"/>
            <feOffset dx="16" dy="16"/>
            <feGaussianBlur stdDeviation="4.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect3_innerShadow_813_1323" result="effect4_innerShadow_813_1323"/>
          </filter>
          <filter id="filter1_i_813_1323" x="6.87891" y="6.88007" width="66.2402" height="69.92" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3.68"/>
            <feGaussianBlur stdDeviation="2.76"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_813_1323"/>
          </filter>
          <linearGradient id="paint0_linear_813_1323" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0.5" stopColor="#666666" stopOpacity="0"/>
            <stop offset="1" stopColor="#666666"/>
          </linearGradient>
          <linearGradient id="paint1_linear_813_1323" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#666666"/>
            <stop offset="0.326923" stopColor="#666666" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_813_1323" x1="62.9784" y1="89.8845" x2="-9.40086" y2="64.6046" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E9B86E"/>
            <stop offset="0.215843" stopColor="#E1B068"/>
            <stop offset="0.82216" stopColor="#9E6D38"/>
            <stop offset="1" stopColor="#683E23"/>
          </linearGradient>
          <linearGradient id="paint3_linear_813_1323" x1="39.9992" y1="3.20007" x2="39.9992" y2="66.0667" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.53"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint4_linear_813_1323" x1="47.3963" y1="2.62178" x2="9.88482" y2="67.7856" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE7BB"/>
            <stop offset="0.149207" stopColor="#E9B86E"/>
            <stop offset="0.82216" stopColor="#9E6D38"/>
            <stop offset="1" stopColor="#683E23"/>
          </linearGradient>
          <linearGradient id="paint5_linear_813_1323" x1="39.9989" y1="6.88006" x2="71.9134" y2="51.5737" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.53"/>
            <stop offset="1" stopColor="#AD7D43"/>
          </linearGradient>
          <clipPath id="clip0_813_1323">
            <rect width="40" height="40" fill="white" transform="translate(19.998 20)"/>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    key: "dark",
    label: "Dark Mode",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_iiii_813_5005)">
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="#1D1D1D" style={{mixBlendMode:'plus-lighter'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="#1D1D1D" fillOpacity="0.2" style={{mixBlendMode:'color-burn'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="url(#paint0_linear_813_5005)" fillOpacity="0.4" style={{mixBlendMode:'plus-lighter'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="url(#paint1_linear_813_5005)" fillOpacity="0.2" style={{mixBlendMode:'plus-lighter'}}/>
        </g>
        <rect x="3.65922" y="3.6602" width="72.68" height="72.68" rx="36.34" fill="url(#paint2_linear_813_5005)" stroke="url(#paint3_linear_813_5005)" strokeWidth="0.92"/>
        <g filter="url(#filter1_i_813_5005)">
          <rect x="6.87891" y="6.88037" width="66.24" height="66.24" rx="33.12" fill="url(#paint4_linear_813_5005)"/>
        </g>
        <rect x="7.33891" y="7.34037" width="65.32" height="65.32" rx="32.66" stroke="url(#paint5_linear_813_5005)" strokeWidth="0.92"/>
        <g clipPath="url(#clip0_813_5005)">
          <path d="M40.0126 59.9999C37.2118 59.9831 34.4455 59.3815 31.8907 58.2337C29.336 57.0858 27.0492 55.417 25.1767 53.3342C23.3043 51.2513 21.8875 48.8004 21.0172 46.1383C20.1468 43.4761 19.8421 40.6616 20.1226 37.8749C20.6208 33.5234 22.5199 29.4517 25.5335 26.2734C28.5471 23.095 32.512 20.9822 36.8309 20.2532C39.621 19.8203 42.4688 19.937 45.2142 20.5966C45.9371 20.7821 46.5969 21.1584 47.1246 21.6861C47.6524 22.2139 48.0287 22.8737 48.2142 23.5966C48.4011 24.3129 48.3914 25.0664 48.1861 25.7777C47.9808 26.489 47.5875 27.1317 47.0476 27.6382C39.4492 34.5849 40.1059 45.3799 48.3926 51.6582C48.9779 52.1181 49.4294 52.7264 49.7001 53.4198C49.9707 54.1133 50.0506 54.8666 49.9316 55.6014C49.8125 56.3362 49.4987 57.0257 49.0229 57.5981C48.547 58.1706 47.9265 58.6051 47.2259 58.8566C44.8972 59.6174 42.4624 60.0033 40.0126 59.9999ZM40.1359 23.3332C39.2012 23.331 38.2678 23.4018 37.3442 23.5449C33.7509 24.1545 30.4525 25.914 27.9447 28.5588C25.4369 31.2036 23.8553 34.5909 23.4376 38.2116C23.1777 40.545 23.4173 42.907 24.1406 45.1406C24.8639 47.3743 26.0542 49.4284 27.6326 51.1666C29.9421 53.6347 32.9187 55.3791 36.2007 56.188C39.4826 56.9969 42.9289 56.8354 46.1209 55.7232C46.258 55.6714 46.379 55.5843 46.4716 55.4707C46.5643 55.3571 46.6254 55.2212 46.6487 55.0765C46.672 54.9318 46.6568 54.7835 46.6045 54.6465C46.5522 54.5096 46.4647 54.3889 46.3509 54.2966C36.4692 46.8332 35.6926 33.4782 44.7726 25.2066C44.8762 25.1097 44.9509 24.9859 44.9883 24.8491C45.0257 24.7122 45.0243 24.5677 44.9842 24.4316C44.9497 24.2865 44.8762 24.1536 44.7716 24.0473C44.667 23.9409 44.5354 23.8652 44.3909 23.8282C42.9977 23.4925 41.569 23.3263 40.1359 23.3332ZM54.1642 39.9999C53.7927 39.9999 53.4318 39.8757 53.1389 39.6471C52.846 39.4186 52.6378 39.0986 52.5476 38.7382L51.9509 36.3549L49.5642 35.7132C49.2053 35.6166 48.889 35.4028 48.6655 35.1057C48.4421 34.8087 48.3243 34.4454 48.331 34.0738C48.3378 33.7021 48.4685 33.3434 48.7025 33.0546C48.9365 32.7658 49.2604 32.5635 49.6226 32.4799L51.9559 31.9382L52.5409 29.5949C52.6312 29.2345 52.8393 28.9147 53.1323 28.6861C53.4252 28.4575 53.786 28.3334 54.1576 28.3334C54.5291 28.3334 54.8899 28.4575 55.1829 28.6861C55.4758 28.9147 55.6839 29.2345 55.7742 29.5949L56.3659 31.9582L58.7292 32.5499C59.0896 32.6402 59.4095 32.8484 59.638 33.1413C59.8666 33.4342 59.9907 33.795 59.9907 34.1666C59.9907 34.5381 59.8666 34.899 59.638 35.1919C59.4095 35.4848 59.0896 35.6929 58.7292 35.7832L56.3659 36.3749L55.7742 38.7382C55.6842 39.0975 55.4771 39.4166 55.1855 39.6451C54.894 39.8736 54.5346 39.9984 54.1642 39.9999ZM46.6642 43.3332C46.6642 43.7753 46.8398 44.1992 47.1524 44.5117C47.4649 44.8243 47.8889 44.9999 48.3309 44.9999C48.7729 44.9999 49.1968 44.8243 49.5094 44.5117C49.822 44.1992 49.9976 43.7753 49.9976 43.3332C49.9976 42.8912 49.822 42.4673 49.5094 42.1547C49.1968 41.8422 48.7729 41.6666 48.3309 41.6666C47.8889 41.6666 47.4649 41.8422 47.1524 42.1547C46.8398 42.4673 46.6642 42.8912 46.6642 43.3332ZM56.6642 49.9999C56.6642 50.4419 56.8398 50.8659 57.1524 51.1784C57.4649 51.491 57.8889 51.6666 58.3309 51.6666C58.7729 51.6666 59.1968 51.491 59.5094 51.1784C59.822 50.8659 59.9976 50.4419 59.9976 49.9999C59.9976 49.5579 59.822 49.1339 59.5094 48.8214C59.1968 48.5088 58.7729 48.3332 58.3309 48.3332C57.8889 48.3332 57.4649 48.5088 57.1524 48.8214C56.8398 49.1339 56.6642 49.5579 56.6642 49.9999Z" fill="#4E3117"/>
        </g>
        <defs>
          <filter id="filter0_iiii_813_5005" x="-40" y="-40" width="160" height="160" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="11"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.94902 0 0 0 0 0.94902 0 0 0 0 0.94902 0 0 0 0.5 0"/>
            <feBlend mode="plus-darker" in2="shape" result="effect1_innerShadow_813_5005"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect2_innerShadow_813_5005"/>
            <feOffset dx="2" dy="2"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect1_innerShadow_813_5005" result="effect2_innerShadow_813_5005"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="14" operator="dilate" in="SourceAlpha" result="effect3_innerShadow_813_5005"/>
            <feOffset dx="-12" dy="-12"/>
            <feGaussianBlur stdDeviation="3"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect2_innerShadow_813_5005" result="effect3_innerShadow_813_5005"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="18" operator="dilate" in="SourceAlpha" result="effect4_innerShadow_813_5005"/>
            <feOffset dx="16" dy="16"/>
            <feGaussianBlur stdDeviation="4.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect3_innerShadow_813_5005" result="effect4_innerShadow_813_5005"/>
          </filter>
          <filter id="filter1_i_813_5005" x="6.87891" y="6.88037" width="66.2402" height="69.9202" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3.68"/>
            <feGaussianBlur stdDeviation="2.76"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_813_5005"/>
          </filter>
          <linearGradient id="paint0_linear_813_5005" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0.5" stopColor="#666666" stopOpacity="0"/>
            <stop offset="1" stopColor="#666666"/>
          </linearGradient>
          <linearGradient id="paint1_linear_813_5005" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#666666"/>
            <stop offset="0.326923" stopColor="#666666" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_813_5005" x1="62.9784" y1="89.8846" x2="-9.40086" y2="64.6048" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5D180"/>
            <stop offset="0.215843" stopColor="#C39E4A"/>
            <stop offset="0.82216" stopColor="#866B2D"/>
            <stop offset="1" stopColor="#3C241B"/>
          </linearGradient>
          <linearGradient id="paint3_linear_813_5005" x1="39.9992" y1="3.2002" x2="39.9992" y2="66.0669" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.53"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint4_linear_813_5005" x1="47.3963" y1="2.62208" x2="9.88482" y2="67.7859" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D2B676"/>
            <stop offset="0.149207" stopColor="#B99239"/>
            <stop offset="0.82216" stopColor="#A37817"/>
            <stop offset="1" stopColor="#8A6413"/>
          </linearGradient>
          <linearGradient id="paint5_linear_813_5005" x1="39.9989" y1="6.88037" x2="71.9134" y2="51.574" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.53"/>
            <stop offset="1" stopColor="#AD7D43"/>
          </linearGradient>
          <clipPath id="clip0_813_5005">
            <rect width="40" height="40" fill="white" transform="translate(19.998 20)"/>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    key: "balance",
    label: "Balance Mode",
    svg: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_iiii_813_4973)">
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="#1D1D1D" style={{mixBlendMode:'plus-lighter'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="#1D1D1D" fillOpacity="0.2" style={{mixBlendMode:'color-burn'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="url(#paint0_linear_813_4973)" fillOpacity="0.4" style={{mixBlendMode:'plus-lighter'}}/>
          <path d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z" fill="url(#paint1_linear_813_4973)" fillOpacity="0.2" style={{mixBlendMode:'plus-lighter'}}/>
        </g>
        <rect x="3.65922" y="3.65995" width="72.68" height="72.68" rx="36.34" fill="url(#paint2_linear_813_4973)" stroke="url(#paint3_linear_813_4973)" strokeWidth="0.92"/>
        <g filter="url(#filter1_i_813_4973)">
          <rect x="6.87891" y="6.87988" width="66.24" height="66.24" rx="33.12" fill="url(#paint4_linear_813_4973)"/>
        </g>
        <rect x="7.33891" y="7.33988" width="65.32" height="65.32" rx="32.66" stroke="url(#paint5_linear_813_4973)" strokeWidth="0.92"/>
        <path d="M45.7615 39.2634C45.3765 38.9268 44.8582 38.7868 44.3515 38.8834C44.0715 38.9368 43.7282 38.9651 43.3298 38.9651C41.5765 38.9651 41.0315 38.6484 41.0315 36.6668C41.0315 36.2818 41.0615 35.9401 41.1182 35.6518C41.2182 35.1484 41.0815 34.6284 40.7465 34.2401C40.4115 33.8534 39.9115 33.6434 39.4048 33.6634C35.5848 33.8434 33.6465 35.9751 33.6465 40.0018C33.6465 44.2151 35.7832 46.3534 39.9982 46.3534C44.0048 46.3534 46.1365 44.4201 46.3332 40.6101C46.3598 40.0984 46.1498 39.6034 45.7632 39.2668L45.7615 39.2634ZM39.9965 43.0168C37.8682 43.0168 36.9782 42.5984 36.9782 39.9984C36.9782 38.6418 37.2182 37.8918 37.7315 37.4801C37.9248 39.6751 38.9932 41.9568 42.4998 42.2634C42.0615 42.8201 41.2915 43.0168 39.9965 43.0168Z" fill="#4E3117"/>
        <path d="M56.6641 38.3334H52.8857C52.6841 35.3484 51.9324 33.1434 50.8374 31.5151L52.9607 29.3917C53.6124 28.7401 53.6124 27.6867 52.9607 27.0351C52.3091 26.3834 51.2557 26.3834 50.6041 27.0351L48.4991 29.1401C46.4624 27.7301 43.9891 27.2401 41.6641 27.1017V23.3334C41.6641 22.4134 40.9174 21.6667 39.9974 21.6667C39.0774 21.6667 38.3307 22.4134 38.3307 23.3334V27.1034C36.0057 27.2417 33.5307 27.7317 31.4957 29.1417L29.3907 27.0367C28.7391 26.3851 27.6857 26.3851 27.0341 27.0367C26.3824 27.6884 26.3824 28.7417 27.0341 29.3934L29.1574 31.5167C28.0624 33.1434 27.3107 35.3501 27.1091 38.3351H23.3307C22.4107 38.3351 21.6641 39.0817 21.6641 40.0017C21.6641 40.9217 22.4107 41.6684 23.3307 41.6684H27.1091C27.3107 44.6534 28.0624 46.8584 29.1574 48.4867L27.0341 50.6101C26.3824 51.2617 26.3824 52.3151 27.0341 52.9668C27.3591 53.2917 27.7857 53.4551 28.2124 53.4551C28.6391 53.4551 29.0657 53.2917 29.3907 52.9668L31.4957 50.8617C33.5324 52.2717 36.0057 52.7617 38.3307 52.9001V56.6701C38.3307 57.5901 39.0774 58.3368 39.9974 58.3368C40.9174 58.3368 41.6641 57.5901 41.6641 56.6701V52.9001C43.9891 52.7617 46.4641 52.2717 48.4991 50.8617L50.6041 52.9668C50.9291 53.2917 51.3557 53.4551 51.7824 53.4551C52.2091 53.4551 52.6357 53.2917 52.9607 52.9668C53.6124 52.3151 53.6124 51.2617 52.9607 50.6101L50.8374 48.4867C51.9324 46.8601 52.6841 44.6534 52.8857 41.6684H56.6641C57.5841 41.6684 58.3307 40.9217 58.3307 40.0017C58.3307 39.0817 57.5841 38.3351 56.6641 38.3351V38.3334ZM39.9974 49.6101C34.0641 49.6101 30.3874 48.0034 30.3874 40.0001C30.3874 31.9967 34.0641 30.3901 39.9974 30.3901C45.9307 30.3901 49.6074 31.9967 49.6074 40.0001C49.6074 48.0034 45.9307 49.6101 39.9974 49.6101Z" fill="#4E3117"/>
        <path d="M56.6641 38.3334H52.8857C52.6841 35.3484 51.9324 33.1434 50.8374 31.5151L52.9607 29.3917C53.6124 28.7401 53.6124 27.6867 52.9607 27.0351C52.3091 26.3834 51.2557 26.3834 50.6041 27.0351L48.4991 29.1401C46.4624 27.7301 43.9891 27.2401 41.6641 27.1017V23.3334C41.6641 22.4134 40.9174 21.6667 39.9974 21.6667C39.0774 21.6667 38.3307 22.4134 38.3307 23.3334V27.1034C36.0057 27.2417 33.5307 27.7317 31.4957 29.1417L29.3907 27.0367C28.7391 26.3851 27.6857 26.3851 27.0341 27.0367C26.3824 27.6884 26.3824 28.7417 27.0341 29.3934L29.1574 31.5167C28.0624 33.1434 27.3107 35.3501 27.1091 38.3351H23.3307C22.4107 38.3351 21.6641 39.0817 21.6641 40.0017C21.6641 40.9217 22.4107 41.6684 23.3307 41.6684H27.1091C27.3107 44.6534 28.0624 46.8584 29.1574 48.4867L27.0341 50.6101C26.3824 51.2617 26.3824 52.3151 27.0341 52.9668C27.3591 53.2917 27.7857 53.4551 28.2124 53.4551C28.6391 53.4551 29.0657 53.2917 29.3907 52.9668L31.4957 50.8617C33.5324 52.2717 36.0057 52.7617 38.3307 52.9001V56.6701C38.3307 57.5901 39.0774 58.3368 39.9974 58.3368C40.9174 58.3368 41.6641 57.5901 41.6641 56.6701V52.9001C43.9891 52.7617 46.4641 52.2717 48.4991 50.8617L50.6041 52.9668C50.9291 53.2917 51.3557 53.4551 51.7824 53.4551C52.2091 53.4551 52.6357 53.2917 52.9607 52.9668C53.6124 52.3151 53.6124 51.2617 52.9607 50.6101L50.8374 48.4867C51.9324 46.8601 52.6841 44.6534 52.8857 41.6684H56.6641C57.5841 41.6684 58.3307 40.9217 58.3307 40.0017C58.3307 39.0817 57.5841 38.3351 56.6641 38.3351V38.3334ZM39.9974 49.6101C34.0641 49.6101 30.3874 48.0034 30.3874 40.0001C30.3874 31.9967 34.0641 30.3901 39.9974 30.3901C45.9307 30.3901 49.6074 31.9967 49.6074 40.0001C49.6074 48.0034 45.9307 49.6101 39.9974 49.6101Z" fill="#4E3117"/>
        <defs>
          <filter id="filter0_iiii_813_4973" x="-40" y="-40" width="160" height="160" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="11"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.94902 0 0 0 0 0.94902 0 0 0 0 0.94902 0 0 0 0.5 0"/>
            <feBlend mode="plus-darker" in2="shape" result="effect1_innerShadow_813_4973"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect2_innerShadow_813_4973"/>
            <feOffset dx="2" dy="2"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect1_innerShadow_813_4973" result="effect2_innerShadow_813_4973"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="14" operator="dilate" in="SourceAlpha" result="effect3_innerShadow_813_4973"/>
            <feOffset dx="-12" dy="-12"/>
            <feGaussianBlur stdDeviation="3"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 0 0.701961 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect2_innerShadow_813_4973" result="effect3_innerShadow_813_4973"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="18" operator="dilate" in="SourceAlpha" result="effect4_innerShadow_813_4973"/>
            <feOffset dx="16" dy="16"/>
            <feGaussianBlur stdDeviation="4.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="plus-lighter" in2="effect3_innerShadow_813_4973" result="effect4_innerShadow_813_4973"/>
          </filter>
          <filter id="filter1_i_813_4973" x="6.87891" y="6.87988" width="66.2402" height="69.92" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3.68"/>
            <feGaussianBlur stdDeviation="2.76"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_813_4973"/>
          </filter>
          <linearGradient id="paint0_linear_813_4973" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0.5" stopColor="#666666" stopOpacity="0"/>
            <stop offset="1" stopColor="#666666"/>
          </linearGradient>
          <linearGradient id="paint1_linear_813_4973" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#666666"/>
            <stop offset="0.326923" stopColor="#666666" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_813_4973" x1="62.9784" y1="89.8844" x2="-9.40086" y2="64.6045" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5D180"/>
            <stop offset="0.215843" stopColor="#C39E4A"/>
            <stop offset="0.82216" stopColor="#866B2D"/>
            <stop offset="1" stopColor="#3C241B"/>
          </linearGradient>
          <linearGradient id="paint3_linear_813_4973" x1="39.9992" y1="3.19995" x2="39.9992" y2="66.0666" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.53"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="paint4_linear_813_4973" x1="47.3963" y1="2.62159" x2="9.88482" y2="67.7854" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D2B676"/>
            <stop offset="0.149207" stopColor="#B99239"/>
            <stop offset="0.82216" stopColor="#A37817"/>
            <stop offset="1" stopColor="#8A6413"/>
          </linearGradient>
          <linearGradient id="paint5_linear_813_4973" x1="39.9989" y1="6.87988" x2="71.9134" y2="51.5735" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.53"/>
            <stop offset="1" stopColor="#AD7D43"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export default function ModeButton() {
  const { currentMode, toggleMode } = useTheme();
  const mode = BUTTON_MODES.find(m => m.key === currentMode) || BUTTON_MODES[0];

  const handleClick = () => {
    toggleMode();
  };

  return (
    <div className="mode-btn-root" style={{ left: 1017, top: 880, position: 'absolute', width: 369, height: 80 }}>
      <div className="mode-btn-frame" onClick={handleClick}>
        <div className="mode-btn-label" style={{ color: '#FAECD2' }}>{mode.label}</div>
        <div className="mode-btn-svg">{mode.svg}</div>
      </div>
    </div>
  );
}