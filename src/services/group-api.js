import axios from "../api/axiosInstance";
import { BASE_URL } from "../utils/utils";

export const fetchAllMember = async (groupId) => {
  try {
    const response = await axios.get(`${BASE_URL}/group/members/${groupId}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.error("Error fetching notes:", e);
    return [];
  }
};