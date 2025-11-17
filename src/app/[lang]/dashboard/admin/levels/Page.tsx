// "use client";

// import React, { useState, useEffect } from "react";
// import { getCourses } from "@/app/[lang]/dashboard/admin/services/courseService";
// import { addLevelToCourse, getLevelsByCourse, updateLevel, deleteLevel } from "@/app/[lang]/dashboard/admin/services/levelService";
// import { useAuth } from "@/app/contexts/AuthContext"; 

// // Mapping des langues/cours vers les drapeaux
// const courseFlags: Record<string, string> = {
//   Japanese: "🇯🇵",
//   Russian: "🇷🇺",
//   English: "🇺🇸",
//   Italian: "🇮🇹",
//   Espagnol: "🇪🇸",
//   Music: "🎵",
//   Italien: "🇮🇹",
//   Korean: "🇰🇷",
//   Allemand: "🇩🇪",
// };

// interface Level {
//   id: number;
//   number: number;
//   title: string;
//   courseId: number;
// }

// interface Course {
//   id: number;
//   title: string;
//   levels?: Level[];
// }

// export default function AddLevelForm() {
//   const { accessToken } = useAuth();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [title, setTitle] = useState("");
//   const [number, setNumber] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [loadingLevels, setLoadingLevels] = useState<number[]>([]);
//   const [editingLevel, setEditingLevel] = useState<Level | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

//   const filteredCourses = courses.filter(course =>
//     course.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const data = await getCourses();
//       setCourses(data);
//       setLoading(false);
//     };
//     fetchCourses();
//   }, []);

//   const fetchLevelsForCourse = async (courseId: number) => {
//     if (!accessToken) return;
    
//     setLoadingLevels(prev => [...prev, courseId]);
//     try {
//       const levels = await getLevelsByCourse(courseId, accessToken);
//       setCourses(prev => prev.map(course => 
//         course.id === courseId ? { ...course, levels } : course
//       ));
//     } catch (err) {
//       console.error("Erreur lors du chargement des niveaux:", err);
//     } finally {
//       setLoadingLevels(prev => prev.filter(id => id !== courseId));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedCourse) return alert("Sélectionnez un cours !");
//     if (!accessToken) return alert("Vous devez être connecté pour créer un level.");

//     setSubmitting(true);
//     try {
//       await addLevelToCourse({ courseId: selectedCourse.id, number, title }, accessToken);
//       alert("Level ajouté au cours !");
//       setTitle("");
//       setNumber(1);
      
//       // Recharger les niveaux du cours
//       await fetchLevelsForCourse(selectedCourse.id);
//     } catch (err: any) {
//       alert(err.message || "Erreur lors de l'ajout du level");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleUpdateLevel = async (level: Level) => {
//     if (!accessToken) return;
    
//     try {
//       await updateLevel(level.id, level, accessToken);
//       setEditingLevel(null);
//       if (selectedCourse) {
//         await fetchLevelsForCourse(selectedCourse.id);
//       }
//       alert("Niveau mis à jour avec succès !");
//     } catch (err: any) {
//       alert(err.message || "Erreur lors de la mise à jour du niveau");
//     }
//   };

//   const handleDeleteLevel = async (levelId: number) => {
//     if (!accessToken) return;
    
//     try {
//       await deleteLevel(levelId, accessToken);
//       setShowDeleteConfirm(null);
//       if (selectedCourse) {
//         await fetchLevelsForCourse(selectedCourse.id);
//       }
//       alert("Niveau supprimé avec succès !");
//     } catch (err: any) {
//       alert(err.message || "Erreur lors de la suppression du niveau");
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-8">
//       {/* Header */}
//       <div className="text-center space-y-4">
//         <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Gestion des Niveaux
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           Gérez les niveaux de vos cours en toute simplicité. Ajoutez, modifiez ou supprimez des niveaux pour chaque cours.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Sidebar - Sélection du cours */}
//         <div className="lg:col-span-1 space-y-6">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//               <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//               Sélection du Cours
//             </h2>
            
