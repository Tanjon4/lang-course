import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, Chip } from '@mui/material';
import { PlayArrow, Star, Groups, School, Translate, Language, EmojiPeople } from '@mui/icons-material';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  return (
    <section id='home' className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden rounded-2xl shadow-lg">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-20 w-50 h-50 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating elements */}
      {/* <div className="absolute top-1/4 left-10 animate-float-slow">
        <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
          <Language className="text-blue-600 text-2xl" />
        </div>
      </div>
      
      <div className="absolute top-1/3 right-20 animate-float-medium">
        <div className="bg-yellow-400/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
          <School className="text-white text-2xl" />
        </div>
      </div>
      
      <div className="absolute bottom-1/3 left-20 animate-float-fast">
        <div className="bg-green-400/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
          <EmojiPeople className="text-white text-2xl" />
        </div>
      </div>
      
      <div className="absolute top-1/2 right-10 animate-float-slow">
        <div className="bg-red-400/80 backdrop-blur-sm rounded-full p-3 shadow-lg">
          <Groups className="text-white text-2xl" />
        </div>
      </div> */}

      {/* Floating text elements */}
      {/* <div className="absolute top-20 right-1/4 animate-float-slow">
        <span className="bg-white/90 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {t('french')}
        </span>
      </div>
      
      <div className="absolute bottom-40 right-60 animate-float-medium">
        <span className="bg-white/90 text-green-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {t('english')}
        </span>
      </div>
      
      <div className="absolute top-40 right-40 animate-float-fast">
        <span className="bg-white/90 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {t('spanish')}
        </span>
      </div> */}

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

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-400 px-2 py-1 rounded-md shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse"
                >
                  <Play className="w-5 h-5" />
                  {t('ariaLabel')}
                </button>

                <button
                  className="px-2 py-1 border-2 border-gray-300 text-gray-700 rounded-md hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                >
                  {t('text3')}
                </button>
              </div>
            </Box>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 flex justify-center items-center">
            <Box className="relative w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
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
              </div>

              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-float-slow">
                <Translate className="text-blue-600 text-xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-float-medium">
                <School className="text-white text-xl" />
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