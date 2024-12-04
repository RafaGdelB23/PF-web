import axios from "axios";
import { useCallback, useState } from "react";
import { getToken } from "../utils/Utils.js";

const usePost = (url) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = useCallback(
    async (data) => {
      setLoading(true);
      setError(null);

      try {
        console.log(url); 
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        return response.data;
      } catch (e) {
        if (e.response) {
          setError(e.response.data);
          throw e.response.data;
        } else if (e.request) {
          setError("Error de red: no se pudo conectar al servidor.");
          throw new Error("No se pudo conectar al servidor.");
        } else {
          setError(e.message);
          throw e.message;
        }
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { postData, error, loading };
};

export default usePost;