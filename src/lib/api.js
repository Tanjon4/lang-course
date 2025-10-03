export async function login(email, password) {
  const res = await fetch("http://127.0.0.1:8000/users/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json(); // => { access, refresh, user }
}

export async function getMe(token) {
  const res = await fetch("http://127.0.0.1:8000/users/me/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}
