import { setupLogin, setupRegister, updateNavbarForRole } from "./auth.js";
import { renderUsers, setupNewUserForm, setupEditForm, setupDeleteConfirm } from "./users.js";
import { renderEventsusers, renderEvents, setupNewEventForm, setupEditFormEvent, setupDeleteConfirmEvent} from "./events.js"
import { renderRegistrations } from "./registrationEevent.js";
// Rutas disponibles
const routes = {
  "/": "./src/pages/login.html",
  "/register": "./src/pages/register.html",
  "/events": "./src/pages/events.html",
  "/registrationsEvents": "./src/pages/registrationEvents.html",
  //events crud
  "/eventsAdmin": "./src/pages/events/eventAdmin.html",
  "/newEvent": "./src/pages/events/newEvents.html",
  "/editEvent": "./src/pages/events/editEvents.html",
  "/deleteEvent": "./src/pages/events/deleteEvents.html",

  //crud User
  "/users": "./src/pages/users/users.html",
  "/newUser": "./src/pages/users/newUser.html",
  "/editUser": "./src/pages/users/editUser.html",
  "/deleteUser": "./src/pages/users/deleteUser.html",
};

// Función para cambiar de ruta y cargar la vista
export async function navigateTo(pathname) {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  // Si no ha iniciado sesión, redirige al login
  if (!loggedUser && pathname !== "/" && pathname !== "/register") {
    pathname = "/";
  }

  // Manejo de rutas con ID dinámico
  const route =
    routes[pathname] ||
    (pathname.startsWith("/edit/") && routes["/editUser"]) ||
    (pathname.startsWith("/delete/") && routes["/deleteUser"]) ||
    (pathname.startsWith("/editE/") && routes["/editEvent"]) ||
    (pathname.startsWith("/deleteE/") && routes["/deleteEvent"]); 

  if (!route) return; // Si no existe, no hace nada

  // Carga el HTML de la página
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;

  // Actualiza la URL sin recargar
  history.pushState({}, "", pathname);

  // Muestra u oculta el navbar
  toggleNavbar();

  // Cambia qué enlaces del navbar se ven
  updateNavbarForRole();

  // Ejecuta lógica según la ruta
  if (pathname === "/") setupLogin();
  else if (pathname === "/register") setupRegister();
  else if (pathname === "/events") renderEventsusers();
  else if (pathname === "/registrationsEvents") renderRegistrations();
  //userCrud
  else if (pathname === "/users") renderUsers();
  else if (pathname === "/newUser") setupNewUserForm();
  else if (pathname.startsWith("/edit/")) setupEditForm(pathname);
  else if (pathname.startsWith("/delete/")) setupDeleteConfirm(pathname);
  //eventCrud
  else if (pathname === "/eventsAdmin") renderEvents ();
  else if (pathname === "/newEvent") setupNewEventForm();
  else if (pathname.startsWith("/editE/")) setupEditFormEvent(pathname);
  else if (pathname.startsWith("/deleteE/")) setupDeleteConfirmEvent(pathname);
}

// Mostrar u ocultar el navbar según si hay sesión activa
function toggleNavbar() {
  const navbar = document.getElementById("navbar");
  const logoutBtn = document.getElementById("logout-btn");
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  // Mostrar u ocultar navbar
  if (navbar) {
    navbar.style.display = loggedUser ? "flex" : "none";
  }

  // Mostrar u ocultar botón de cerrar sesión
  if (logoutBtn) {
    logoutBtn.style.display = loggedUser ? "inline-block" : "none";

    // Acción del logout
    logoutBtn.onclick = () => {
      localStorage.removeItem("loggedUser");
      toggleNavbar();
      navigateTo("/");
    };
  }
}
