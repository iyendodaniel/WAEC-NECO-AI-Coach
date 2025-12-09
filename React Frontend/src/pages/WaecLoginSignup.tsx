import React, { useState } from 'react';
import { Mail, Lock, User, Brain, BookOpen } from 'lucide-react';

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Form submitted:', formData);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ fullName: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ backgroundColor: '#0E0C1A' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: '#838CE5' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: '#D6B9FC' }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div 
              className="p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(131, 140, 229, 0.2)' }}
            >
              <div className="flex items-center gap-1" style={{ color: '#838CE5' }}>
                <Brain className="w-8 h-8" strokeWidth={1.5} />
                <BookOpen className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Log in to continue learning' : 'Start your learning journey today'}
          </p>
        </div>

        {/* Form card */}
        <div 
          className="rounded-3xl p-8 backdrop-blur-sm"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(131, 140, 229, 0.1)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name field (Signup only) */}
            {!isLogin && (
              <div>
                <label 
                  htmlFor="fullName" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#D6B9FC' }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: '#838CE5', opacity: 0.6 }}
                  />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 transition-all duration-300 outline-none"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: `2px solid ${focusedField === 'fullName' ? '#838CE5' : 'rgba(131, 140, 229, 0.2)'}`,
                      boxShadow: focusedField === 'fullName' ? '0 0 20px rgba(131, 140, 229, 0.3)' : 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#D6B9FC' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: '#838CE5', opacity: 0.6 }}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 transition-all duration-300 outline-none"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${focusedField === 'email' ? '#838CE5' : 'rgba(131, 140, 229, 0.2)'}`,
                    boxShadow: focusedField === 'email' ? '0 0 20px rgba(131, 140, 229, 0.3)' : 'none'
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#D6B9FC' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: '#838CE5', opacity: 0.6 }}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 transition-all duration-300 outline-none"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${focusedField === 'password' ? '#838CE5' : 'rgba(131, 140, 229, 0.2)'}`,
                    boxShadow: focusedField === 'password' ? '0 0 20px rgba(131, 140, 229, 0.3)' : 'none'
                  }}
                />
              </div>
            </div>

            {/* Forgot password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <button 
                  type="button"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: '#D6B9FC' }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-6"
              style={{ backgroundColor: '#838CE5' }}
            >
              {isLogin ? 'Log In' : 'Create Account'}
            </button>

            {/* Continue without account (Login only) */}
            {isLogin && (
              <div className="text-center mt-4">
                <button 
                  type="button"
                  className="text-sm text-gray-400 hover:text-white transition-colors underline"
                >
                  Continue without Account
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Toggle between login/signup */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={toggleMode}
              className="font-semibold hover:underline transition-colors"
              style={{ color: '#838CE5' }}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}