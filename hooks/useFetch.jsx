import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url, config = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(url, {
          ...config,
          signal: controller.signal,
        });

        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url, JSON.stringify(config)]);

  return { data, isLoading, error };
};

export default useFetch;
