import { get, post } from "../services/api.js";
import { navigateTo } from "./router.js";

const urlRegistrations = "http://localhost:3001/registrations";

export async function renderRegistrations() {
  const container = document.getElementById("container-registration");
  const registrations = await get(urlRegistrations);

  container.innerHTML = registrations.map(e => `
    <tr>
    <td>${e.userId}</td>
    <td>${e.eventId}</td>
  </tr>
    `
  ).join("");
}