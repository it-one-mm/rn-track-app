import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      const { status } = await requestPermissionsAsync();
      if (status !== 'granted') {
        setErrMessage('Please enable Location');
        return;
      }

      setErrMessage(null);

      subscriber = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        callback
      );
    };

    if (shouldTrack) {
      startWatching();
    } else {
      // console.log('stop tracking');
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [errMessage];
};
