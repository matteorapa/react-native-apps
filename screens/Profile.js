import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';
export default class Profile extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = {
      nav: navigation,
    };
    this.navigateUser = this.navigateUser.bind(this);
  }


  navigateUser(screen) {
    this.props.navigation.navigate(screen);
  }

  confirmCloseAccount() {
    Alert.alert(
      'Are you sure you want to close your account?',
      '',
      [
        { text: 'Close Account', onPress: () => this.closeAccount() },
        { text: 'Cancel', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  closeAccount(){
    this.state.nav.navigate('GoodbyeMessage');
  }

  render() {
    global.currentScreen = 'Profile'
    console.log(global.currentScreen)
    return (
      <View style={[styles.container, { backgroundColor: global.dark }]}>
        <Text style={[styles.heading, { color: global.color }]}>Profile</Text>
        <View style={styles.body}>

          <ScrollView>

            <TouchableOpacity style={[styles.link, { backgroundColor: global.dark }]} onPress={() => this.navigateUser('PersonalDetails')}>
              <Text style={styles.linkText}>Personal Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.link, { backgroundColor: global.dark }]} onPress={() => this.navigateUser('themeColorPicker')}>
              <Text style={styles.linkText}>Select Theme Color</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.link, { backgroundColor: global.dark }]} onPress={() => this.navigateUser('privacypolicy')}>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.link, { backgroundColor: global.dark }]} onPress={() => this.confirmCloseAccount()}>
              <Text style={styles.linkText}>Close Account</Text>
              <Text style={[styles.smallText, { color: global.color, fontWeight:'400', marginTop: 5}]}>This action is not reversible. All your data will be deleted.</Text>

            </TouchableOpacity>

            <TouchableOpacity style={[styles.link, { backgroundColor: global.dark }]} onPress={() => this.navigateUser('Login')}>
              <Text style={[styles.linkText, { color: global.color }]}>Sign out</Text>
            </TouchableOpacity>
          </ScrollView>

        </View>
        <Footer navigateUser={this.navigateUser} />
      </View>
    );
  }
}


