import axios from "../api/axiosInstance"; // Sesuaikan dengan import axios instance
import Cookies from "js-cookie";
import { BASE_URL } from "../utils/utils";

export const fetchNotes = async () => {
  const uId = localStorage.getItem("uId"); // Ambil uId dari cookie
  if (!uId) {
    console.error("uId tidak ditemukan dalam cookie");
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/notes`, {
      params: { uId },
      withCredentials: true, // Pastikan kredensial dikirimkan
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

export const addNote = async (title, content) => {
  const uId = localStorage.getItem("uId"); // Ambil uId dari cookie
  if (!uId) {
    console.error("uId tidak ditemukan dalam cookie");
    return;
  }
  try {
    const response = await axios.post(`${BASE_URL}/tambah-note`, {
      uId,
      title,
      content,
      is_finish: 0,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding note:", error);
    return null;
  }
};

export const updateStatusNote = async (id, isFinish) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-note/${id}`, {
      is_finish: isFinish ? 1 : 0,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating note status:", error);
    return null;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-note/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    return null;
  }
};
