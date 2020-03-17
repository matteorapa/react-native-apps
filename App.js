// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Navigator from './homeStack';

export default class App extends React.Component {
  render() {
    return (
      <Navigator />
    );
  }
}