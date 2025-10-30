import React, { useState } from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import { Star, Groups, School, Translate } from '@mui/icons-material';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/app/contexts/AuthContext';
import { useParams } from 'next/navigation';

const HeroSection = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const params = useParams();
  const lang = params.lang || 'en';

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    
    <section 
      id="/" 
      className="relative min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 overflow-hidden rounded-2xl shadow-xl"
    >
      
      {/* Background decorative elements - améliorés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-medium animation-delay-2000"></div>
        <div className="absolute top-40 left-20 w-70 h-70 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-fast animation-delay-4000"></div>
      </div>

      <Container maxWidth="lg" className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-12 md:py-8 gap-8 md:gap-12">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8 max-w-2xl">
            <Box className="space-y-6">
              {/* Badge */}
              <Chip
                icon={<Star className="text-yellow-500" />}
                label={t('text')}
                className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full px-4 py-3 mb-2 hover:shadow-xl transition-all duration-300 border border-gray-100"
                sx={{
                  '& .MuiChip-label': {
                    fontWeight: 700,
                    color: 'rgb(34 197 94)',
                    fontSize: '0.875rem'
                  }
                }}
              />

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  {t('line1')}{' '}
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-orange-300 to-amber-600 animate-linear-x">
                    {t('line2')}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
                  {t('subtitle')}
                </p>
              </div>

              {/* Stats */}
              <Box className="flex flex-wrap gap-8 pt-6">
                {[
                  { value: "50K+", label: t('label1'), color: "text-blue-600" },
                  { value: "15+", label: t('label2'), color: "text-yellow-500" },
                  { value: "98%", label: t('label3'), color: "text-green-600" }
                ].map((stat, index) => (
                  <Box 
                    key={index}
                    className="text-center transform hover:scale-110 transition-transform duration-300 bg-white/50 backdrop-blur-sm rounded-2xl p-4 min-w-[100px] shadow-md hover:shadow-lg"
                  >
                    <Typography variant="h4" className={`font-black ${stat.color} animate-count-up`}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 font-medium text-sm">
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Authentication Buttons */}
              <div className="space-y-4 pt-6">
                {!isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`/${lang}/auth/login`}
                      className="group flex items-center justify-center gap-3 bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      {t('login')}
                    </a>

                    <a 
                      href={`/${lang}/auth/register`}
                      className="group flex items-center justify-center gap-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 font-semibold hover:shadow-lg backdrop-blur-sm bg-white/50"
                    >
                      <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      {t('register')}
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={`/${lang}/auth/profile`}
                        className="group flex items-center justify-center gap-3 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                      >
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <span className="text-sm font-bold text-white">
                            {user?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {t('viewProfile')}
                      </a>

                      <button className="group flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold">
                        <Play className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
                        {t('ariaLabel')}
                      </button>
                    </div>

                    {/* Welcome message */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                      <p className="text-gray-700 text-sm text-center">
                        {t('welcomeBack')}, <span className="font-semibold text-blue-600">{user?.username}</span>! {t('continueLearning')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Box>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 flex justify-center items-center w-full max-w-xl">
            <Box className="relative w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 hover:shadow-3xl">
                
                {imageError ? (
                  <div className="w-full h-80 bg-linear-to-br from-blue-200 to-purple-200 flex flex-col items-center justify-center rounded-3xl p-6">
                    <School className="text-gray-400 text-5xl mb-4" />
                    <p className="text-gray-600 font-semibold text-lg">Image non disponible</p>
                    <p className="text-gray-500 text-sm mt-2 text-center">public/img/img1.jpg</p>
                    <button 
                      onClick={() => setImageError(false)}
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-md"
                    >
                      Réessayer
                    </button>
                  </div>
                ) : (
                  <img
                    src="/img/img1.jpg"
                    alt="Apprentissage des langues"
                    className="w-full h-auto object-cover min-h-[450px]"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                )}
                
                {/* Overlay linear */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                
                {/* Floating authentication badge */}
                {!isAuthenticated && (
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl animate-pulse-slow border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      <span className="text-sm font-bold text-gray-800">{t('joinNow')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl animate-float-slow hover:scale-110 transition-transform duration-300 border border-gray-100">
                <Translate className="text-blue-600 text-2xl" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-yellow-400/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl animate-float-medium hover:scale-110 transition-transform duration-300">
                <School className="text-white text-2xl" />
              </div>
              <div className="absolute top-1/2 -left-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl p-4 shadow-2xl animate-float-fast hover:scale-110 transition-transform duration-300">
                <Groups className="text-white text-2xl" />
              </div>

              {/* Additional floating element */}
              <div className="absolute bottom-10 -right-8 bg-linear-to-r from-green-400 to-emerald-500 rounded-2xl p-3 shadow-2xl animate-float-slow animation-delay-1000 hover:scale-110 transition-transform duration-300">
                <Star className="text-white text-xl" />
              </div>
            </Box>
          </div>
        </div>
      </Container>

      {/* Enhanced Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg 
          className="w-full h-20 md:h-24 text-white animate-wave-slow" 
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
        
        @keyframes linear {
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
        
        .animate-linear {
          background-size: 200% 200%;
          animation: linear 3s ease infinite;
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