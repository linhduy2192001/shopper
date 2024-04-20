import { http } from "@/utils";
import { PRODUCT_API } from "@/config";

export const productService = {
  getProduct(query = "", signal) {
    return http.get(`${PRODUCT_API}${query}`, { signal });
  },
  getCategories() {
    return http.get(`${PRODUCT_API}/categories`);
  },
};
