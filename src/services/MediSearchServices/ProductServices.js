import MediSearchApi from "../../APIs/MediSearchApi";

const API_ENDPOINTS = {
  ADD_PRODUCT: import.meta.env.VITE_MEDISEARCH_ADD_PRODUCT,
  GET_PRODUCTS: import.meta.env.VITE_MEDISEARCH_GET_PRODUCTS,
  GET_PRODUCT: import.meta.env.VITE_MEDISEARCH_GET_PRODUCT,
  EDIT_PRODUCT: import.meta.env.VITE_MEDISEARCH_EDIT_PRODUCT,
  DELETE_PRODUCT: import.meta.env.VITE_MEDISEARCH_DELETE_PRODUCT,
  ADD_COMMENT: import.meta.env.VITE_MEDISEARCH_ADD_COMMENT,
  ADD_REPLY: import.meta.env.VITE_MEDISEARCH_ADD_REPLY,
};

export const createProduct = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      values[key].forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, values[key]);
    }
  });

  return MediSearchApi.post(API_ENDPOINTS.ADD_PRODUCT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllProducts = () => {
  return MediSearchApi.get(API_ENDPOINTS.GET_PRODUCTS);
};

export const getProduct = (productId) => {
  return MediSearchApi.get(`${API_ENDPOINTS.GET_PRODUCT}/${productId}`);
};

export const editProduct = (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      values[key].forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, values[key]);
    }
  });

  return MediSearchApi.put(API_ENDPOINTS.EDIT_PRODUCT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProduct = (productId) => {
  return MediSearchApi.delete(`${API_ENDPOINTS.DELETE_PRODUCT}/${productId}`);
};

export const addComment = (values) => {
  return MediSearchApi.post(API_ENDPOINTS.ADD_COMMENT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const addReply = (values) => {
  return MediSearchApi.post(API_ENDPOINTS.ADD_REPLY, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};
