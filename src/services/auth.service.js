import { http } from "@/utils";
import { AUTH_API } from "../utils/http";

export const authService = {
  login(data) {
    return http.post(`${AUTH_API}/login`, data);
  },
  refreshToken(data) {
    return http.post(`${AUTH_API}/refresh-token`, data);
  },
};
