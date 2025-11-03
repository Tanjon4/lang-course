"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/app/contexts/AuthContext";
import { getUsers, updateUser, deleteUser, toggleUserStatus, User } from "@/app/[lang]/dashboard/admin/services/api";

export default function GestionUtilisateurs() {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    status: "active" as "active" | "suspendu",
  });

  // Vérification rôle admin
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      toast.error("Vous n'avez pas la permission d'accéder à cette page.");
    }
  }, [loading, user]);

  // Charger les utilisateurs
  const fetchUsers = async () => {
    if (!user || user.role !== "admin") return;
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err: any) {
      toast.error("Erreur lors de la récupération des utilisateurs.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") fetchUsers();
  }, [user]);

  // Changement du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission modification utilisateur
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

  // Suppression utilisateur
  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      toast.success("Utilisateur supprimé !");
      fetchUsers();
    } catch (err: any) {
      console.error("Erreur suppression :", err);
      toast.error(err.response?.data?.message || "Erreur lors de la suppression.");
    }
  };

  // Toggle statut actif/suspendu
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

  // Ouvrir modal modification
  const openEditModal = (u: User) => {
    setEditingUser(u);
    setFormData({ username: u.username, email: u.email, status: u.status });
    setModalOpen(true);
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  if (!user || user.role !== "admin") return <p className="text-center mt-10 text-red-500">Accès refusé.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestion des utilisateurs</h1>

      {/* Tableau des utilisateurs */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Nom</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Statut</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{u.id}</td>
                <td className="px-4 py-2 border-b">{u.username}</td>
                <td className="px-4 py-2 border-b">{u.email}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded text-white cursor-pointer ${
                      u.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                    onClick={() => handleToggleStatus(u)}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => openEditModal(u)}
                  >
                    Modifier
                  </button>
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(u.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal modification */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Modifier l'utilisateur</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Nom d'utilisateur</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Statut</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="suspendu">Suspendu</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Modifier
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
