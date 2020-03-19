import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Picker, Platform } from 'react-native';
import styles from './MyStyleSheet';
import { TextInput, Switch } from 'react-native-gesture-handler';

export default class Footer extends React.Component{

    constructor(props) {
        super(props);
        this.state = { selectedButton: null };
        this.selectionOnPress = this.selectionOnPress.bind(this);
    }
    
    selectionOnPress(userType) {
        this.setState({ selectedButton: userType });
    }
    
    render() {
        return (
            <View>
                <Text style={styles.switchButtonsTitle}>
                    Choose Type of User
                </Text>
                <TouchableOpacity
                    onPress={() => this.selectionOnPress("BASIC")}
                >
                    <Text
                        style={{
                            backgroundColor:
                                this.state.selectedButton === "BASIC"
                                    ? "red"
                                    : "grey"
                        }}
                    >
                        <Text style={styles.switchButtonsText}>BASIC</Text>
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    onPress={() => this.selectionOnPress("INTERMEDIATE")}
                >
                    <Text
                        style={{
                            backgroundColor:
                                this.state.selectedButton === "INTERMEDIATE"
                                    ? "red"
                                    : "grey"
                        }}
                    >
                        <Text style={styles.switchButtonsText}>
                            INTERMEDIATE
                        </Text>
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    onPress={() => this.selectionOnPress("ADVANCED")}
                >
                    <Text
                        style={{
                            backgroundColor:
                                this.state.selectedButton === "ADVANCED"
                                    ? "red"
                                    : "grey"
                        }}
                    >
                        <Text style={styles.switchButtonsText}>
                            INTERMEDIATE
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}