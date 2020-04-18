import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { Switch, ScrollView } from 'react-native-gesture-handler';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';

export default class Home extends React.Component {

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
  }

  navigateUser(screen) {
    this.props.navigation.navigate(screen);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backbutton);
  }

  backbutton = () => {
    return true; 
  }
  
  render() {

    return (
      <View style={[styles.container, {backgroundColor: global.dark}]}>

          <Text style={styles.heading}>MyVault</Text>

        <View style={styles.body}>
          <ScrollView horizontal={true} contentOffset={{ x: 95 }} >
            <View className="buttonGrid" style={styles.buttonGrid}>

              <View className="row" style={styles.row}>

                <TouchableOpacity style={[styles.Homebutton1, { backgroundColor: global.color }]} onPress={() => this.props.navigation.navigate('ViewExpenses')}>
                  <Text style={styles.homeScreenButtonText}>View Expenses </Text>
                </TouchableOpacity>

                <View style={styles.Homebutton3}>
                  <Image source={require('../assets/euro.png')} style={{ resizeMode: 'contain', width: '50%', left: 30 }}></Image>
                </View>

                <TouchableOpacity style={[styles.Homebutton1, { backgroundColor: global.color }]} onPress={() => this.state.nav.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>Analytics</Text>
                </TouchableOpacity>

                <View style={styles.Homebutton3}>
                  <Image source={require('../assets/yuan.png')} style={{ resizeMode: 'contain', width: '50%', left: 38 }}></Image>
                </View>

              </View >
              <View className="row" style={styles.row}>

                <View style={styles.Homebutton2}>
                  <Image source={require('../assets/barchart.png')} style={{ resizeMode: 'contain', width: '50%', left: 35 }}></Image>
                </View>

                <TouchableOpacity style={[styles.Homebutton1, { backgroundColor: global.color }]} onPress={() => this.props.navigation.navigate('ViewExpenses')}>
                  <Text style={styles.homeScreenButtonText}>View All Expenses</Text>
                </TouchableOpacity>

                <View style={styles.Homebutton3}>
                  <Image source={require('../assets/dollar.png')} style={{ resizeMode: 'contain', width: '55%', left: 35 }}></Image>
                </View>

                <TouchableOpacity style={[styles.Homebutton1, { backgroundColor: global.color }]} onPress={() => this.state.nav.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>Revert Expense</Text>
                </TouchableOpacity>

              </View>
              <View className="row" style={styles.row}>

                <TouchableOpacity style={[styles.Homebutton1, { backgroundColor: global.color }]} onPress={() => this.state.nav.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>New Target</Text>
                </TouchableOpacity>

                <View style={styles.Homebutton4}>
                  <Image source={require('../assets/pound.png')} style={{ resizeMode: 'contain', width: '55%', left: 35 }}></Image>
                </View>

                <TouchableOpacity style={[styles.Homebutton1, { backgroundColor: global.color }]} onPress={() => this.props.navigation.navigate('AddExpense')}>
                  <Text style={styles.homeScreenButtonText}>New Expense</Text>
                </TouchableOpacity>

                <View style={styles.Homebutton2}>
                  <Image source={require('../assets/piechart.png')} style={{ resizeMode: 'contain', width: '50%', left: 38 }}></Image>
                </View>
              </View>
            </View>
          </ScrollView>

        </View>


        <Footer navigateUser={this.navigateUser} />

      </View>

    )
  }
}