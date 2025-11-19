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

      {/* Modal modification */}
<AnimatePresence>
  {modalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={() => setModalOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-700 p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Modifier l'utilisateur</h2>
          <button
            onClick={() => setModalOpen(false)}
            className="text-white/80 hover:text-white"
          >
            <FiXCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Rôle</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-1 border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Actif</option>
                <option value="suspendu">Suspendu</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-3 rounded-xl border border-gray-300 bg-gray-100 hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-blue-700 text-white hover:bg-blue-800 shadow-md"
            >
              Modifier
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