//             {/* Barre de recherche */}
//             <div className="relative mb-4">
//               <input
//                 type="text"
//                 placeholder="Rechercher un cours..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               />
//               <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>

//             {/* Liste des cours */}
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {filteredCourses.map(course => (
//                 <div
//                   key={course.id}
//                   className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
//                     selectedCourse?.id === course.id
//                       ? "border-blue-500 bg-blue-50 shadow-md"
//                       : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                   }`}
//                   onClick={() => {
//                     setSelectedCourse(course);
//                     fetchLevelsForCourse(course.id);
//                   }}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <span className="text-2xl">{courseFlags[course.title] || "🏳️"}</span>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-gray-800 truncate">{course.title}</h3>
//                       <p className="text-sm text-gray-500">
//                         {course.levels?.length || 0} niveau{course.levels?.length !== 1 ? 'x' : ''}
//                       </p>
//                     </div>
//                     {selectedCourse?.id === course.id && (
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     )}
//                   </div>
//                 </div>
//               ))}
              
//               {filteredCourses.length === 0 && (
//                 <div className="text-center py-8 text-gray-500">
//                   <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p>Aucun cours trouvé</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Statistiques */}
//           <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
//             <h3 className="font-semibold mb-4">Aperçu des Niveaux</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span>Total des cours</span>
//                 <span className="font-bold">{courses.length}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span>Niveaux créés</span>
//                 <span className="font-bold">
//                   {courses.reduce((acc, course) => acc + (course.levels?.length || 0), 0)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contenu principal */}
//         <div className="lg:col-span-2 space-y-8">
//           {selectedCourse ? (
//             <>
//               {/* En-tête du cours sélectionné */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <span className="text-4xl">{courseFlags[selectedCourse.title] || "🏳️"}</span>
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
//                       <p className="text-gray-600">
//                         Gestion des niveaux - {selectedCourse.levels?.length || 0} niveau{selectedCourse.levels?.length !== 1 ? 'x' : ''} créé{selectedCourse.levels?.length !== 1 ? 's' : ''}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm text-gray-500">ID du cours</div>
//                     <div className="font-mono text-gray-700">#{selectedCourse.id}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Formulaire d'ajout de niveau */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                   <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                   Ajouter un Nouveau Niveau
//                 </h3>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Numéro du niveau *
//                       </label>
//                       <input 
//                         type="number" 
//                         value={number} 
//                         onChange={e => setNumber(Number(e.target.value))}
//                         min="1"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Titre du niveau *
//                       </label>
//                       <input 
//                         type="text" 
//                         value={title} 
//                         onChange={e => setTitle(e.target.value)}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                         placeholder="Ex: Débutant, Intermédiaire, Avancé..."
//                         required
//                       />
//                     </div>
//                   </div>

//                   <button 
//                     type="submit" 
//                     disabled={submitting}
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
//                   >
//                     {submitting ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Création du niveau...
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center">
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                         </svg>
//                         Créer le Niveau
//                       </span>
//                     )}
//                   </button>
//                 </form>
//               </div>

//               {/* Liste des niveaux existants */}
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//                     <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                     Niveaux Existants
//                   </h3>
//                   <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                     {selectedCourse.levels?.length || 0} niveau{selectedCourse.levels?.length !== 1 ? 'x' : ''}
//                   </span>
//                 </div>

//                 {loadingLevels.includes(selectedCourse.id) ? (
//                   <div className="flex justify-center items-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                   </div>
//                 ) : selectedCourse.levels && selectedCourse.levels.length > 0 ? (
//                   <div className="space-y-4">
//                     {selectedCourse.levels
//                       .sort((a, b) => a.number - b.number)
//                       .map(level => (
//                         <div key={level.id} className="group relative">
//                           {editingLevel?.id === level.id ? (
//                             // Mode édition
//                             <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
//                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Numéro
//                                   </label>
//                                   <input
//                                     type="number"
//                                     value={editingLevel.number}
//                                     onChange={e => setEditingLevel({...editingLevel, number: Number(e.target.value)})}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                   />
//                                 </div>
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Titre
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={editingLevel.title}
//                                     onChange={e => setEditingLevel({...editingLevel, title: e.target.value})}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                                   />
//                                 </div>
//                               </div>
//                               <div className="flex space-x-2">
//                                 <button
//                                   onClick={() => handleUpdateLevel(editingLevel)}
//                                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
//                                 >
//                                   Sauvegarder
//                                 </button>
//                                 <button
//                                   onClick={() => setEditingLevel(null)}
//                                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//                                 >
//                                   Annuler
//                                 </button>
//                               </div>
//                             </div>
//                           ) : (
//                             // Affichage normal
//                             <div className="bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-4 transition-all duration-200 hover:shadow-md group-hover:border-gray-300">
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-4">
//                                   <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
//                                     {level.number}
//                                   </div>
//                                   <div>
//                                     <h4 className="font-semibold text-gray-800 text-lg">{level.title}</h4>
//                                     <p className="text-sm text-gray-500">ID: {level.id}</p>
//                                   </div>
//                                 </div>
//                                 <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                   <button
//                                     onClick={() => setEditingLevel(level)}
//                                     className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                                     title="Modifier"
//                                   >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                     </svg>
//                                   </button>
//                                   <button
//                                     onClick={() => setShowDeleteConfirm(level.id)}
//                                     className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                                     title="Supprimer"
//                                   >
//                                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                     </svg>
//                                   </button>
//                                 </div>
//                               </div>

//                               {/* Confirmation de suppression */}
//                               {showDeleteConfirm === level.id && (
//                                 <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                                   <p className="text-red-800 font-medium mb-3">
//                                     Êtes-vous sûr de vouloir supprimer ce niveau ?
//                                   </p>
//                                   <div className="flex space-x-2">
//                                     <button
//                                       onClick={() => handleDeleteLevel(level.id)}
//                                       className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
//                                     >
//                                       Oui, supprimer
//                                     </button>
//                                     <button
//                                       onClick={() => setShowDeleteConfirm(null)}
//                                       className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
//                                     >
//                                       Annuler
//                                     </button>
//                                   </div>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       ))
//                     }
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="text-gray-300 text-6xl mb-4">📚</div>
//                     <h4 className="text-lg font-medium text-gray-600 mb-2">Aucun niveau créé</h4>
//                     <p className="text-gray-500">Commencez par ajouter le premier niveau à ce cours.</p>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             // État sans cours sélectionné
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
//               <div className="text-gray-300 text-6xl mb-4">🎯</div>
//               <h3 className="text-2xl font-semibold text-gray-700 mb-4">Sélectionnez un Cours</h3>
//               <p className="text-gray-500 max-w-md mx-auto">
//                 Choisissez un cours dans la liste de gauche pour commencer à gérer ses niveaux.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { getCourses } from "@/app/[lang]/dashboard/admin/services/courseService";
import { addLevelToCourse, getLevelsByCourse, updateLevel, deleteLevel } from "@/app/[lang]/dashboard/admin/services/levelService";
import { useAuth } from "@/app/contexts/AuthContext";
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const courseFlags: Record<string, string> = {
  Japanese: "🇯🇵",
  Russian: "🇷🇺",
  English: "🇺🇸",
  Italian: "🇮🇹",
  Espagnol: "🇪🇸",
  Music: "🎵",
  Italien: "🇮🇹",
  Korean: "🇰🇷",
  Allemand: "🇩🇪",
};

interface Level {
  id: number;
  number: number;
  title: string;
  courseId: number;
}

interface Course {
  id: number;
  title: string;
  levels?: Level[];
}

export default function AddLevelForm() {
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadingLevels, setLoadingLevels] = useState<number[]>([]);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const fetchLevelsForCourse = async (courseId: number) => {
    if (!accessToken) return;
    
    setLoadingLevels(prev => [...prev, courseId]);
    try {
      const levels = await getLevelsByCourse(courseId, accessToken);
      setCourses(prev => prev.map(course => 
        course.id === courseId ? { ...course, levels } : course
      ));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLevels(prev => prev.filter(id => id !== courseId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return alert("Sélectionnez un cours !");
    if (!accessToken) return alert("Vous devez être connecté pour créer un level.");

    setSubmitting(true);
    try {
      await addLevelToCourse({ courseId: selectedCourse.id, number, title }, accessToken);
      setTitle("");
      setNumber(1);
      await fetchLevelsForCourse(selectedCourse.id);
      alert("Level ajouté au cours !");
    } catch (err: any) {
      alert(err.message || "Erreur lors de l'ajout du level");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateLevel = async (level: Level) => {
    if (!accessToken) return;
    try {
      await updateLevel(level.id, level, accessToken);
      setEditingLevel(null);
      if (selectedCourse) await fetchLevelsForCourse(selectedCourse.id);
      alert("Niveau mis à jour !");
    } catch (err: any) {
      alert(err.message || "Erreur lors de la mise à jour");
    }
  };

  const handleDeleteLevel = async (levelId: number) => {
    if (!accessToken) return;
    try {
      await deleteLevel(levelId, accessToken);
      setShowDeleteConfirm(null);
      if (selectedCourse) await fetchLevelsForCourse(selectedCourse.id);
      alert("Niveau supprimé !");
    } catch (err: any) {
      alert(err.message || "Erreur lors de la suppression");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Gestion des Niveaux
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ajoutez, modifiez ou supprimez les niveaux de vos cours facilement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiSearch className="text-blue-600" /> Sélection du cours
            </h2>
            <input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                    selectedCourse?.id === course.id
                      ? "border-blue-500 bg-blue-50 shadow"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedCourse(course);
                    fetchLevelsForCourse(course.id);
                  }}
                >
                  <span className="text-2xl">{courseFlags[course.title] || "🏳️"}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.levels?.length || 0} niveau{course.levels?.length !== 1 ? 'x' : ''}</p>
                  </div>
                  {selectedCourse?.id === course.id && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
              ))}
              {filteredCourses.length === 0 && <p className="text-gray-500 text-center py-8">Aucun cours trouvé</p>}
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-md p-6 text-white">
            <h3 className="font-semibold mb-4">Aperçu des Niveaux</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total des cours</span>
                <span className="font-bold">{courses.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Niveaux créés</span>
                <span className="font-bold">{courses.reduce((acc, c) => acc + (c.levels?.length || 0), 0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-8">
          {selectedCourse ? (
            <>
              {/* En-tête du cours */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{courseFlags[selectedCourse.title] || "🏳️"}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
                    <p className="text-gray-600">{selectedCourse.levels?.length || 0} niveau{selectedCourse.levels?.length !== 1 ? 'x' : ''}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-mono">#{selectedCourse.id}</span>
              </div>

              {/* Formulaire */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <FiPlus className="text-green-600" /> Ajouter un Nouveau Niveau
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numéro *</label>
                    <input type="number" min="1" value={number} onChange={e => setNumber(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                      placeholder="Ex: Débutant, Intermédiaire..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="col-span-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus /> {submitting ? "Création..." : "Créer le Niveau"}
                  </button>
                </form>
              </div>

              {/* Liste des niveaux */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FiCheck className="text-blue-600" /> Niveaux Existants
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCourse.levels?.length || 0} niveau{selectedCourse.levels?.length !== 1 ? 'x' : ''}
                  </span>
                </div>

                {loadingLevels.includes(selectedCourse.id) ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
                  </div>
                ) : selectedCourse.levels && selectedCourse.levels.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCourse.levels.sort((a,b)=>a.number-b.number).map(level => (
                      <div key={level.id} className="bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm transition-all">
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg">
                            {level.number}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{level.title}</h4>
                            <p className="text-sm text-gray-500">ID: {level.id}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditingLevel(level)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          ><FiEdit /></button>
                          <button onClick={() => setShowDeleteConfirm(level.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          ><FiTrash2 /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">📚</div>
                    <p>Aucun niveau créé. Ajoutez-en un !</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Sélectionnez un Cours</h3>
              <p className="text-gray-500 max-w-md mx-auto">Choisissez un cours dans la liste de gauche pour commencer à gérer ses niveaux.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
