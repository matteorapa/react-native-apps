import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from './Footer';

export default class reEnter extends React.Component {
    
    constructor({ navigation }) {
        super();
        this.navigateUser = this.navigateUser.bind(this);
      }
    
      navigateUser(screen){
         this.props.navigation.navigate(screen);
      }
      
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View>
                    <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center' }}>
                        <Text>Re - enter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}