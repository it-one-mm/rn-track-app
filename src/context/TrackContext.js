import createDataContext from './createDataContext';
import trackerApi from '../api/trackerApi';

const TrackAtions = {
  fetchTracks: 'fetch_tracks',
};

const reducer = (state, action) => {
  switch (action.type) {
    case TrackAtions.fetchTracks:
      return action.payload;
    default:
      return state;
  }
};

const createTrack = (dispatch) => async (name, locations) => {
  await trackerApi.post('/tracks', { name, locations });
};
const fetchTracks = (dispatch) => async () => {
  var response = await trackerApi.get('/tracks');
  dispatch({ type: TrackAtions.fetchTracks, payload: response.data });
};

export const { Context, Provider } = createDataContext(
  reducer,
  { createTrack, fetchTracks },
  []
);
