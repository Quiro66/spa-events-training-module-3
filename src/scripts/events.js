import { get, post, update, deletes } from "../services/api.js";
import { navigateTo } from "./router.js";

const urlEvents = "http://localhost:3001/eventss";
const urlRegistrations = "http://localhost:3001/registrations";

// register the user to create the event log
export async function renderEventsusers() {
  const container = document.getElementById("container-events");
  const events = await get(urlEvents);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  container.innerHTML = events.map(e => `
    <tr>
    <td>${e.title}</td>
    <td>${e.description}</td>
    <td>${e.capacity}</td>
    <td>${e.date}</td>
    <td><button data-event-id="${e.id}">Registrarme</button></td>
  </tr>
    `
  ).join("");

  container.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", async () => {
      const eventId = btn.dataset.eventId;

      // Guarda la participación
      await post(urlRegistrations, {
          userId: loggedUser.id,
          eventId: Number(eventId),
      });

      alert("You have registered for the event.");
    });
  });
}
// Show list of the events 
export async function renderEvents() {
  const container = document.getElementById("container-event");
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const events = await get(urlEvents);

  container.innerHTML = events.map(e => `
  <tr>
    <td>${e.title}</td>
    <td>${e.description}</td>
    <td>${e.capacity}</td>
    <td>${e.date}</td>
    <td>
      ${user?.role === "Admin" 
        ? `<a data-link href="/editE/${e.id}">Editar</a>
           <a data-link href="/deleteE/${e.id}">Eliminar</a>`
        : ""}
    </td>
  </tr>
  `).join("");
}



// Logic for the user creation form
export function setupNewEventForm() {
	const form = document.getElementById("form-new-event");
  	const user = JSON.parse(localStorage.getItem("loggedUser"));

// Only admins can create
	if (!user || user.role !== "Admin") {
		form.innerHTML = "<p style='color:red'>Solo el administrador puede crear usuarios.</p>";
		return;
	}


	form.addEventListener("submit", async (e) => {
		e.preventDefault();
    const data = {
    titlee: form.titlee.value,
	  description: form.description.value,
		capacity: form.capacity.value,
    date: form.date.value
    };
		await post(urlEvents, data);
		navigateTo("/events");
	});
}

// Logic for filling out and submitting the edit form
export async function setupEditFormEvent(pathname) {
	const id = pathname.split("/editEvent/")[1];
	const event = await get(`${urlEvents}/${id}`);
	const form = document.getElementById("form-edit-events");

	form["edit-title"].value = event.title;
	form["edit-description"].value = event.description;
	form["edit-capaicty"].value = event.capacity;
	form["edit-date"].value = event.date;

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const updatedEvent = {
			title: form["edit-title"].value,
			description: form["edit-description"].value,
			capaicty: form["edit-capaicty"].value,
			date: form["edit-date"].value,
		};
		await update(urlEvents, id, updatedEvent);
		navigateTo("/event");
	});
}

// Handler to confirm or cancel deletion
export function setupDeleteConfirmEvent(pathname) {
	const id = pathname.split("/deleteEvent/")[1];
	document.getElementById("confirm-delete").onclick = async () => {
		await deletes(urlEvents, id);
		navigateTo("/event");
	};
	document.getElementById("cancel-delete").onclick = () => {
		navigateTo("/event");
	};
}

