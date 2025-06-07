import { useState, useEffect } from 'react';
import axios from 'axios';
import useOnlineStatus from '@/hooks/useOnlineStatus';

const pingUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/ping"

const triggerDeploy = async () => {
  try {
    await axios.post('/api/trigger-deploy');
  } catch (error) {
    console.error('Failed to trigger deploy:', error);
  }
};

const useServiceStatus = () => {
  const [isServiceReady, setIsServiceReady] = useState(true);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) return;

    let isMounted = true;
    let intervalId;

    const checkService = async () => {
      try {
        const response = await axios.get(pingUrl);
        if (response.status === 200) {
          if (isMounted) setIsServiceReady(true);
          return true;
        }
      } catch (error) {
        return false;
      }
    };

    const initiateServiceCheck = async () => {
      const serviceUp = await checkService();
      if (serviceUp) return;

      await triggerDeploy();

      intervalId = setInterval(async () => {
        const serviceUp = await checkService();
        if (serviceUp) {
          clearInterval(intervalId);
        }
      }, 10_000);
    };

    initiateServiceCheck();

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOnline]);

  return isServiceReady;
};

export default useServiceStatus;
