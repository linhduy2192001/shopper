import { useEffect, useState } from "react";

export const useFetch = (promise, dependenceList = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetchData();
  }, dependenceList);

  const fetchData = async () => {
    try {
      setLoading(true);
      setStatus("pending");
      const res = await promise();

      setData(res);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    status,
  };
};
