import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';
import { useFocusEffect } from '@react-navigation/native';

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrMessage } = useContext(AuthContext);

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
        headerText="Sign In for Tracker"
        errMessage={state.errMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        text="Don't have an account? Sign Up instead"
        onNavigate={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
    marginTop: 200,
  },
});
