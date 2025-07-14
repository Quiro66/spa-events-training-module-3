import { get, post, update, deletes } from "../services/api.js";
import { navigateTo } from "./router.js";

const url = "http://localhost:3001/users";

// Display the list of users in a table
export async function renderUsers() {
	const container = document.getElementById("container-users");
	const user = JSON.parse(localStorage.getItem("loggedUser"));
	const users = await get(url);

	container.innerHTML = users.map(u => `
	<tr>
		<td>${u.name}</td>
		<td>${u.email}</td>
		<td>${u.phone}</td>
		<td>${u.dateOfBirth}</td>
		<td>
			${user?.role === "Admin"
				? `<a data-link href="/edit/${u.id}">Editar</a>
				   <a data-link href="/delete/${u.id}">Eliminar</a>`
				: ""}
		</td>
	</tr>
	`).join("");
}

// Lógica para el formulario de creación de usuario
export function setupNewUserForm() {
	const form = document.getElementById("form-new-user");
	const user = JSON.parse(localStorage.getItem("loggedUser"));

	// Solo los admins pueden crear
	if (!user || user.role !== "Admin") {
		form.innerHTML = "<p style='color:red'>Solo el administrador puede crear usuarios.</p>";
		return;
	}

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
		navigateTo("/users");
	});
}

// Logic for filling out and submitting the edit form
export async function setupEditForm(pathname) {
	const id = pathname.split("/edit/")[1];
	const user = await get(`${url}/${id}`);
	const form = document.getElementById("form-edit-user");

	form["edit-name"].value = user.name;
	form["edit-email"].value = user.email;
	form["edit-phone"].value = user.phone;
	form["edit-dateOfBirth"].value = user.dateOfBirth;

	const passwordOriginal = user.password;
	const rolOriginal = user.role;
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const updatedUser = {
			name: form["edit-name"].value,
			email: form["edit-email"].value,
			phone: form["edit-phone"].value,
			dateOfBirth: form["edit-dateOfBirth"].value,
			rol: rolOriginal,
			password: passwordOriginal
		};
		await update(url, id, updatedUser);
		navigateTo("/users");
	});
}

// Handler to confirm or cancel deletion
export function setupDeleteConfirm(pathname) {
	const id = pathname.split("/delete/")[1];
	document.getElementById("confirm-delete").onclick = async () => {
		await deletes(url, id);
		navigateTo("/users");
	};
	document.getElementById("cancel-delete").onclick = () => {
		navigateTo("/users");
	};
}
