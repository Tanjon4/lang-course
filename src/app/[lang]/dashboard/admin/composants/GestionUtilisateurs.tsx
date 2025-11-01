"use client";

import { useEffect, useState } from "react";
import { User, getUsers, createUser, updateUser, deleteUser, toggleUserStatus } from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function GestionUtilisateurs() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ username: "", email: "", status: "active" as "active" | "suspendu" });

  // 🔹 Récupérer les utilisateurs
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      if (err.message.includes("Utilisateur non connecté")) {
        toast.error("Vous devez être connecté pour accéder aux utilisateurs.");
      } else {
        toast.error(err.message || "Erreur lors de la récupération des utilisateurs.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Gestion des changements de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Ajouter / Modifier un utilisateur
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        toast.success("Utilisateur mis à jour !");
      } else {
        await createUser(formData);
        toast.success("Utilisateur créé !");
      }
      setModalOpen(false);
      setEditingUser(null);
      setFormData({ username: "", email: "", status: "active" });
      fetchUsers();
    } catch (err: any) {
      if (err.message.includes("Utilisateur non connecté")) {
        toast.error("Vous devez être connecté pour créer ou modifier un utilisateur.");
      } else {
        toast.error(err.message || "Erreur lors de l'opération.");
      }
      console.error(err);
    }
  };

  // 🔹 Supprimer un utilisateur
  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      toast.success("Utilisateur supprimé !");
      fetchUsers();
    } catch (err: any) {
      if (err.message.includes("Utilisateur non connecté")) {
        toast.error("Vous devez être connecté pour supprimer un utilisateur.");
      } else {
        toast.error(err.message || "Erreur lors de la suppression.");
      }
      console.error(err);
    }
  };

  // 🔹 Changer le statut
  const handleToggleStatus = async (user: User) => {
    try {
      await toggleUserStatus(user.id, user.status === "active" ? "suspendu" : "active");
      toast.success("Statut modifié !");
      fetchUsers();
    } catch (err: any) {
      if (err.message.includes("Utilisateur non connecté")) {
        toast.error("Vous devez être connecté pour modifier le statut.");
      } else {
        toast.error(err.message || "Erreur lors de la modification du statut.");
      }
      console.error(err);
    }
  };

  // 🔹 Ouvrir la modale pour modifier
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({ username: user.username, email: user.email, status: user.status });
    setModalOpen(true);
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Chargement...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestion des utilisateurs</h1>

      <button
        className="mb-4 px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        onClick={() => setModalOpen(true)}
      >
        Ajouter un utilisateur
      </button>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Nom d'utilisateur</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Statut</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map(user => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition" onClick={() => openEditModal(user)}>Modifier</button>
                    <button className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition" onClick={() => handleToggleStatus(user)}>
                      {user.status === "active" ? "Suspendre" : "Réactiver"}
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition" onClick={() => handleDelete(user.id)}>Supprimer</button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        <AnimatePresence>
          {users.map(user => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-white rounded-lg shadow p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">{user.username}</h2>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {user.status}
                </span>
              </div>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button className="flex-1 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition" onClick={() => openEditModal(user)}>Modifier</button>
                <button className="flex-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition" onClick={() => handleToggleStatus(user)}>
                  {user.status === "active" ? "Suspendre" : "Réactiver"}
                </button>
                <button className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition" onClick={() => handleDelete(user.id)}>Supprimer</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">{editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Nom d'utilisateur</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label className="block text-gray-700">Statut</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="suspendu">Suspendu</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button type="button" onClick={() => { setModalOpen(false); setEditingUser(null); }} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editingUser ? "Modifier" : "Ajouter"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
