import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from './../components/NavLink';
import { useFocusEffect } from '@react-navigation/native';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrMessage } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      // focus
      return () => {
        // blur
        clearErrMessage();
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Tracker"
        errMessage={state.errMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />

      <NavLink
        text="Already have an account? Sign In insted"
        onNavigate={() => navigation.navigate('Signin')}
      />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
    marginTop: 200,
  },
});
