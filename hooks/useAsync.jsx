import { useState, useEffect, useCallback } from 'react';

export default function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const run = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus('success');
        return response;
      })
      .catch((err) => {
        setError(err);
        setStatus('error');
        return Promise.reject(err);
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      run();
    }
  }, [run, immediate]);

  return { status, value, error, run };
};
