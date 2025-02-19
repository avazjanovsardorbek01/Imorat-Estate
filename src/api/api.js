import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "http://localhost"
  : window.location.origin;

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getObjects = async (filter) => {
  return apiClient.post("/api/server", { filter });
};

export const getObjectsVirtuoso = async (filter) => {
  return apiClient.post("/api/server/virtuoso", { filter });
};

export const getObject = async (id) => {
  return apiClient.post("/api/server/object", { id });
};

export const postContact = async (postData) => {
  return apiClient.post("/api/funnel", postData);
};
