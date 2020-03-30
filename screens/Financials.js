import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../MyStyleSheet';

export default class Financials extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Text style={styles.HeaderText}>My Financials</Text>
            </View>
          </View>

          <View style={styles.body}>

          </View>

        

        </View>
      </View>
    );
  }
}

