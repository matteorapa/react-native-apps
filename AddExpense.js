import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Picker, Platform } from 'react-native';
import styles from './MyStyleSheet';
import Footer from './Footer';
import { TextInput, Switch } from 'react-native-gesture-handler';

export default class AddExpense extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            amount: '',
            currency: '',
            category: '',
            selectedButton: null,
        };
        this.selectionOnPress = this.selectionOnPress.bind(this);
    }

    selectionOnPress(PurchaseLocation) {
        this.setState({ selectedButton: PurchaseLocation });
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.HeaderText}>Add Expense</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={{ flex: 4 }}>
                        <View style={styles.AddExpenseContainer}>
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={styles.Label2}>Amount Spent </Text>

                                <Picker
                                    style={styles.currencyPicker}
                                    selectedValue={this.state.currency}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ currency: itemValue })}
                                >
                                    <Picker.Item label="€" value="euro" />
                                    <Picker.Item label="£" value="pound" />
                                    <Picker.Item label="$" value="dollar" />
                                </Picker>

                                <TextInput style={styles.amountInput}
                                    placeholder={"0"}
                                    onChangeText={(amount) => this.setState({ amount })}
                                    value={this.state.amount}
                                    Amount={this.state.amount}
                                />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Picker
                                    style={styles.categoryPicker}
                                    selectedValue={this.state.category}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}
                                >
                                    <Picker.Item label="-Select Category-" value="" />
                                    <Picker.Item label="Groceries" value="Groceries" />
                                    <Picker.Item label="Restaurants" value="Restaurants" />
                                    <Picker.Item label="Shopping" value="Shopping" />
                                    <Picker.Item label="Transport" value="Transport" />
                                    <Picker.Item label="Travel" value="Travel" />
                                    <Picker.Item label="Entertainment" value="Entertainment" />
                                    <Picker.Item label="Utilities" value="Utilities" />
                                    <Picker.Item label="Health" value="Health" />
                                    <Picker.Item label="Services" value="Services" />
                                    <Picker.Item label="General" value="General" />
                                    <Picker.Item label="Insurance" value="Insurance" />
                                    <Picker.Item label="Vehicle" value="Vehicle" />
                                </Picker>

                                <View style={{flexDirection: Platform.OS ==='ios' ? 'column': 'row', position: 'absolute',right: Platform.OS ==='ios' ? 30: 70}}>
                                    <TouchableOpacity onPress={() => this.selectionOnPress("Home")}
                                    style={{ borderTopRightRadius: Platform.OS ==='ios' ? 50: 0, borderTopLeftRadius: 50, borderBottomLeftRadius: Platform.OS ==='ios' ? 0: 50,width: 90, height: 60, justifyContent: 'space-around', backgroundColor: this.state.selectedButton === "Home" ? "grey" : "darkgrey" }}>
                                    <Text style={{ justifyContent: 'center', textAlign: "center" }} > Home</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectionOnPress("Online")}
                                    style={{ width: 90, height: 60, justifyContent: 'space-around', backgroundColor: this.state.selectedButton === "Online" ? "grey" : "darkgrey" }}>
                                    <Text style={{ justifyContent: 'center', textAlign: "center" }}> Online</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectionOnPress("Abroad")}
                                    style={{ width: 90, height: 60, borderBottomRightRadius: 50, borderBottomLeftRadius: Platform.OS ==='ios' ? 50:0, borderTopRightRadius: Platform.OS ==='ios' ? 0: 50,justifyContent: 'space-around', backgroundColor: this.state.selectedButton === "Abroad" ? "grey" : "darkgrey" }}>
                                    <Text style={{ textAlign: "center" }}> Abroad</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <TouchableOpacity
                        style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 210 : 180, right: 20 }}
                        onPress={() => this.state.nav.navigate('Home')}
                    >
                        <Text style={{ justifyContent: 'center', textAlign: "center", color: '#26baee', fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 210 : 180, left: 20 }}>
                        <Text style={{ justifyContent: 'center', textAlign: "center", color: '#26baee', fontWeight: 'bold' }}>Go!</Text>
                    </TouchableOpacity>

                </View>
            </View>
            </View >
        )
    }
}