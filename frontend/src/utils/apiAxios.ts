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
 * @param {String|undefined} authToken
 * @returns
 */
export const apiAxios = (authToken: String | undefined) => {
  const apiUrl = getApiUrl();
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
  });

  // All requests should pass an authorization header.
  axiosInstance.interceptors.request.use((req) => {
    if (req.headers && authToken) {
      req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req;
  });

  // Response.
  axiosInstance.interceptors.response.use(
    (response) => {
      /* On success = status code 200 */
      return response.data;
    },
    (error) => {
      /* On failure = status code <> 200 */
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default apiAxios;
