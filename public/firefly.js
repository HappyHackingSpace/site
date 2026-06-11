import * as React from "react";

const FireflySVG = ({ isFlapping = false, style, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    style={{ overflow: 'visible', ...style }}
    {...props}
  >
    <defs>
      <style>{`
        @keyframes wingFlapLeft {
          0% { transform: rotate(0deg) scaleX(1); }
          100% { transform: rotate(34deg) scaleX(0.72); }
        }
        @keyframes wingFlapRight {
          0% { transform: rotate(0deg) scaleX(1); }
          100% { transform: rotate(-34deg) scaleX(0.72); }
        }
        @keyframes tailGlow {
          0%, 100% {
            opacity: 0.3;
            filter: drop-shadow(0 0 2px rgba(255, 200, 50, 0.25));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 1)) drop-shadow(0 0 22px rgba(255, 180, 0, 0.55));
          }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.55; transform: scale(1.15); }
        }
        .wing-left { transform-origin: 32px 30px; }
        .wing-right { transform-origin: 32px 30px; }
        .wing-left.flapping { animation: wingFlapLeft 0.1s ease-in-out infinite alternate; }
        .wing-right.flapping { animation: wingFlapRight 0.1s ease-in-out infinite alternate; }
        .tail-glow { animation: tailGlow 2.5s ease-in-out infinite; }
        .sparkle { animation: sparkle 2.2s ease-in-out infinite; transform-origin: center; }
      `}</style>
      <linearGradient id="wingGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B8A9D9" />
        <stop offset="100%" stopColor="#7A6BA8" />
      </linearGradient>
      <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE135" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
    </defs>

    {/* Işık patlamaları */}
    <g className="sparkles">
      <path d="M10 10 L12 16 M10 10 L16 12 M10 10 L6 14" stroke="#6B8FB5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M54 10 L52 16 M54 10 L48 12 M54 10 L58 14" stroke="#6B8FB5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M8 54 L12 50 M8 54 L14 56" stroke="#6B8FB5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M56 54 L52 50 M56 54 L50 56" stroke="#6B8FB5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Sol kanat */}
    <path
      className={`wing-left ${isFlapping ? 'flapping' : ''}`}
      d="M32 30 C16 14, 10 24, 16 38 C20 46, 28 40, 32 34Z"
      fill="url(#wingGrad)"
      stroke="#4A5568"
      strokeWidth="1"
    />

    {/* Sağ kanat */}
    <path
      className={`wing-right ${isFlapping ? 'flapping' : ''}`}
      d="M32 30 C48 14, 54 24, 48 38 C44 46, 36 40, 32 34Z"
      fill="url(#wingGrad)"
      stroke="#4A5568"
      strokeWidth="1"
    />

    {/* Vücut */}
    <ellipse cx="32" cy="39" rx="9" ry="13" fill="url(#bodyGrad)" stroke="#4A5568" strokeWidth="1" />
    <path d="M23 35 Q32 38 41 35" stroke="#4A5568" strokeWidth="0.8" fill="none" />
    <path d="M23 42 Q32 45 41 42" stroke="#4A5568" strokeWidth="0.8" fill="none" />

    {/* Kuyruk ışığı */}
    <ellipse className="tail-glow" cx="32" cy="50" rx="5" ry="3.5" fill="#FFD700" />
    <ellipse className="tail-glow" cx="32" cy="50" rx="8" ry="5.5" fill="rgba(255, 215, 0, 0.2)" />

    {/* Baş */}
    <path d="M23 21 Q32 10 41 21 Q41 29 32 31 Q23 29 23 21Z" fill="#FF6B6B" stroke="#4A5568" strokeWidth="1" />

    {/* Gözler */}
    <circle cx="28" cy="19" r="2.8" fill="#FFD700" stroke="#4A5568" strokeWidth="0.8" />
    <circle cx="36" cy="19" r="2.8" fill="#FFD700" stroke="#4A5568" strokeWidth="0.8" />

    {/* Antenler */}
    <path d="M26 15 Q22 6 18 8" stroke="#4A5568" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M38 15 Q42 6 46 8" stroke="#4A5568" strokeWidth="1.2" fill="none" strokeLinecap="round" />
  </svg>
);

export default FireflySVG;
