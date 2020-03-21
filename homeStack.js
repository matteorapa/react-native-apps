import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, createAppContainer, HeaderTitle } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Home from './Home';
import Profile from './Profile';
import CreateAnAccount from './CreateAnAccount';
import Login from './Login';
import UpcomingEvents from './UpcomingEvents';
import Analytics from './Analytics';
import Financials from './Financials';
import PersonalDetails from './PersonalDetails';
import AddExpense from './AddExpense';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAnAccount" component={CreateAnAccount} options={{ headerShown: false }} />
        <Stack.Screen name="UpcomingEvents" component={UpcomingEvents} options={{ headerShown: false }} />
        <Stack.Screen name="Analytics" component={Analytics} options={{ headerShown: false }} />
        <Stack.Screen name="Financials" component={Financials} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
        <Stack.Screen name="AddExpense" component={AddExpense} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}