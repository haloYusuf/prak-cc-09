const API_URL = "https://backend-yusuf-6-363721261053.us-central1.run.app";

export const getNotes = async () => {
  const response = await fetch(`${API_URL}/notes`);
  return response.json();
};

export const addNote = async (title, content) => {
  const response = await fetch(`${API_URL}/tambah-note`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, is_finish: 0 }),
  });
  return response.json();
};

export const updateNoteStatus = async (id, isFinish) => {
  const response = await fetch(`${API_URL}/update-note/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_finish: isFinish ? 1 : 0 }),
  });
  return response.json();
};

export const deleteNote = async (id) => {
  await fetch(`${API_URL}/delete-note/${id}`, { method: "DELETE" });
};
