import { http } from "@/utils";
import { USER_API } from "../utils/http";

export const userService = {
  signup(data) {
    return http.post(`${USER_API}/register`, data);
  },
  getProfile() {
    return http.get(`${USER_API}`);
  },
  resendEmail(data) {
    return http.post(`${USER_API}/resend-email`, data);
  },
  updateInfo(data) {
    return http.patch(`${USER_API}`, data);
  },
  sendEmailResetPassword(data) {
    return http.post(`${USER_API}/reset-password`, data);
  },
  resetPasswordByCode(data) {
    return http.post(`${USER_API}/change-password-by-code`, data);
  },
};
