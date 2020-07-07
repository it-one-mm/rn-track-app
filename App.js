import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import AccountScreen from './src/screens/AccountScreen';
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './src/context/AuthContext';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { navigationRef } from './src/navigationRef';
import { FontAwesome } from '@expo/vector-icons';

const AuthStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TrackListStack = createStackNavigator();

function TrackListStackScreen() {
  return (
    <TrackListStack.Navigator>
      <TrackListStack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: 'Tracks' }}
      />
      <TrackListStack.Screen
        name="TrackDetail"
        component={TrackDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </TrackListStack.Navigator>
  );
}

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Tracks':
              iconName = 'th-list';
              break;
            case 'Create':
              iconName = 'plus';
              break;
            case 'Account':
              iconName = 'gear';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Tracks" component={TrackListStackScreen} />
      <Tab.Screen name="Create" component={TrackCreateScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <AuthContext.Consumer>
            {({ state }) => {
              if (state.isLoading) return <ResolveAuthScreen />;
              return (
                <SafeAreaProvider>
                  <NavigationContainer ref={navigationRef}>
                    <AuthStack.Navigator headerMode="none">
                      {state.token === null ? (
                        <>
                          <AuthStack.Screen
                            name="Signup"
                            component={SignupScreen}
                            options={{
                              animationTypeForReplace: state.isSignout
                                ? 'pop'
                                : 'push',
                            }}
                          />
                          <AuthStack.Screen
                            name="Signin"
                            component={SigninScreen}
                          />
                        </>
                      ) : (
                        <AuthStack.Screen name="Main" component={MainScreen} />
                      )}
                    </AuthStack.Navigator>
                  </NavigationContainer>
                </SafeAreaProvider>
              );
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};

export default App;
