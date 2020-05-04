import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Picker, Platform, Alert, Modal } from 'react-native';
import styles from '../MyStyleSheet';

import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Home from './Home';
global.newExpense = false;
var compareToMonths = [2,4,6,9,11];
export default class AddExpense extends React.Component {
    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            title: '',
            amount: '',
            currency: 'eur',
            category: '',
            cashCard: 'Cash',
            onlineSwitch: false,

            periodicTitle: '',
            periodicAmount: '',
            periodicCurrency: 'eur',
            periodicCategory: '',
            periodicRepeat: 'weekly',
            periodicDay: '',
            periodicMonth: '',
            periodicYear: '',
            date: '',

            show: true,
        };
        this.selectionOnPress = this.selectionOnPress.bind(this);
    }

    selectionOnPress(PurchaseLocation) {
        this.setState({ cashCard: PurchaseLocation });
    }

    async apiCall() {

        await fetch('http://myvault.technology/api/expenses', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
            body: JSON.stringify({
                title: this.state.title,
                category: this.state.category,
                amount: this.state.amount,
                cashCard: this.state.cashCard,
                currency: this.state.currency,
                onlineSwitch: this.state.onlineSwitch,
            })
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    console.log('Expense successfully posted!')
                }
                else {
                    console.log('something went wrong!')
                    console.log(response)
                    Alert.alert('Oops!', 'Something went wrong')
                    this.setState({ title: '' })
                    this.setState({ currency: 'eur' })
                    this.setState({ category: '' })
                    this.setState({ cashCard: 'Cash' })
                    this.setState({ onlineSwitch: '' })
                    this.setState({ amount: '' })
                }
            })
            .catch(error => console.warn(error))

    }

    async periodicApiCall() {

        await fetch('http://myvault.technology/api/expenses/periodic', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
            body: JSON.stringify({
                category: this.state.periodicCategory,
                amount: this.state.periodicAmount,
                currency: this.state.periodicCurrency,
                title: this.state.periodicTitle,
                date: this.state.date,
            })
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    console.log('Expense successfully posted!')
                    this.state.nav.pop()
                }
                else {
                    console.log('something went wrong!')
                    console.log(response)
                    Alert.alert('Oops!', 'Something went wrong')
                    this.setState({ periodicTitle: '' })
                    this.setState({ periodicCurrency: 'eur' })
                    this.setState({ periodicCategory: '' })
                    this.setState({ periodicAmount: '' })
                    this.setState({ date: '' })
                    this.setState({ periodicDay: '' })
                    this.setState({ periodicMonth: '' })
                    this.setState({ periodicYear: '' })
                    this.setState({ periodicRepeat: 'weekly' })
                }
            })
            .catch(error => console.warn(error))

    }

    async postExpense() {
        //this.componentDidMount();
        if (this.state.title === '' || this.state.category === '' || this.state.cashCard === '' || this.state.amount === '') {
            Alert.alert('Oops!', 'Please ensure all fields are filled')
        }
        else {
            this.apiCall();
            console.log('Sending credentials post to express server using title: ' + this.state.title + ' amount: ' + this.state.amount + ' currency: ' + this.state.currency + ' category: ' + this.state.category + ' cash/card: ' + this.state.cashCard + " online? " + this.state.onlineSwitch);
            this.state.nav.pop()
        }
    }

    async postPeriodicExpense() {

        if (this.state.periodicTitle === '' || this.state.periodicCategory === '' || this.state.periodicDay === '' || this.state.periodicMonth === '' || this.state.periodicYear === '') {
            Alert.alert('Oops!', 'Please ensure all fields are filled')
        }
        else if (this.state.periodicDay > 31) {
            Alert.alert('Error posting date', 'Please ensure date is valid');
        }
        else if (this.state.periodicMonth > 12) {
            Alert.alert('Error posting date', 'Please ensure date is valid');
        }
        else if (this.state.periodicDay > 29 && this.state.periodicMonth == 2) {
            Alert.alert('Error posting date', 'Please ensure date is valid');
        }
        else if (this.state.year > 2020) {
            Alert.alert('Error posting date', 'Please ensure date is valid');
        }
        else if (this.state.periodicDay > 30 && this.state.periodicMonth == compareToMonths){
            Alert.alert('Error posting date', 'Please ensure date is valid');
        }else {
            this.periodicApiCall();
        }

    }

    prepPeriodicExpense(){
        this.setState({
            date: this.state.periodicYear + '-' + this.state.periodicMonth + '-' + this.state.periodicDay
          }, ()=> { this.postPeriodicExpense()});
          
    }

    render() {
        return (
            <Modal animationType={'slide'} transparent={true}>
                <View style={{ backgroundColor: global.dark === 'grey' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', flex: 1, width: '100%', alignSelf: 'center' }}>
                    <ScrollView horizontal={true}>
                        <View style={{ backgroundColor: global.color, height: 600, top: '5%', borderRadius: 40, marginRight: 5 }}>

                            <Text style={styles.heading}>New Expense</Text>

                            <View style={styles.body}>
                                <View style={{ flex: 4 }}>
                                    <View style={styles.AddExpenseContainer}>



                                        <View style={{ flexDirection: 'row' }}>

                                            <TextInput style={styles.expenseTitleInput}
                                                placeholder={'Title'}
                                                onChangeText={(title) => this.setState({ title })}
                                                value={this.state.title}
                                            />

                                            <Text style={[styles.Label2, { marginRight: 30 }]}>Amount Spent </Text>

                                            <Picker
                                                style={styles.currencyPicker}
                                                selectedValue={this.state.currency}
                                                onValueChange={(itemValue, itemIndex) => this.setState({ currency: itemValue })}
                                            >
                                                <Picker.Item label="€" value="eur" />
                                                <Picker.Item label="£" value="gbp" />
                                                <Picker.Item label="$" value="usd" />
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
                                                <Picker.Item label="Food" value="Food" />
                                                <Picker.Item label="Shopping" value="Shopping" />
                                                <Picker.Item label="Travel" value="Travel" />
                                                <Picker.Item label="Leisure" value="Leisure" />
                                                <Picker.Item label="Health" value="Health" />
                                                <Picker.Item label="Home" value="Home" />
                                                <Picker.Item label="Tech" value="Tech" />
                                                <Picker.Item label="Utilities" value="Utilities" />
                                                <Picker.Item label="Bills" value="Bills" />
                                                <Picker.Item label="Other" value="Other" />
                                            </Picker>

                                            <View style={{ flexDirection: Platform.OS === 'ios' ? 'column' : 'row', position: 'absolute', right: Platform.OS === 'ios' ? '5%' : '45%', bottom: Platform.OS === 'ios' ? 120 : -60 }}>
                                                <TouchableOpacity onPress={() => this.setState({ cashCard: 'Cash' })}
                                                    style={{ borderTopRightRadius: Platform.OS === 'ios' ? 50 : 0, borderTopLeftRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 0 : 50, width: 90, height: 50, justifyContent: 'space-around', backgroundColor: this.state.cashCard === "Cash" ? "grey" : "darkgrey" }}>
                                                    <Text style={{ justifyContent: 'center', textAlign: "center" }} > Cash</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setState({ cashCard: 'Card' })}
                                                    style={{ width: 90, height: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 50 : 0, borderTopRightRadius: Platform.OS === 'ios' ? 0 : 50, justifyContent: 'space-around', backgroundColor: this.state.cashCard === "Card" ? "grey" : "darkgrey" }}>
                                                    <Text style={{ textAlign: "center" }}> Card</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={{ position: 'absolute', right: 25, bottom: Platform.OS === 'ios' ? 80 : 10 }}>{this.state.onlineSwitch ? 'Online Purchase' : 'Online Purchase?'}</Text>
                                            <Switch onValueChange={(onlineSwitch) => this.setState({ onlineSwitch })} value={this.state.onlineSwitch}
                                                style={{ position: 'absolute', right: 50, bottom: Platform.OS === 'ios' ? 30 : -30 }}
                                            />
                                        </View>
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                    <TouchableOpacity
                                        style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, right: 20 }}
                                        onPress={() => this.state.nav.pop()}
                                    >
                                        <Text style={{ justifyContent: 'center', textAlign: "center", color: 'grey', fontWeight: 'bold' }}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, left: 20 }} onPress={() => this.postExpense()}>
                                        <Text style={{ justifyContent: 'center', textAlign: "center", color: 'grey', fontWeight: 'bold' }}>Go!</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ alignSelf: 'center', flexDirection: 'row', paddingBottom: 5 }}>
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'black', marginRight: 5 }} />
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'grey', marginLeft: 5 }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: global.color, height: 600, top: '5%', borderRadius: 40 }}>

                            <Text style={styles.heading}>Periodic Expense</Text>

                            <View style={styles.body}>
                                <View style={{ flex: 4 }}>
                                    <View style={styles.AddExpenseContainer}>



                                        <View style={{ flexDirection: 'row' }}>

                                            <TextInput style={styles.expenseTitleInput}
                                                placeholder={'Title'}
                                                onChangeText={(periodicTitle) => this.setState({ periodicTitle })}
                                                value={this.state.periodicTitle}
                                            />

                                            <Text style={[styles.Label3, { marginRight: 40, marginLeft: 10 }]}>Amount</Text>

                                            <Picker
                                                style={[styles.currencyPicker, { top: Platform.OS === 'ios' ? 0 : -10, right: Platform.OS === 'ios' ? 60 : 30 }]}
                                                selectedValue={this.state.periodicCurrency}
                                                onValueChange={(itemValue, itemIndex) => this.setState({ periodicCurrency: itemValue })}
                                            >
                                                <Picker.Item label="€" value="eur" />
                                                <Picker.Item label="£" value="gbp" />
                                                <Picker.Item label="$" value="usd" />
                                            </Picker>

                                            <TextInput style={[styles.amountInput, { top: Platform.OS === 'ios' ? 90 : -5, width: Platform.OS === 'ios' ? 160 : 130, right: 50, }]}
                                                placeholder={"0"}
                                                onChangeText={(periodicAmount) => this.setState({ periodicAmount })}
                                                value={this.state.periodicAmount}
                                                Amount={this.state.periodicAmount}
                                            />
                                        </View>

                                        <View >
                                            <Picker
                                                style={styles.periodicCategoryPicker}
                                                selectedValue={this.state.periodicCategory}
                                                onValueChange={(itemValue, itemIndex) => this.setState({ periodicCategory: itemValue })}
                                            >
                                                <Picker.Item label="-Select Category-" value="" />
                                                <Picker.Item label="Groceries" value="Groceries" />
                                                <Picker.Item label="Food" value="Food" />
                                                <Picker.Item label="Shopping" value="Shopping" />
                                                <Picker.Item label="Travel" value="Travel" />
                                                <Picker.Item label="Leisure" value="Leisure" />
                                                <Picker.Item label="Health" value="Health" />
                                                <Picker.Item label="Home" value="Home" />
                                                <Picker.Item label="Tech" value="Tech" />
                                                <Picker.Item label="Utilities" value="Utilities" />
                                                <Picker.Item label="Bills" value="Bills" />
                                                <Picker.Item label="Other" value="Other" />
                                            </Picker>

                                        </View>

                                        <View style={{ flexDirection: Platform.OS === 'ios' ? 'column' : 'row', position: 'absolute', left: Platform.OS === 'ios' ? '5%' : '13%', bottom: Platform.OS === 'ios' ? 100 : 85 }}>
                                            <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'weekly' })}
                                                style={{ borderTopRightRadius: Platform.OS === 'ios' ? 50 : 0, borderTopLeftRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 0 : 50, width: 90, height: 50, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat === "weekly" ? "grey" : "darkgrey" }}>
                                                <Text style={{ justifyContent: 'center', textAlign: "center" }} > Weekly</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'monthly' })}
                                                style={{ width: 90, height: 50, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat === "monthly" ? "grey" : "darkgrey" }}>
                                                <Text style={{ textAlign: "center" }}> Monthly</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'annually' })}
                                                style={{ width: 90, height: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 50 : 0, borderTopRightRadius: Platform.OS === 'ios' ? 0 : 50, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat === "annually" ? "grey" : "darkgrey" }}>
                                                <Text style={{ textAlign: "center" }}> Annually</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={{ position: 'absolute', left: Platform.OS === 'ios' ? 25 : 30, bottom: Platform.OS === 'ios' ? 60 : 25, fontSize: 15, fontWeight: '400' }}>Start Date: </Text>
                                        <View style={{ flexDirection: 'row', position: 'absolute', left: Platform.OS ==='ios'? '22.5%':'35%', bottom: 10, alignSelf: 'center' }}>
                                            <TextInput
                                                style={{ borderTopLeftRadius: 40, borderBottomLeftRadius: 40, width: '25%', padding: 15, justifyContent: 'space-around', backgroundColor: 'darkgrey', textAlign: 'center' }}
                                                placeholder={'DD'}
                                                onChangeText={(periodicDay) => this.setState({ periodicDay })}
                                                value={this.state.periodicDay}
                                            >
                                            </TextInput>
                                            <TextInput
                                                style={{ width: '25%', justifyContent: 'space-around', padding: 15, backgroundColor: "darkgrey", textAlign: 'center' }}
                                                placeholder={'MM'}
                                                onChangeText={(periodicMonth) => this.setState({ periodicMonth })}
                                                value={this.state.periodicMonth}
                                            >
                                            </TextInput>
                                            <TextInput
                                                style={{ width: '25%', borderBottomRightRadius: 40, borderTopRightRadius: 40, padding: 15, justifyContent: 'space-around', backgroundColor: "darkgrey", textAlign: 'center' }}
                                                placeholder={'YYYY'}
                                                onChangeText={(periodicYear) => this.setState({ periodicYear })}
                                                value={this.state.periodicYear}
                                            >
                                            </TextInput>
                                        </View>
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                    <TouchableOpacity
                                        style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, right: 20 }}
                                        onPress={() => this.state.nav.pop()}
                                    >
                                        <Text style={{ justifyContent: 'center', textAlign: "center", color: 'grey', fontWeight: 'bold' }}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, left: 20 }}
                                        onPress={() => this.prepPeriodicExpense()}
                                    >
                                        <Text style={{ justifyContent: 'center', textAlign: "center", color: 'grey', fontWeight: 'bold' }}>Go!</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ alignSelf: 'center', flexDirection: 'row', paddingBottom: 5 }}>
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'grey', marginRight: 5 }} />
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'black', marginLeft: 5 }} />
                                </View>

                            </View>
                        </View>

                    </ScrollView>
                </View >
            </Modal>


        )
    }

}