import axios, { AxiosError } from "axios";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

export const useAxios = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  /**
   * Handles Axios error responses and returns a rejected Promise object with the error.
   *
   * @param   {AxiosError}          error - The error object returned by Axios.
   * @returns {Promise<AxiosError>}       A rejected Promise object with the error.
   */
  const handleError = (error: AxiosError): Promise<AxiosError> => {
    switch (error?.response?.status) {
      // 400 Bad Request.
      case 400:
        console.error(error);
        return Promise.reject(error);

      // 401 Unauthorized.
      case 401:
        console.error(error);
        navigate("/unauthorized");
        return Promise.reject(error);

      // 404 Not Found.
      case 404:
        console.error(error);
        return Promise.reject(error);

      //500 Internal Server Error.
      case 500:
        console.error(error);
        return Promise.reject(error);

      //502 Bad Gateway.
      case 502:
        console.error(error);
        return Promise.reject(error);

      // 504 Gateway Timeout.
      case 504:
        console.error(error);
        return Promise.reject(error);

      default:
        console.error(error);
        return Promise.reject(error);
    }
  };

  const axiosAll = () => {
    /**
     * handleApiUrl formulates the api url based on the environment (local or cloud).
     *
     * @returns {string} The api Url.
     */
    const handleApiUrl = () => {
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
    const axiosInstance = axios.create({
      baseURL: handleApiUrl(),
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
        return handleError(error);
      }
    );

    return axiosInstance;
  };

  return { axiosAll };
};
