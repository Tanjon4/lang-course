import React, { useState } from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import { Star, Groups, School, Translate } from '@mui/icons-material';
import { Play, Users, Award, Clock } from 'lucide-react';
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
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden"
    >
      {/* Enhanced Background with gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-20 w-80 h-80 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-medium animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200 to-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-fast animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <Container maxWidth="xl" className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-8 lg:py-16 gap-8 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8 max-w-2xl mx-auto lg:mx-0">
            <Box className="space-y-8">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-500 hover:scale-105 group">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {t('text')}
                </span>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="text-xs text-gray-500 font-medium">🚀 {t('new')}</span>
              </div>

              {/* Enhanced Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                  <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    {t('line1')}
                  </span>
                  <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
                    {t('line2')}
                  </span>
                </h1>

                {/* Enhanced Subtitle */}
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-2xl">
                  {t('subtitle')}
                  <span className="block mt-3 text-lg text-gray-500 font-normal">
                    ✨ {t('discoverMore')}
                  </span>
                </p>
              </div>

              {/* Enhanced Stats */}
              <Box className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                {[
                  { 
                    value: "50+", 
                    label: t('label1'), 
                    icon: Users,
                    color: "from-blue-500 to-cyan-500",
                    bgColor: "bg-blue-50"
                  },
                  { 
                    value: "10+", 
                    label: t('label2'), 
                    icon: Award,
                    color: "from-amber-500 to-orange-500",
                    bgColor: "bg-amber-50"
                  },
                  { 
                    value: "80%", 
                    label: t('label3'), 
                    icon: Clock,
                    color: "from-emerald-500 to-green-500",
                    bgColor: "bg-emerald-50"
                  }
                ].map((stat, index) => (
                  <Box 
                    key={index}
                    className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50 overflow-hidden"
                  >
                    {/* Background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${stat.bgColor} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                      </div>
                      <Typography variant="h3" className={`font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 animate-count-up`}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 font-semibold text-sm">
                        {stat.label}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </Box>

              {/* Enhanced Authentication Buttons */}
              <div className="space-y-6 pt-8">
                {!isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`/${lang}/auth/login`}
                      className="group relative flex items-center justify-center gap-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-10 py-5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 font-bold text-lg hover:shadow-orange-500/25 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span className="z-10">{t('login')}</span>
                    </a>

                    <a 
                      href={`/${lang}/auth/register`}
                      className="group flex items-center justify-center gap-4 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-10 py-5 rounded-2xl transform hover:scale-105 transition-all duration-500 font-bold text-lg hover:shadow-lg backdrop-blur-sm bg-white/70 hover:border-orange-600"
                    >
                      <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      {t('register')}
                    </a>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={`/${lang}/auth/profile`}
                        className="group relative flex items-center justify-center gap-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 font-bold text-lg hover:shadow-emerald-500/25 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
                          <span className="text-sm font-black text-white">
                            {user?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="z-10">{t('viewProfile')}</span>
                      </a>

                      <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 font-bold text-lg hover:shadow-purple-500/25">
                        <Play className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
                        {t('ariaLabel')}
                      </button>
                    </div>

                    {/* Enhanced Welcome message */}
                    <div className="bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                      <p className="text-gray-700 text-lg text-center font-medium">
                        {t('welcomeBack')}, <span className="font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.username}</span>! 🎉 {t('continueLearning')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Box>
          </div>

          {/* Enhanced Right Content - Image */}
          <div className="flex-1 flex justify-center items-center w-full max-w-2xl">
            <Box className="relative w-full">
              {/* Main Image Container */}
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700 hover:shadow-3xl group">
                
                {imageError ? (
                  <div className="w-full h-96 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center justify-center rounded-[3rem] p-8">
                    <School className="text-gray-400 text-6xl mb-6" />
                    <p className="text-gray-600 font-bold text-xl mb-2">Image non disponible</p>
                    <p className="text-gray-500 text-sm text-center">public/img/img1.jpg</p>
                    <button 
                      onClick={() => setImageError(false)}
                      className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Réessayer
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src="/img/img1.jpg"
                      alt="Apprentissage des langues"
                      className="w-full h-auto object-cover min-h-[500px] transform group-hover:scale-110 transition-transform duration-1000"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                  </div>
                )}
                
                {/* Enhanced floating authentication badge */}
                {!isAuthenticated && (
                  <div className="absolute top-8 right-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl px-6 py-4 shadow-2xl animate-pulse-slow border border-white/20 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-white rounded-full animate-ping absolute"></div>
                        <div className="w-3 h-3 bg-white rounded-full relative"></div>
                      </div>
                      <span className="text-white font-bold text-sm">{t('joinNow')} 🚀</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl animate-float-slow hover:scale-110 transition-all duration-500 border border-white/50 group">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-3">
                  <Translate className="text-white text-3xl" />
                </div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-5 shadow-2xl animate-float-medium hover:scale-110 transition-all duration-500 border border-white/50 group">
                <School className="text-white text-3xl" />
              </div>
              
              <div className="absolute top-1/2 -left-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-5 shadow-2xl animate-float-fast hover:scale-110 transition-all duration-500 border border-white/50 group">
                <Groups className="text-white text-3xl" />
              </div>

              {/* Additional enhanced floating element */}
              <div className="absolute bottom-16 -right-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-4 shadow-2xl animate-float-slow animation-delay-1000 hover:scale-110 transition-all duration-500 border border-white/50 group">
                <Star className="text-white text-2xl" />
              </div>
            </Box>
          </div>
        </div>
      </Container>

      {/* Enhanced Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg 
          className="w-full h-24 md:h-32 text-white animate-wave-slow" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".3" 
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
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          50% { transform: translateX(-30px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-3deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes count-up {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-wave-slow {
          animation: wave 10s ease-in-out infinite;
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
        
        .animate-count-up {
          animation: count-up 1s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;