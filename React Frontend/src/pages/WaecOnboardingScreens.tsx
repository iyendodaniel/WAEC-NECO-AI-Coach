import React, { useState } from 'react';
import { MessageSquare, BookOpen, FileText, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function OnboardingScreens() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Learn With Your Language",
      icon: <MessageSquare className="w-20 h-20" strokeWidth={1.5} />,
      description: "Get explanations in the language you understand best",
      languages: ["English", "Yoruba", "Igbo", "Hausa", "Pidgin"]
    },
    {
      title: "WAEC & NECO Made Easy",
      icon: (
        <div className="flex gap-3">
          <BookOpen className="w-16 h-16" strokeWidth={1.5} />
          <FileText className="w-16 h-16" strokeWidth={1.5} />
        </div>
      ),
      description: "Ask any past question. Get clear explanations.",
      subtitle: "Access thousands of past questions with detailed solutions"
    },
    {
      title: "AI That Teaches Like a Real Tutor",
      icon: <Users className="w-20 h-20" strokeWidth={1.5} />,
      description: "Personalized learning that adapts to your pace and style",
      isLast: true
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0E0C1A' }}>
      {/* Skip button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
          onClick={() => {
            localStorage.setItem("onboarded", "true");
            navigate("/main");
          }}
        >
          Skip
        </button>
      </div>

      {/* Slides container */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                currentSlide === index
                  ? 'opacity-100 translate-x-0'
                  : currentSlide > index
                  ? 'opacity-0 -translate-x-full absolute'
                  : 'opacity-0 translate-x-full absolute'
              }`}
            >
              {/* Icon/Illustration */}
              <div className="flex justify-center mb-8">
                <div 
                  className="relative p-8 rounded-3xl"
                  style={{ 
                    backgroundColor: 'rgba(131, 140, 229, 0.1)',
                    border: '1px solid rgba(131, 140, 229, 0.2)'
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 blur-2xl opacity-30 rounded-3xl"
                    style={{ backgroundColor: '#838CE5' }}
                  />
                  
                  <div className="relative" style={{ color: '#838CE5' }}>
                    {slide.icon}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-white text-3xl font-bold text-center mb-4">
                {slide.title}
              </h2>

              {/* Languages (Slide 1) */}
              {slide.languages && (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {slide.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: 'rgba(131, 140, 229, 0.15)',
                        color: '#838CE5'
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-gray-400 text-center text-lg leading-relaxed mb-4">
                {slide.description}
              </p>

              {/* Subtitle (Slide 2) */}
              {slide.subtitle && (
                <p className="text-gray-500 text-center text-sm">
                  {slide.subtitle}
                </p>
              )}

              {/* Get Started button (Last slide) */}
              {slide.isLast && (
                <div className="mt-8">
                  <button
                    className="w-full py-4 rounded-2xl font-semibold text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#838CE5' }}
                    onClick={() => {
                      localStorage.setItem("onboarded", "true");
                      navigate("/main");
                    }}
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="pb-8 px-6">
        <div className="max-w-md mx-auto">
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="transition-all duration-300"
                style={{
                  width: currentSlide === index ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentSlide === index ? '#838CE5' : 'rgba(131, 140, 229, 0.3)'
                }}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          {!slides[currentSlide].isLast && (
            <div className="flex justify-between items-center">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="text-gray-400 hover:text-white transition-colors disabled:opacity-0 font-medium"
              >
                Back
              </button>
              
              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#838CE5' }}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}