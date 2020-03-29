import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';

export default class Profile extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = {
      nav: navigation,
      isDark: false,
    };
    this.navigateUser = this.navigateUser.bind(this);
  }

  navigateUser(screen){
     this.props.navigation.navigate(screen);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.headerContainer, { backgroundColor: global.color }]}>
            <Text style={styles.HeaderText}>Profile</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text></Text>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.state.nav.navigate('PersonalDetails')}>
              <Text style={{ fontSize: 20, left: 80, color: 'grey' }}>Personal Details</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.state.nav.navigate('themeColorPicker')}>
              <Text style={{ fontSize: 20, left: 80, color: 'grey' }}>Set theme color</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, left: 80, color: 'grey' }}>Dark Mode</Text>
            <Switch style={{ position: 'absolute', right: 80 }}
              onValueChange={(isDark) => this.setState({ isDark })} value={this.state.isDark}

            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 20, left: 80, color: 'grey' }}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 20, left: 80, color: 'grey' }}> Close Account</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.state.nav.navigate('Profile')} onPress={() => this.state.nav.navigate('Login')}>
              <Text style={{ fontSize: 20, left: 80, color: 'red' }}>Log out</Text>
            </TouchableOpacity>
          </View>

        </View>
        <Footer navigateUser={ this.navigateUser }/>
      </View>
    );
  }
}


