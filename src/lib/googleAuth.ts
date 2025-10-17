import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Maka id_token avy amin'ny Firebase Google login
export const loginWithGoogle = async (): Promise<string> => {
  const result = await signInWithPopup(auth, googleProvider);
  if (!result.user) throw new Error("Firebase login échoué");

  const idToken = await result.user.getIdToken();
  return idToken;
};

// Alefa any amin'ny backend mba hahazoana JWT
export const loginToBackendWithGoogle = async (idToken: string) => {
  const res = await fetch("https://lang-courses-api.onrender.com/api/users/firebase/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erreur login backend");
  }

  return res.json(); // => { access, refresh, user, created }
};
