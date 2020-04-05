import * as React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, createAppContainer, HeaderTitle } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';


//import screens & components

import Home from './screens/Home';
import Profile from './screens/Profile';
import CreateAnAccount from './screens/CreateAnAccount';
import Login from './screens/Login';
import ViewExpenses from './screens/ViewExpenses';
import Analytics from './screens/Analytics';
import Financials from './screens/Financials';
import PersonalDetails from './screens/PersonalDetails';
import AddExpense from './screens/AddExpense';
import themeColorPicker from './components/themeColorPicker';
import splashScreen from './screens/splashScreen';
import reEnter from './screens/reEnter';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
        <Stack.Screen name="splashScreen" component={splashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAnAccount" component={CreateAnAccount} options={{ headerShown: false }} />
        <Stack.Screen name="ViewExpenses" component={ViewExpenses} options={{ headerShown: false }} />
        <Stack.Screen name="Analytics" component={Analytics} options={{ headerShown: false }} />
        <Stack.Screen name="Financials" component={Financials} options={{ headerShown: false }} />
        <Stack.Screen name="AddExpense" component={AddExpense} options={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' }, animationEnabled: false, }} />
        <Stack.Screen name="themeColorPicker" component={themeColorPicker} options={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' }, animationEnabled: false, }} />
        <Stack.Screen name="reEnter" component={reEnter} options={{ headerShown: false }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
