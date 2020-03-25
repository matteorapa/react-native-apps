import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView, AutoScrolling } from 'react-native-gesture-handler';
import styles from './MyStyleSheet';
import walletIcon from './assets/wallet.png';
import Footer from './Footer';
export default class Home extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = { 
      nav: navigation ,
      
    };
  }
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.HeaderText}>MyVault</Text>
          </View>
        </View>

        <View style={styles.body}>
          <ScrollView horizontal={true} contentOffset={{ x: 95 }} >
            <View className="buttonGrid" style={styles.buttonGrid}>

              <View className="row" style={styles.row}>

                <TouchableOpacity style={styles.Homebutton1} onPress={() => this.state.nav.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>View Expenses </Text>
                </TouchableOpacity>

                <View style={styles.Homebutton3}>
                  <Image source={require('./assets/euro.png')} style={{ resizeMode: 'contain', width: '50%', left: 30 }}></Image>
                </View>

                <TouchableOpacity style={styles.Homebutton1} onPress={() => this.state.nav.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>Analytics</Text>
                </TouchableOpacity>

                <View style={styles.Homebutton3}>
                  <Image source={require('./assets/yuan.png')} style={{ resizeMode: 'contain', width: '50%', left: 38 }}></Image>
                </View>

              </View >
              <View className="row" style={styles.row}>

                <View style={styles.Homebutton2}>
                  <Image source={require('./assets/barchart.png')} style={{ resizeMode: 'contain', width: '50%', left: 35 }}></Image>
                </View>

                <TouchableOpacity style={styles.Homebutton1} onPress={() => this.state.nav.navigate('ViewExpenses')}>
                  <Text style={styles.homeScreenButtonText}>View All Expenses</Text>
                </TouchableOpacity>

                <View style={styles.Homebutton3}>
                  <Image source={require('./assets/dollar.png')} style={{ resizeMode: 'contain', width: '55%', left: 35 }}></Image>
                </View>

                <TouchableOpacity style={styles.Homebutton1} onPress={() => this.state.nav.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>Revert Expense</Text>
                </TouchableOpacity>

              </View>
              <View className="row" style={styles.row}>

                <TouchableOpacity style={styles.Homebutton1} onPress={() => this.state.nav.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>New Target</Text>
                </TouchableOpacity>

                <View style={styles.Homebutton4}>
                  <Image source={require('./assets/pound.png')} style={{ resizeMode: 'contain', width: '55%', left: 35 }}></Image>
                </View>

                <TouchableOpacity style={styles.Homebutton1} onPress={() => this.state.nav.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>New Expense</Text>
                </TouchableOpacity>

                <View style={styles.Homebutton2}>
                  <Image source={require('./assets/piechart.png')} style={{ resizeMode: 'contain', width: '50%', left: 38 }}></Image>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        < View style={styles.footer} >
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Home')}>
              <Image source={require('./assets/wallet.png')} style={{ width: '50%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Analytics')}>
              <Image source={require('./assets/chart.png')} style={{ width: '60%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('AddExpense')}> 
              <Image source={require('./assets/plus.png')} style={{ width: '80%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('ViewExpenses')}>
              <Image source={require('./assets/coins.png')} style={{ width: '80%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Profile')}>
              <Image source={require('./assets/profile.png')} style={{ width: '60%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
            </TouchableOpacity>
          </View>
        </View >

      </View>
      
    )
  }
}