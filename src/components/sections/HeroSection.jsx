import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, Chip } from '@mui/material';
import { PlayArrow, Star, Groups, School, Translate, Language, EmojiPeople } from '@mui/icons-material';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user } = useAuth();

  return (
    <section id='home' className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden rounded-2xl shadow-lg">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-20 w-50 h-50 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Container maxWidth="lg" className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-8 gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <Box className="space-y-6">
              {/* Badge */}
              <Chip
                icon={<Star className="text-yellow-500" />}
                label={t('text')}
                className="bg-white shadow-md rounded-full px-4 py-2 mb-4 animate-pulse-slow"
                sx={{
                  '& .MuiChip-label': {
                    fontWeight: 600,
                    color: 'green'
                  }
                }}
              />

              {/* Main Heading */}
              <h1 
                className="text-4xl lg:text-5xl font-extrabold mt-4 text-gray-900 leading-tight"
              >
                {t('line1')}{' '} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-orange-200 animate-gradient">
                  {t('line2')}
                </span>
              </h1>

              {/* Subtitle */}
              <p 
                className="text-xl md:text-2xl text-gray-600  leading-relaxed"
              >
                {t('subtitle')}
              </p>

              {/* Stats */}
              <Box className="flex flex-wrap gap-6 pt-4">
                <Box className="text-center transform hover:scale-105 transition-transform duration-300">
                  <Typography variant="p" className="font-bold text-3xl text-blue-700 animate-count-up">
                    50K+
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {t('label1')}
                  </Typography>
                </Box>
                <Box className="text-center transform hover:scale-105 transition-transform duration-300">
                  <Typography variant="p" className="font-bold text-3xl text-yellow-500 animate-count-up">
                    15+
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {t('label2')}
                  </Typography>
                </Box>
                <Box className="text-center transform hover:scale-105 transition-transform duration-300">
                  <Typography variant="p" className="font-bold text-3xl text-green-600 animate-count-up">
                    98%
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {t('label3')}
                  </Typography>
                </Box>
              </Box>

              {/* Authentication Buttons */}
              {!isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <a 
                    href="/login"
                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    {t('login')}
                  </a>

                  <a 
                    href="/register"
                    className="group flex items-center justify-center gap-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    {t('register')}
                  </a>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <a 
                    href="/profile"
                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{user?.username?.charAt(0).toUpperCase()}</span>
                    </div>
                    {t('viewProfile')}
                  </a>

                  <button
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <Play className="w-5 h-5" />
                    {t('ariaLabel')}
                  </button>
                </div>
              )}

              {/* Additional CTA for authenticated users */}
              {isAuthenticated && (
                <div className="pt-4">
                  <p className="text-gray-600 text-sm">
                    {t('welcomeBack')}, <span className="font-semibold text-blue-600">{user?.username}</span>! {t('continueLearning')}
                  </p>
                </div>
              )}
            </Box>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 flex justify-center items-center">
            <Box className="relative w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/assets/img/img1.jpg"
                  alt="Hero Image"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                  quality={70}
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Floating authentication badge */}
                {!isAuthenticated && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-pulse-slow">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-gray-700">{t('joinNow')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-float-slow">
                <Translate className="text-blue-600 text-xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-float-medium">
                <School className="text-white text-xl" />
              </div>
              
              {/* New floating element for authentication */}
              <div className="absolute top-1/2 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 shadow-lg animate-float-fast">
                <Groups className="text-white text-xl" />
              </div>
            </Box>
          </div>
        </div>
      </Container>

      {/* Animated Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg 
          className="w-full h-24 text-white animate-wave" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-current"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-current"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current"
          ></path>
        </svg>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes pulse-medium {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes pulse-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.9; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes count-up {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-medium {
          animation: pulse-medium 2s ease-in-out infinite;
        }
        
        .animate-pulse-fast {
          animation: pulse-fast 1.5s ease-in-out infinite;
        }
        
        .animate-pulse-soft {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-count-up {
          animation: count-up 1s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;