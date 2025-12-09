import React, { useEffect, useState } from 'react';
import { Brain, BookOpen } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);

    const testNetworkSpeed = async () => {
      const start = performance.now();

      try {
        await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
      } catch (error) {}

      const duration = performance.now() - start;

      let splashTime = 2500;
      if (duration < 700) splashTime = 1500;
      else if (duration < 1500) splashTime = 2500;
      else splashTime = 4000;

      setTimeout(() => {
        const openedBefore = localStorage.getItem("hasOpened");
        const onboarded = localStorage.getItem("onboarded");

        if (!openedBefore) {
          localStorage.setItem("hasOpened", "true");
          navigate("/onboarding");
        } else if (!onboarded) {
          navigate("/onboarding");
        } else {
          navigate("/main");
        }
      }, splashTime);
    };

    testNetworkSpeed();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#0E0C1A' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              backgroundColor: '#838CE5',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo container with glow effect */}
        <div className={`relative inline-block transition-all duration-1000 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-3xl opacity-60 rounded-full"
            style={{ backgroundColor: '#838CE5' }}
          />
          
          {/* Logo */}
          <div className="relative bg-gradient-to-br from-[#838CE5] to-[#6B73D1] p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-16 h-16 text-white" strokeWidth={1.5} />
              <BookOpen className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* App name */}
        <h1 
          className={`text-white text-4xl font-bold mt-8 mb-2 transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          WAEC/NECO
          <span className="block text-[#838CE5] mt-1">AI Coach</span>
        </h1>

        {/* Tagline */}
        <p 
          className={`text-gray-400 text-lg font-light tracking-wide transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Learn Smart. Learn Fast.
        </p>

        {/* Loading indicator */}
        <div className={`mt-12 flex justify-center gap-2 transition-all duration-1000 delay-700 ${animate ? 'opacity-100' : 'opacity-0'}`}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#838CE5',
                animation: 'pulse 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}