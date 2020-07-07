import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import { Text } from 'react-native-elements';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ route }) => {
  const { _id } = route.params;

  const { state } = useContext(TrackContext);

  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline coordinates={track.locations.map((l) => l.coords)} />
      </MapView>
    </>
  );
};

export default TrackDetailScreen;

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});
