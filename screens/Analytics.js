import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';


export default class Analytics extends React.Component {

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
  }

  navigateUser(screen){
     this.props.navigation.navigate(screen);
  }

  render() {

    return (
      <View style={styles.container}>
      <Text style={styles.heading}>Analytics</Text>

      <View style={styles.body}>
      </View>
      <Footer navigateUser={ this.navigateUser }/>
    </View>
    )
  }
}