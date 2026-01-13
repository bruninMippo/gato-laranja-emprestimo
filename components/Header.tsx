
import React, { useState, useEffect } from 'react';
import { Cat } from 'lucide-react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWinking, setIsWinking] = useState(false);

  // Function to trigger the animation sequence
  const triggerAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Sequence: Jump first, then wink
    setTimeout(() => {
      setIsWinking(true);
      setTimeout(() => {
        setIsWinking(false);
      }, 200); // Wink duration
    }, 150); // Start wink shortly after jump starts

    // Reset jump animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <>
      <style>
        {`
          @keyframes catJump {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            30% { transform: translateY(-8px) rotate(-5deg); }
            60% { transform: translateY(-2px) rotate(5deg); }
          }
          .animate-cat-jump {
            animation: catJump 0.6s ease-in-out;
          }
          .wink-eye {
            transition: transform 0.1s ease-in-out;
          }
          .winking {
            transform: scaleY(0.1);
            transform-origin: center;
          }
        `}
      </style>
      <header 
        onClick={() => {
          triggerAnimation();
          onLogoClick();
        }}
        onMouseEnter={triggerAnimation}
        onTouchStart={triggerAnimation}
        className="bg-[#1a1a1a] p-4 flex items-center justify-center gap-3 border-b-2 border-[#ff8c00] sticky top-0 z-50 cursor-pointer active:bg-zinc-800 transition-colors select-none"
      >
        <div className={`bg-[#ff8c00] p-2 rounded-full shadow-[0_0_15px_rgba(255,140,0,0.4)] transition-transform duration-300 ${isAnimating ? 'animate-cat-jump' : ''}`}>
          <div className="relative">
            <Cat size={32} color="#000000" strokeWidth={2.5} />
            {/* Overlay to simulate the wink on one eye area of the Lucide Cat icon */}
            {isWinking && (
              <div 
                className="absolute bg-[#ff8c00] h-[4px] w-[6px] top-[14px] left-[8px] rounded-full"
                style={{ zIndex: 10 }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[#ff8c00] font-black text-2xl leading-tight tracking-tight">
            Gato Laranja
          </h1>
          <span className="text-zinc-400 text-sm font-medium -mt-1 uppercase tracking-widest">
            Empréstimos
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
