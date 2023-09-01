import MediSearchApi from "../../APIs/MediSearchApi";

const API_ENDPOINTS = {
  CHAT: import.meta.env.VITE_MEDISEARCH_CHAT,
  CHATS: import.meta.env.VITE_MEDISEARCH_CHATS,
  SEND_MSG: import.meta.env.VITE_MEDISEARCH_SEND_MSG,
};

export const getChat = (id) => {
  return MediSearchApi.get(`${API_ENDPOINTS.CHAT}/${id}`);
};

export const getChats = () => {
  return MediSearchApi.get(API_ENDPOINTS.CHATS);
};

export const sendMessage = (values) => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => formData.append(key, values[key]));

  return MediSearchApi.post(API_ENDPOINTS.SEND_MSG, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
