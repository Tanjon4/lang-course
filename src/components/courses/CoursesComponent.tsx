// components/courses/CoursesComponent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useCourses } from '@/lib/hooks/useCourses';
import {
  PlayCircle,
  Lock,
  CheckCircle,
  Clock,
  BookOpen,
  Users,
  Star,
  Award,
  ArrowLeft,
} from 'lucide-react';
import { courseService } from '@/services/courseService';
import { CourseGlobal, UserProgressOverview } from '@/types/course';
import CourseCard from '../course/CourseCard';
import CourseDetail from './CourseDetail';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`courses-tabpanel-${index}`}
      aria-labelledby={`courses-tab-${index}`}
      {...other}
    >
      {value === index && <div className="p-6">{children}</div>}
    </div>
  );
}

const CoursesComponent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { enrollToCourse, loading: enrollLoading } = useCourses();
  
  const [tabValue, setTabValue] = useState(0);
  const [courses, setCourses] = useState<CourseGlobal[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseGlobal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('🔐 CoursesComponent Auth:', { isAuthenticated, user: !!user });

  useEffect(() => {
    loadCourses();
  }, [isAuthenticated]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      console.log('📚 Loading courses...');
      const coursesData = await courseService.getCourses();
      console.log('✅ Courses loaded:', coursesData.length);
      setCourses(coursesData);
    } catch (err) {
      const errorMsg = 'Erreur lors du chargement des cours';
      setError(errorMsg);
      console.error(errorMsg, err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: number) => {
    console.log('🎯 handleEnroll called for course:', courseId);
    
    if (!isAuthenticated || !user) {
      const errorMsg = 'Veuillez vous connecter pour vous inscrire à un cours';
      setError(errorMsg);
      console.error('❌', errorMsg);
      return;
    }

    try {
      console.log('🔄 Starting enrollment process...');
      await enrollToCourse(courseId);
      console.log('✅ Enrollment successful, reloading data...');
      
      // Recharger les données
      await loadCourses();
      
    } catch (err: any) {
      const errorMsg = err.message || 'Erreur lors de l\'inscription au cours';
      setError(errorMsg);
      console.error('❌ Enrollment error:', errorMsg);
    }
  };

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const handleCourseSelect = (course: CourseGlobal) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    loadCourses();
  };

  // Filtrer les cours selon l'onglet sélectionné
  const getFilteredCourses = () => {
    switch (tabValue) {
      case 0: // Tous les cours
        return courses;
      case 1: // En cours
        return courses.filter(course => 
          course.progress?.enrolled && !course.progress.completed_course
        );
      case 2: // Terminés
        return courses.filter(course => 
          course.progress?.completed_course
        );
      default:
        return courses;
    }
  };

  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        onBack={handleBackToCourses}
        onEnroll={handleEnroll}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const filteredCourses = getFilteredCourses();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              ×
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden">
          {/* Tabs */}
          <div className="text-white">
            <div className="flex border-b border-indigo-200">
              {['Tous les cours', 'En cours', 'Terminés'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(index)}
                  className={`flex-1 px-6 py-4 font-semibold text-center transition-all ${
                    tabValue === index
                      ? 'bg-gradient-to-r from-orange-200 to-amber-400 bg-opacity-20 text-zinc-500 shadow-lg'
                      : 'text-black opacity-90 hover:opacity-100 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {tab} {index === 0 ? `(${courses.length})` : index === 1 ? `(${filteredCourses.length})` : `(${filteredCourses.length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <TabPanel value={tabValue} index={0}>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun cours disponible</h3>
                <p className="text-gray-500">Les cours seront bientôt disponibles.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={handleCourseSelect}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <PlayCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun cours en progression</h3>
                <p className="text-gray-500">Inscrivez-vous à un cours pour commencer votre apprentissage.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={handleCourseSelect}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun cours terminé</h3>
                <p className="text-gray-500">Continuez vos cours en progression pour les terminer.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={handleCourseSelect}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
            )}
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default CoursesComponent;