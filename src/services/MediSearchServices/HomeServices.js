import MediSearchApi from "../../APIs/MediSearchApi";

const API_ENDPOINTS = {
  GET_HOME: import.meta.env.VITE_MEDISEARCH_HOME,
  GET_CLIENT_HOME: import.meta.env.VITE_MEDISEARCH_CLIENT_HOME,
  GET_LABORATORIES: import.meta.env.VITE_MEDISEARCH_LABORATORIES,
  GET_PHARMACIES: import.meta.env.VITE_MEDISEARCH_PHARMACIES,
  GET_COMPANIES: import.meta.env.VITE_MEDISEARCH_COMPANIES,
  GET_COMPANY: import.meta.env.VITE_MEDISEARCH_COMPANY,
  GET_PRODUCT: import.meta.env.VITE_MEDISEARCH_PRODUCT,
  GET_LAB_PRODUCTS: import.meta.env.VITE_MEDISEARCH_LAB_PRODUCTS,
  GET_FAV_PRODUCTS: import.meta.env.VITE_MEDISEARCH_FAV_PRODUCTS,
  POST_FAV_PRODUCT: import.meta.env.VITE_MEDISEARCH_FAV_PRODUCT,
  POST_FAV_COMPANY: import.meta.env.VITE_MEDISEARCH_FAV_COMPANY,
  UNFAV_PRODUCT: import.meta.env.VITE_MEDISEARCH_UNFAV_PRODUCT,
  UNFAV_COMPANY: import.meta.env.VITE_MEDISEARCH_UNFAV_COMPANY,
  GET_FAV_COMPANIES: import.meta.env.VITE_MEDISEARCH_FAV_COMPANIES,
  GET_PHARMACY_PRODUCTS: import.meta.env.VITE_MEDISEARCH_PHARMACY_PRODUCTS,
};

export const getHome = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_HOME);
};

export const getClientHome = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_CLIENT_HOME);
};

export const getAllLabs = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_LABORATORIES);
};

export const getAllPharmacies = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_PHARMACIES);
};

export const getAllCompanies = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_COMPANIES);
};

export const getLabProducts = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_LAB_PRODUCTS);
};

export const getPharmacyProducts = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_PHARMACY_PRODUCTS);
};

export const getFavoriteProducts = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_FAV_PRODUCTS);
};

export const getFavoriteCompanies = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_FAV_COMPANIES);
};

export const getCompanyById = (id) => {
  return MediSearchApi.get(`${API_ENDPOINTS.GET_COMPANY}/${id}`);
};

export const getCompanyProduct = (id) => {
  return MediSearchApi.get(`${API_ENDPOINTS.GET_PRODUCT}/${id}`);
};

export const addProductFav = (values) => {
  return MediSearchApi.post(
    API_ENDPOINTS.POST_FAV_PRODUCT,
    JSON.stringify(values),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const addCompanyFav = (values) => {
  return MediSearchApi.post(
    API_ENDPOINTS.POST_FAV_COMPANY,
    JSON.stringify(values),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const removeProductFav = (id) => {
  return MediSearchApi.delete(`${API_ENDPOINTS.UNFAV_PRODUCT}/${id}`);
};

export const removeCompanyFav = (id) => {
  return MediSearchApi.delete(`${API_ENDPOINTS.UNFAV_COMPANY}/${id}`);
};
