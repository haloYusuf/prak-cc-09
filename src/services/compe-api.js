import axios from "../api/axiosInstance"; // Sesuaikan dengan import axios instance
import { BASE_URL } from "../utils/utils";

export const fetchAllCompe = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/compe`, {
      withCredentials: true, // Pastikan kredensial dikirimkan
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.error("Error fetching notes:", e);
    return [];
  }
};

export const getCompeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/compe/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching competition by ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchAllGroupByCompe = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/compe/group/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching competition by ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createNewCompe = async (
  compeName,
  compeDesc,
  compeDate,
  compeStatus,
  maxParticipant,
  compeImgFile
) => {
  const formData = new FormData();
  formData.append("compeName", compeName);
  formData.append("compeDesc", compeDesc);
  formData.append("compeDate", compeDate);
  formData.append("compeStatus", compeStatus || "0");
  formData.append("maxParticipant", maxParticipant);
  formData.append("image", compeImgFile);

  try {
    const response = await axios.post(`${BASE_URL}/compe`, formData, {
      withCredentials: true,
    });
    console.log("Create new compe response:", response);
    return response.data;
  } catch (e) {
    console.error(
      "Error creating new competition:",
      e.response?.data || e.message
    );
    throw e;
  }
};

export const updateCompe = async (
  compeId,
  compeName,
  compeDesc,
  compeDate,
  maxParticipant,
  compeImgFile
) => {
  const formData = new FormData();
  formData.append("compeName", compeName);
  formData.append("compeDesc", compeDesc);
  formData.append("compeDate", compeDate);
  formData.append("maxParticipant", maxParticipant);
  formData.append("image", compeImgFile);
  try {
    const response = await axios.put(`${BASE_URL}/compe/${compeId}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating compe:", error);
    return null;
  }
};

export const approveGroup = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/compe/group/approve`, {
      groupId: id,
    });
    return response.data;
  } catch (e) {
    console.error("Error Approving Group:", e.response?.data || e.message);
    throw e;
  }
};

export const rejectGroup = async (id, rejectedMessage) => {
  try {
    const response = await axios.put(`${BASE_URL}/compe/group/reject`, {
      groupId: id,
      rejectedMessage,
    });
    return response.data;
  } catch (e) {
    console.error("Error Rejecting Group:", e.response?.data || e.message);
    throw e;
  }
};

export const changeStatusCompe = async (id) => {
  try {
    const response = await axios.patch(`${BASE_URL}/compe/status/${id}`, {
      compeId: id,
    });
    return response.data;
  } catch (e) {
    console.error("Error Change Status:", e.response?.data || e.message);
    throw e;
  }
};

export const deleteCompe = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/compe/${id}`);
    return response.data;
  } catch (e) {
    console.error(
      "Error creating new competition:",
      e.response?.data || e.message
    );
    throw e;
  }
};
