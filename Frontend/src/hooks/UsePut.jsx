import axios from "axios";
import { useCallback, useState } from "react";
import { getToken } from "../utils/Utils.js";

const usePut = (url) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const putData = useCallback(
        async (data) => {
        setLoading(true);
        setError(null);
    
        try {
            console.log(url); 
            const response = await axios.put(url, data, {
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
    
    return { putData, error, loading };
    };

export default usePut;