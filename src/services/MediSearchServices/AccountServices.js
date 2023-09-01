import MediSearchApi from "../../APIs/MediSearchApi";

const API_ENDPOINTS = {
  LOGIN: import.meta.env.VITE_MEDISEARCH_LOGIN,
  SIGN_USER: import.meta.env.VITE_MEDISEARCH_SIGN_USER,
  SIGN_COMPANY: import.meta.env.VITE_MEDISEARCH_SIGN_COMPANY,
  RESET_PASS: import.meta.env.VITE_MEDISEARCH_RESET_PASS,
  CONFIRM_CODE: import.meta.env.VITE_MEDISEARCH_CONFIRM_CODE,
  CHANGE_PASS: import.meta.env.VITE_MEDISEARCH_CHANGE_PASS,
  LOGOUT: import.meta.env.VITE_MEDISEARCH_LOGOUT,
};

export const login = (values) => {
  return MediSearchApi.post(API_ENDPOINTS.LOGIN, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const registerUser = (values) => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => formData.append(key, values[key]));
  return MediSearchApi.post(API_ENDPOINTS.SIGN_USER, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const registerCompany = (values) => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => formData.append(key, values[key]));
  return MediSearchApi.post(API_ENDPOINTS.SIGN_COMPANY, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const findUserReset = (values) => {
  return MediSearchApi.post(API_ENDPOINTS.RESET_PASS, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const confirmCode = (values) => {
  return MediSearchApi.post(
    API_ENDPOINTS.CONFIRM_CODE,
    JSON.stringify(values),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const changePassword = (values) => {
  return MediSearchApi.post(API_ENDPOINTS.CHANGE_PASS, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const logout = () => {
  return MediSearchApi.get(API_ENDPOINTS.LOGOUT);
};
