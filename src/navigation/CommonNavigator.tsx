import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllNavParamList } from './AllNavParamList';
import Login from '../views/Login';
import SearchPage from '../views/SearchPage';
import SplashScreen from '../views/SplashScreen';

const Stack = createNativeStackNavigator<AllNavParamList>();

const CommonNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
    </Stack.Navigator>
  );
};

export default CommonNavigator;
