// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";
// import { useAuth } from "@/app/contexts/AuthContext";
// import { getUsers, updateUser, deleteUser, toggleUserStatus, User } from "@/app/[lang]/dashboard/admin/services/api";

// export default function GestionUtilisateurs() {
//   const { user, loading } = useAuth();
//   const [users, setUsers] = useState<User[]>([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     status: "active" as "active" | "suspendu",
//     role: "user" as "user" | "admin",
//   });

//   // Vérification rôle admin
//   useEffect(() => {
//     if (!loading && (!user || user.role !== "admin")) {
//       toast.error("Vous n'avez pas la permission d'accéder à cette page.");
//     }
//   }, [loading, user]);

//   // Charger les utilisateurs
//   const fetchUsers = async () => {
//     if (!user || user.role !== "admin") return;
//     try {
//       const res = await getUsers();
//       setUsers(res);
//     } catch (err: any) {
//       toast.error("Erreur lors de la récupération des utilisateurs.");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (user && user.role === "admin") fetchUsers();
//   }, [user]);

//   // Changement du formulaire
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Soumission modification utilisateur
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editingUser) return;

//     try {
//       await updateUser(editingUser.id, formData);
//       toast.success("Utilisateur mis à jour !");
//       setModalOpen(false);
//       setEditingUser(null);
//       fetchUsers();
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Erreur lors de la mise à jour.");
//       console.error(err);
//     }
//   };

//   // Suppression utilisateur
//   const handleDelete = async (id: number) => {
//     if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
//     try {
//       await deleteUser(id);
//       toast.success("Utilisateur supprimé !");
//       fetchUsers();
//     } catch (err: any) {
//       console.error("Erreur suppression :", err);
//       toast.error(err.response?.data?.message || "Erreur lors de la suppression.");
//     }
//   };

//   // Toggle statut actif/suspendu
//   const handleToggleStatus = async (u: User) => {
//     try {
//       await toggleUserStatus(u.id, u.status === "active" ? "suspendu" : "active");
//       toast.success("Statut modifié !");
//       fetchUsers();
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Erreur lors de la modification du statut.");
//       console.error(err);
//     }
//   };

//   // Ouvrir modal modification
//   const openEditModal = (u: User) => {
//     setEditingUser(u);
//     setFormData({ 
//       username: u.username, 
//       email: u.email, 
//       status: u.status,
//       role: u.role 
//     });
//     setModalOpen(true);
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//     </div>
//   );
  
//   if (!user || user.role !== "admin") return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//           <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//           </svg>
//         </div>
//         <p className="text-xl font-semibold text-gray-700">Accès refusé</p>
//         <p className="text-gray-500 mt-2">Vous n'avez pas les permissions nécessaires</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
//       <Toaster 
//         position="top-right" 
//         toastOptions={{
//           className: 'bg-white shadow-lg border border-gray-100',
//           style: {
//             padding: '16px',
//             color: '#374151',
//           },
//         }}
//       />
      
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Gestion des Utilisateurs
//             </h1>
//             <p className="text-gray-600 mt-2">Administrez et gérez les comptes utilisateurs de votre plateforme</p>
//           </div>
//           <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
//             <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium text-gray-700">
//               {users.length} utilisateur{users.length > 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>
//       </motion.div>

//       {/* Tableau des utilisateurs */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 overflow-hidden"
//       >
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-50 to-purple-50/50 border-b border-gray-100">
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Utilisateur
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Rôle
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Statut
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100/50">
//               {users.map((u, index) => (
//                 <motion.tr 
//                   key={u.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   className="hover:bg-gray-50/50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
//                         {u.username.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-semibold text-gray-900">{u.username}</div>
//                         <div className="text-sm text-gray-500">ID: {u.id}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{u.email}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                         u.role === "admin" 
//                           ? "bg-purple-100 text-purple-800 ring-1 ring-purple-200" 
//                           : "bg-blue-100 text-blue-800 ring-1 ring-blue-200"
//                       }`}
//                     >
//                       {u.role === "admin" ? (
//                         <>
//                           <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Administrateur
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                           </svg>
//                           Utilisateur
//                         </>
//                       )}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button
//                       onClick={() => handleToggleStatus(u)}
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
//                         u.status === "active" 
//                           ? "bg-green-100 text-green-800 ring-1 ring-green-200 hover:bg-green-200" 
//                           : "bg-red-100 text-red-800 ring-1 ring-red-200 hover:bg-red-200"
//                       }`}
//                     >
//                       <div className={`w-2 h-2 rounded-full mr-2 ${u.status === "active" ? "bg-green-500" : "bg-red-500"}`}></div>
//                       {u.status === "active" ? "Actif" : "Suspendu"}
//                     </button>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex items-center space-x-2 transition-opacity duration-200">
//                       <button
//                         onClick={() => openEditModal(u)}
//                         className="inline-flex items-center px-3 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-sm"
//                       >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Modifier
//                       </button>
//                       <button
//                         onClick={() => handleDelete(u.id)}
//                         className="inline-flex items-center px-3 py-2 bg-white text-red-600 rounded-lg border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 hover:shadow-sm"
//                       >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                         Supprimer
//                       </button>
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </motion.div>

