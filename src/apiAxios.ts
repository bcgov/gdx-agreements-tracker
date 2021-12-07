import axios from "axios";

let userToken = "";

export const getUserToken = () => {
  return userToken ?? "test-token";
};

export const setUserToken = (token: string) => {
  userToken = token;
};

export const getApiUrl = () => {
  return "http://localhost:8080/api";
};

const getAuthorizationHeader = () => {
  const token = getUserToken();
  if (token) return `Bearer ${token}`;
  else return "";
};

export const apiAxios = () => {
  const axiosInstance = axios.create({
    baseURL: getApiUrl(),
    timeout: 5000,
  });

  /* Request */
  axiosInstance.interceptors.request.use((req) => {
    const tokenAuth = getAuthorizationHeader();
    if (req.headers && tokenAuth !== "") {
      req.headers.Authorization = tokenAuth;
    }
    return req;
  });
  /* Response */
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
