import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Stack from './homeStack';
import styles from './MyStyleSheet';

export default class UpcomingEvents extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = { nav: navigation };
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Text style={styles.HeaderText}>Upcoming Events</Text>
            </View>
          </View>

          <View style={styles.body}>
            <ScrollView>
              <TouchableOpacity style={{ height: 100, backgroundColor: 'grey' }}>
                <Text style={{ fontSize: 50, position: 'absolute', top: 10, left: 30 }}>14</Text>
                <Text style={{ fontSize: 20, position: 'absolute', bottom: 10, left: 30 }}>March</Text>
                <Text style={{ position: 'absolute', fontSize: 30, right: 30, top: 30 }}>Wuhan Trip</Text>
              </TouchableOpacity>
              <View style={{ height: 20 }}></View>
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <View style={{ flexDirection: 'row' }}>

              <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Home')}>
                <Image source={require('./assets/wallet.png')} style={{ width: '50%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('UpcomingEvents')}>
                <Image source={require('./assets/calendar.png')} style={{ width: '70%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Analytics')}>
                <Image source={require('./assets/chart.png')} style={{ width: '60%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Financials')}>
                <Image source={require('./assets/coins.png')} style={{ width: '80%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
              </TouchableOpacity>

              <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Profile')}>
                <Image source={require('./assets/profile.png')} style={{ width: '60%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    );
  }
}
