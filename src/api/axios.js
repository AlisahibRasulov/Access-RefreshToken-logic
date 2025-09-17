import axios from "axios";
// import { createBrowserHistory } from "history";

// const history = createBrowserHistory();

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh");

        const refreshRes = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const newAccess = refreshRes.data.accessToken;
        const newRefresh = refreshRes.data.refreshToken;
        localStorage.setItem("access", newAccess);
        localStorage.setItem("refresh", newRefresh);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token də etibarsızdır:", refreshError);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        // history.push("/login");
        // window.location.reload(); // redirect tam işləsin deyə
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
