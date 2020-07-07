import createDataContext from './createDataContext';
import trackerApi from '../api/trackerApi';
import { AsyncStorage } from 'react-native';

const reducer = (state, action) => {
  switch (action.type) {
    case 'finish_loading':
      return { ...state, isLoading: false };
    case 'set_err':
      return { ...state, errMessage: action.payload };
    case 'clear_err':
      return { ...state, errMessage: '', isSignout: false };
    case 'store_token':
      return { ...state, token: action.payload, errMessage: '' };
    case 'signout':
      return { ...state, token: null, isSignout: true };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'store_token', payload: token });
  }

  dispatch({ type: 'finish_loading' });
};

const clearErrMessage = (dispatch) => () => {
  dispatch({ type: 'clear_err' });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', data.token);
    dispatch({ type: 'store_token', payload: data.token });
  } catch (err) {
    dispatch({
      type: 'set_err',
      payload: 'Something went wrong with Sign Up',
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', data.token);
    dispatch({ type: 'store_token', payload: data.token });
  } catch (err) {
    dispatch({
      type: 'set_err',
      payload: 'Something went wrong with Sign In',
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
};

export const { Context, Provider } = createDataContext(
  reducer,
  { signin, signup, signout, clearErrMessage, tryLocalSignin },
  {
    token: null,
    errMessage: '',
    isLoading: true,
    isSignout: false,
  }
);
