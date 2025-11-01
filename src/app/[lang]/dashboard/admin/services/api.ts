// // src/app/[lang]/dashboard/admin/services/api.ts
// import { auth } from "@/lib/firebase";

// // 🔹 Récupération du token Firebase
// async function getToken(): Promise<string> {
//   const user = auth.currentUser;
//   if (!user) throw new Error("Utilisateur non connecté");
//   return user.getIdToken();
// }

// // 🔹 Fonction fetch avec authentification
// async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
//   const token = await getToken();

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//       ...(options.headers || {}),
//     },
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
//   }

//   if (res.status === 204) return null; // No content
//   return res.json().catch(() => null);
// }

// const BASE_URL = "https://lang-courses-api.onrender.com/api";

// // ===================== Courses =====================
// export async function getCourses() {
//   return fetchWithAuth(`${BASE_URL}/courses/`);
// }

// export async function getCourse(id: number | string) {
//   return fetchWithAuth(`${BASE_URL}/courses/${id}/`);
// }

// export async function createCourse(data: { title: string; description?: string; language_code: string }) {
//   return fetchWithAuth(`${BASE_URL}/courses/`, {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// export async function updateCourse(id: number | string, data: any) {
//   return fetchWithAuth(`${BASE_URL}/courses/${id}/`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//   });
// }

// export async function deleteCourse(id: number | string) {
//   return fetchWithAuth(`${BASE_URL}/courses/${id}/`, {
//     method: "DELETE",
//   });
// }

// // ===================== Users =====================
// export async function getUsers() {
//   return fetchWithAuth(`${BASE_URL}/users/`);
// }

// export async function createUser(data: { username: string; email: string; password: string; role?: string }) {
//   return fetchWithAuth(`${BASE_URL}/users/`, {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// }

// export async function updateUser(id: number | string, data: any) {
//   return fetchWithAuth(`${BASE_URL}/users/${id}/`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//   });
// }

// export async function deleteUser(id: number | string) {
//   return fetchWithAuth(`${BASE_URL}/users/${id}/`, {
//     method: "DELETE",
//   });
// }

// export async function toggleUserStatus(id: number | string) {
//   return fetchWithAuth(`${BASE_URL}/users/${id}/toggle_status/`, {
//     method: "POST",
//   });
// }

// src/lib/api.ts
import { getAuth } from "firebase/auth";

// Fonction pour récupérer le token Firebase actuel
async function getFirebaseToken(): Promise<string> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Utilisateur non connecté");

  const token = await user.getIdToken();
  localStorage.setItem("access_token", token); // stocker pour debug ou reusage
  return token;
}

// Fonction fetch générique avec auth
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    // Récupérer le token depuis Firebase ou localStorage
    let token = localStorage.getItem("access_token");
    if (!token) {
      token = await getFirebaseToken();
    }

    // Ajouter les headers
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      // Si 401, on peut forcer la récupération d'un nouveau token
      if (response.status === 401) {
        console.warn("401 détecté, tentative de refresh token...");
        const newToken = await getFirebaseToken();
        const retryResponse = await fetch(url, {
          ...options,
          headers: { ...headers, Authorization: `Bearer ${newToken}` },
        });
        if (!retryResponse.ok) {
          throw new Error(`HTTP error! status: ${retryResponse.status}`);
        }
        return await retryResponse.json();
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err: any) {
    console.error("Erreur fetchWithAuth:", err.message);
    throw err;
  }
}

// Exemples de fonctions API
export async function getUsers() {
  return fetchWithAuth("https://lang-courses-api.onrender.com/api/users/");
}

export async function getCourses() {
  return fetchWithAuth("https://lang-courses-api.onrender.com/api/courses/courses/");
}
