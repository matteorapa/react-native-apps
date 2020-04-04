import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';

export default class Profile extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = {
    };
    this.navigateUser = this.navigateUser.bind(this);
  }


  navigateUser(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: global.dark}]}>
        <Text style={styles.heading}>Profile</Text>
        <View style={styles.body}>

          <ScrollView>

            <TouchableOpacity style={styles.link} onPress={() => this.navigateUser('PersonalDetails')}>
              <Text style={styles.linkText}>Personal Details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link} onPress={() => this.navigateUser('themeColorPicker')}>
              <Text style={styles.linkText}>Select Theme Color</Text>
            </TouchableOpacity>

            <View style={[styles.link, styles.row]}>
              <Text style={styles.linkText} >Dark Mode</Text>
              <Switch onValueChange={(isDark) => this.setState({ isDark })} value={this.state.isDark} />
            </View>

            <TouchableOpacity style={styles.link} onPress={() => this.navigateUser('privacypolicy')}>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link} onPress={() => { }}>
              <Text style={styles.linkText}>Close Account</Text>
              <Text style={styles.smallText}>This action is not reversible. All your data will be deleted.</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.link} onPress={() => this.navigateUser('Login')}>
              <Text style={[styles.linkText, { color: 'red' }]}>Sign out</Text>
            </TouchableOpacity>
          </ScrollView>

        </View>
        <Footer navigateUser={this.navigateUser} />
      </View>
    );
  }
}


