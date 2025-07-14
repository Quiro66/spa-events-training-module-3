// src/scripts/auth.js
import { get, post } from "../services/api.js";
import { navigateTo } from "./router.js";

const url = "http://localhost:3001/users";

// Handles login logic
export async function setupLogin() {
  const form = document.getElementById("login-form");
  const msg = document.getElementById("login-msg");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Fetch users and find a match
    const users = await get("http://localhost:3001/users");
    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      localStorage.setItem("loggedUser", JSON.stringify(found));
      navigateTo("/users");
    } else {
      msg.textContent = "Correo o contraseña incorrectos"; // Can be translated if needed
    }
  });
}

export function setupRegister() {
  const form = document.getElementById("form-register");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      dateOfBirth: form.dateOfBirth.value,
      password: form.password.value,
      role: "user",
    };
    await post(url, data);
    navigateTo("/");
  });
}

// Hides or shows the "New User" link based on role
export function updateNavbarForRole() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const newUserLink = document.querySelector('a[href="/newuser"]');
  
  if (newUserLink) {
    newUserLink.style.display = user?.role === "Admin" ? "" : "none";
  }
}
