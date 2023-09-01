import MediSearchApi from "../../APIs/MediSearchApi";

const API_ENDPOINTS = {
  GET_STATS: import.meta.env.VITE_MEDISEARCH_STATS,
  EMPLOYEES: import.meta.env.VITE_MEDISEARCH_EMPLOYEES,
  PROFILE: import.meta.env.VITE_MEDISEARCH_PROFILE,
  EDIT_PROFILE: import.meta.env.VITE_MEDISEARCH_EDIT_PROFILE,
  ADD_EMPLOYEE: import.meta.env.VITE_MEDISEARCH_ADD_EMPLOYEE,
  COMPANY_PROFILE: import.meta.env.VITE_MEDISEARCH_COMPANY_PROFILE,
  EDIT_COMPANY_PROFILE: import.meta.env.VITE_MEDISEARCH_EDIT_COMPANY_PROFILE,
  DELETE_EMPLOYEE: import.meta.env.VITE_MEDISEARCH_DELETE_EMPLOYEE,
};

export const getStats = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_STATS);
};

export const getAllEmployees = () => {
  return MediSearchApi.get(API_ENDPOINTS.EMPLOYEES);
};

export const getLoggedProfile = () => {
  return MediSearchApi.get(API_ENDPOINTS.PROFILE);
};

export const getLoggedCompanyProfile = () => {
  return MediSearchApi.get(API_ENDPOINTS.COMPANY_PROFILE);
};

export const registerEmployee = (values) => {
  return MediSearchApi.post(
    API_ENDPOINTS.ADD_EMPLOYEE,
    JSON.stringify(values),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const editLoggedProfile = (values) => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => formData.append(key, values[key]));
  return MediSearchApi.put(API_ENDPOINTS.EDIT_PROFILE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const editCompanyLoggedProfile = (values) => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => formData.append(key, values[key]));
  return MediSearchApi.put(API_ENDPOINTS.EDIT_COMPANY_PROFILE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEmployee = (employeeID) => {
  return MediSearchApi.delete(API_ENDPOINTS.DELETE_EMPLOYEE + `/${employeeID}`);
};
