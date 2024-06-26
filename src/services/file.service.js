import { http } from "@/utils";
import { FILE_API } from "@/config";

export const fileService = {
  uploadFile(file) {
    const formData = new FormData();
    formData.set("file", file);
    return http.post(`${FILE_API}`, formData);
  },
};
