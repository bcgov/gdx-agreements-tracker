import keycloak from "../keycloak";
import axios from "axios";
require("dotenv").config({ path: "../.env" });

export const getApiUrl = () => {
  let url = "/api";
  if (process.env.REACT_APP_API_URL) {
    url = process.env.REACT_APP_API_URL;
  }
  return url;
};

/**
 * Wrapper around axios. Uses axios interceptors as hooks
 * into each request and response made by axios.
 *
 * @returns {AxiosInstance}
 */
export const apiAxios = () => {
  const apiUrl = getApiUrl();
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
  });

  // All requests should pass an authorization header.
  axiosInstance.interceptors.request.use((req) => {
    if (req.headers && keycloak.authenticated && keycloak.token) {
      req.headers.Authorization = `Bearer ${keycloak.token}`;
    }

    return req;
  });

  // Response.
  axiosInstance.interceptors.response.use(
    (response) => {
      /* On success = status code 200 */
      return Promise.resolve(response);
    },
    (error) => {
      /* On failure = status code <> 200 */
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default apiAxios;
