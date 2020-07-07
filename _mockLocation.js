import * as Location from 'expo-location';

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
  return {
    timestamp: 1000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      latitude: 21.949068 + increment * tenMetersWithDegrees,
      longitude: 96.075544 + increment * tenMetersWithDegrees,
      // longitude: 96.085363 + increment * tenMetersWithDegrees, // add your current longitude
      // latitude: 21.979677 + increment * tenMetersWithDegrees, // add your current lattitude
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
