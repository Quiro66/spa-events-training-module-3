// GET: trae datos desde la URL
export async function get(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en GET:", error);
  }
}

// POST: envía un nuevo recurso a la URL
export async function post(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en POST:", error);
  }
}

// PUT: actualiza un recurso existente
export async function update(url, id, body) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("PUT actualizado:", data);
    return data;
  } catch (error) {
    console.error("Error en PUT:", error);
    throw error;
  }
}

// DELETE: elimina un recurso
export async function deletes(url, id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("DELETE: recurso eliminado correctamente");
      return true;
    } else {
      console.error("Error al eliminar");
      return false;
    }
  } catch (error) {
    console.error("Error en DELETE:", error);
    throw error;
  }
}