//       {/* Modal modification */}
//       <AnimatePresence>
//         {modalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
//             onClick={() => setModalOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Header modal */}
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-white">Modifier l'utilisateur</h2>
//                   <button
//                     onClick={() => setModalOpen(false)}
//                     className="text-white/80 hover:text-white transition-colors duration-200"
//                   >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//                 <p className="text-blue-100 mt-1">Mettez à jour les informations de l'utilisateur</p>
//               </div>

//               {/* Formulaire */}
//               <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Nom d'utilisateur
//                   </label>
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Rôle
//                     </label>
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 appearance-none"
//                     >
//                       <option value="user">Utilisateur</option>
//                       <option value="admin">Administrateur</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Statut
//                     </label>
//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleChange}
//                       className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 appearance-none"
//                     >
//                       <option value="active">Actif</option>
//                       <option value="suspendu">Suspendu</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-end space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setModalOpen(false);
//                       setEditingUser(null);
//                     }}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
//                   >
//                     Annuler
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                   >
//                     <div className="flex items-center">
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       Modifier
//                     </div>
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/app/contexts/AuthContext";
import { getUsers, updateUser, deleteUser, toggleUserStatus, User } from "@/app/[lang]/dashboard/admin/services/api";
import { FiUser, FiShield, FiCheckCircle, FiXCircle, FiEdit, FiTrash2 } from "react-icons/fi";

export default function GestionUtilisateurs() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    status: "active" as "active" | "suspendu",
    role: "user" as "user" | "admin",
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      toast.error("Vous n'avez pas la permission d'accéder à cette page.");
    }
  }, [loading, user]);

  const fetchUsers = async () => {
    if (!user || user.role !== "admin") return;
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (err: any) {
      toast.error("Erreur lors de la récupération des utilisateurs.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") fetchUsers();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await updateUser(editingUser.id, formData);
      toast.success("Utilisateur mis à jour !");
      setModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erreur lors de la mise à jour.");
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      toast.success("Utilisateur supprimé !");
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur lors de la suppression.");
    }
  };

  const handleToggleStatus = async (u: User) => {
    try {
      await toggleUserStatus(u.id, u.status === "active" ? "suspendu" : "active");
      toast.success("Statut modifié !");
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erreur lors de la modification du statut.");
      console.error(err);
    }
  };

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setFormData({ 
      username: u.username, 
      email: u.email, 
      status: u.status,
      role: u.role 
    });
    setModalOpen(true);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
    </div>
  );

  if (!user || user.role !== "admin") return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center shadow-md">
          <FiXCircle className="w-12 h-12 text-red-500" />
        </div>
        <p className="text-2xl font-bold text-gray-700">Accès refusé</p>
        <p className="text-gray-500 mt-2">Vous n'avez pas les permissions nécessaires</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'bg-white text-blue-700 shadow-md border border-blue-200',
          style: { padding: '16px', color: '#1e3a8a' },
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-700">
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Administrez et gérez les comptes utilisateurs</p>
          </div>
          <div className="flex items-center space-x-3 bg-blue-50 px-5 py-2 rounded-2xl shadow-md">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">
              {users.length} utilisateur{users.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tableau des utilisateurs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-50 border-b border-gray-100">
                {["Utilisateur", "Email", "Rôle", "Statut", "Actions"].map((title) => (
                  <th key={title} className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u, index) => (
                <motion.tr 
                  key={u.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center text-white font-bold">
                      <FiUser className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-blue-700">{u.username}</div>
                      <div className="text-xs text-gray-500">ID: {u.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-700 text-sm">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-cyan-100 text-cyan-800"
                    }`}>
                      {u.role === "admin" ? <FiShield className="w-3 h-3"/> : <FiUser className="w-3 h-3"/>}
                      {u.role === "admin" ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        u.status === "active" 
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {u.status === "active" ? <FiCheckCircle className="w-3 h-3"/> : <FiXCircle className="w-3 h-3"/>}
                      {u.status === "active" ? "Actif" : "Suspendu"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button onClick={() => openEditModal(u)} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-1 hover:bg-blue-100 transition-all">
                      <FiEdit /> Modifier
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg flex items-center gap-1 hover:bg-red-200 transition-all">
                      <FiTrash2 /> Supprimer
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
