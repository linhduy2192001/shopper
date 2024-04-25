import { message } from "antd";

export const handleError = (err, key) => {
  console.log("err", err);
  if (err?.response?.data?.message) {
    message.error({
      key,
      content: err?.response?.data?.message,
    });
  }
};
