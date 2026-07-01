import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
const BASE_URL = `${API_URL}/interview`;

export const startInterviewAPI = async (sessionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/start/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }

  return null;
};

export const submitAPI = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/submit`, payload);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }

  return null;
};

export const reportAPI = async (sessionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/report/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }

  return null;
};

export const endInterviewAPI = async (sessionId) => {
  try {
    const response = await axios.put(`${BASE_URL}/end/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }

  return null;
};

export const generateQuestionsAPI = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/generate-question`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }

  return null;
};
