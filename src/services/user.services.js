import { http } from "@/utils";
import { USER_API } from "@/config";

export const userService = {
  register(data) {
    return http.post(`${USER_API}/register`, data);
  },
  getUser() {
    return http.get(`${USER_API}`);
  },
  updateProfile(data) {
    return http.patch(`${USER_API}`, data);
  },
};
