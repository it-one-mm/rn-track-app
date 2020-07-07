import '../../_mockLocation';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from './../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import { useIsFocused } from '@react-navigation/native';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = () => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  const isFocused = useIsFocused();

  const callback = React.useCallback(
    location => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [errMessage] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView>
      <Text h2>Create a Track</Text>
      <Map />
      {!!errMessage && <Text>{errMessage}</Text>}
      <TrackForm />
    </SafeAreaView>
  );
};

export default TrackCreateScreen;

const styles = StyleSheet.create({});
