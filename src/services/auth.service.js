import { http } from "@/utils";
import { AUTHEN_API } from "@/config";

export const authService = {
  login(data) {
    return http.post(`${AUTHEN_API}/login`, data);
  },
  loginByCode(data) {
    return http.post(`${AUTHEN_API}/login-by-code`, data);
  },
  refreshToken(data) {
    return http.post(`${AUTHEN_API}/refresh-token`, data);
  },
};
