import axios from "axios";
import { getToken, setToken } from "./token";
import { authService } from "../services/auth.service";

export const http = axios.create();
http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (error) => {
    try {
      if (
        error.response.status === 403 &&
        error.response.data.error_code === "TOKEN_EXPIRED"
      ) {
        //refresh token
        console.log("refresh token");
        const token = getToken();
        const res = await authService.refreshToken({
          refreshToken: token.refreshToken,
        });
        setToken(res.data);
        return http(error.config);
        //thuc thi lai
      }
    } catch (err) {}
    throw error;
  }
);

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.accessToken}`;
  }
  return config;
});
