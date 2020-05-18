import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Picker, Platform, Alert, Modal, Dimensions } from 'react-native';
import styles from '../MyStyleSheet';

import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
var compareToMonths = [2, 4, 6, 9, 11];
const day = new RegExp("^[1-31]+$");
const month = new RegExp("^[1-12]+$");
const year = new RegExp("^[1900-2020]+$");
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
            periodicRepeat: 'day',
            periodicDay: '',
            periodicMonth: '',
            periodicYear: '',
            date: '',
            interval: '1',

            type: 'one',

            show: true,
        };
        this.selectionOnPress = this.selectionOnPress.bind(this);
    }

    screenwidth = Math.round(Dimensions.get('window').width);

    selectionOnPress(PurchaseLocation) {
        this.setState({ cashCard: PurchaseLocation });
    }

    async apiCall() {

        await fetch('https://myvault.technology/api/expenses', {
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
        console.log(this.state.interval)
        await fetch('https://myvault.technology/api/expenses/periodic', {
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
                interval: this.state.interval
            })
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    console.log('Expense successfully posted!')
                    this.state.nav.pop();
                    this.state.nav.navigate('Home');
                    this.state.nav.navigate('viewPeriodicExpenses')                }
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
                    this.setState({ periodicRepeat: '1 week' })
                }
            })
            .catch(error => console.warn(error))

    }

    async postExpense() {
        if (this.state.title === '' || this.state.category === '' || this.state.cashCard === '' || this.state.amount === '') {
            Alert.alert('Oops!', 'Please ensure all fields are filled')
        }
        else {
            this.apiCall();
            console.log('Sending credentials post to express server using title: ' + this.state.title + ' amount: ' + this.state.amount + ' currency: ' + this.state.currency + ' category: ' + this.state.category + ' cash/card: ' + this.state.cashCard + " online? " + this.state.onlineSwitch);

        }
    }

    async postPeriodicExpense() {

        if (this.state.periodicTitle === '' || this.state.periodicCategory === '' || this.state.periodicDay === '' || this.state.periodicMonth === '' || this.state.periodicYear === '') {
            Alert.alert('Oops!', 'Please ensure all fields are filled')
            // }
            // else if (!day.test(this.state.periodicDay)) {
            //     Alert.alert('Error posting date', 'Please ensure date is valid 1!');
            // }
            // else if (!month.test(this.state.periodicMonth)) {
            //     Alert.alert('Error posting date', 'Please ensure date is valid 2!');
            // }
            // else if (this.state.periodicDay > 29 && this.state.periodicMonth == 2) {
            //     Alert.alert('Error posting date', 'Please ensure date is valid 3!');
            // }
            // else if (!year.test(this.state.periodicYear)) {
            //     Alert.alert('Error posting date', 'Please ensure date is valid 4!');
            // }
            // else if (this.state.periodicDay > 30 && this.state.periodicMonth == compareToMonths) {
            //     Alert.alert('Error posting date', 'Please ensure date is valid 5');
        } else {
            this.periodicApiCall();
            this.state.nav.pop();
            this.state.nav.navigate('Home');
            this.state.nav.navigate('ViewExpenses')
        }

    }

    prepPeriodicExpense() {
        this.setState({
            date: this.state.periodicYear + '-' + this.state.periodicMonth + '-' + this.state.periodicDay,
            interval: this.state.interval + " " + this.state.periodicRepeat
        }, () => { this.postPeriodicExpense() });

    }

    render() {
        return (
            <Modal animationType={'slide'} transparent={true}>
                <View style={{ backgroundColor: global.dark === '#303030' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', flex: 1, width: '100%', alignSelf: 'center' }}>
                    <ScrollView horizontal={true} pagingEnabled={true} ref={(node) => this.scroll = node} scrollEnabled={false}>
                        <View style={{ backgroundColor: global.color, height: 600, top: '5%', borderRadius: 40, marginRight: 5, width: this.screenwidth }}>

                            <View style={[styles.addExpenseTitleContainer, { width: this.screenwidth * 0.94, height: 40 }]}>
                                <TouchableOpacity style={{ position: 'absolute', width: this.state.type === 'one' ? this.screenwidth * 0.55 : this.screenwidth * 0.47, zIndex: this.state.type === 'one' ? 11 : 0, borderWidth: 1, justifyContent: 'flex-start', borderRadius: 20, height: 40, backgroundColor: this.state.type === 'one' ? global.color : global.dark, padding: 5, alignContent: 'center', justifyContent: 'space-around' }}
                                    onPress={() => { this.setState({ type: 'one' }), this.scroll.scrollTo({ x: 0 }) }}>
                                    <Text style={[styles.addExpenseHeading, {color: global.dark==='white'? 'black': this.state.type==='one'?'black':global.color}]}>One Time Expense</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ position: 'absolute', width: this.state.type === 'periodic' ? this.screenwidth * 0.55 : this.screenwidth * 0.47, zIndex: this.state.type === 'periodic' ? 11 : 0, borderWidth: 1, justifyContent: 'flex-start', borderRadius: 20, height: 40, backgroundColor: this.state.type === 'periodic' ? global.color : global.dark, right: 0, alignContent: 'center', justifyContent: 'space-around' }}
                                    onPress={() => { this.setState({ type: 'periodic' }), this.scroll.scrollTo({ x: this.screenwidth }) }}>
                                    <Text style={[styles.addExpenseHeading,{color: global.dark==='white'? 'black': this.state.type==='periodic'?'black':global.color}]}>Periodic Expense</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.body}>
                                <View style={{ flex: 4 }}>
                                    <View style={[styles.AddExpenseContainer, { backgroundColor: global.dark === 'white' ? 'lightgrey' : '#707070' }]}>



                                        <View style={{ flexDirection: 'row' }}>

                                            <TextInput style={[styles.expenseTitleInput,{backgroundColor:global.dark === 'white' ?"darkgrey":'grey'}]}
                                                placeholder={'Expense Title'}
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

                                            <TextInput style={[styles.amountInput, {backgroundColor: global.dark === 'white' ?"darkgrey":'grey'}]}
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
                                                    style={{ borderTopRightRadius: Platform.OS === 'ios' ? 50 : 0, borderTopLeftRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 0 : 50, width: 90, height: 50, justifyContent: 'space-around', backgroundColor: this.state.cashCard === "Cash" ? global.color :global.dark === 'white' ?"darkgrey":'grey' }}>
                                                    <Text style={{ justifyContent: 'center', textAlign: "center" }} > Cash</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setState({ cashCard: 'Card' })}
                                                    style={{ width: 90, height: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 50 : 0, borderTopRightRadius: Platform.OS === 'ios' ? 0 : 50, justifyContent: 'space-around', backgroundColor: this.state.cashCard === "Card" ? global.color : global.dark === 'white' ?"darkgrey":'grey' }}>
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
                                        style={{ backgroundColor: global.dark==='white'? 'lightgrey' : 'grey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, right: 20 }}
                                        onPress={() => this.state.nav.pop()}
                                    >
                                        <Text style={{ justifyContent: 'center', textAlign: "center", color: 'black', fontWeight: '600' }}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ backgroundColor: global.dark==='white'? 'lightgrey' : 'grey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, left: 20 }} onPress={() => this.postExpense()}>
                                        <Text style={{ justifyContent: 'center', textAlign: "center", color: 'black', fontWeight: '600' }}>Go!</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ alignSelf: 'center', flexDirection: 'row', paddingBottom: 5 }}>
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'black', marginRight: 5 }} />
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'grey', marginLeft: 5 }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: global.color, height: 600, top: '5%', borderRadius: 40, width: this.screenwidth }}>

                            <View style={[styles.addExpenseTitleContainer, { width: this.screenwidth * 0.94, height: 40 }]}>
                                <TouchableOpacity style={{ position: 'absolute', width: this.state.type === 'one' ? this.screenwidth * 0.55 : this.screenwidth * 0.47, zIndex: this.state.type === 'one' ? 11 : 0, borderWidth: 1, justifyContent: 'flex-start', borderRadius: 20, height: 40, backgroundColor: this.state.type === 'one' ? global.color : global.dark, padding: 5, alignContent: 'center', justifyContent: 'space-around' }}
                                    onPress={() => { this.setState({ type: 'one' }), this.scroll.scrollTo({ x: 0 }) }}>
                                    <Text style={[styles.addExpenseHeading,{color: global.dark==='white'? 'black': this.state.type==='one'?'black':global.color}]}>One Time Expense</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ position: 'absolute', width: this.state.type === 'periodic' ? this.screenwidth * 0.55 : this.screenwidth * 0.47, zIndex: this.state.type === 'periodic' ? 11 : 0, borderWidth: 1, justifyContent: 'flex-start', borderRadius: 20, height: 40, backgroundColor: this.state.type === 'periodic' ? global.color : global.dark, right: 0, alignContent: 'center', justifyContent: 'space-around' }}
                                    onPress={() => { this.setState({ type: 'periodic' }), this.scroll.scrollTo({ x: this.screenwidth }) }}>
                                    <Text style={[styles.addExpenseHeading, {color: global.dark==='white'? 'black': this.state.type==='periodic'?'black':global.color}]}>Periodic Expense</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.body}>
                                <View style={{ flex: 4 }}>
                                    <View style={[styles.AddExpenseContainer, { backgroundColor: global.dark === 'white' ? 'lightgrey' : '#707070' }]}>

                                        <TextInput style={[styles.expenseTitleInput, { top: 10, backgroundColor: global.dark === 'white' ?"darkgrey":'grey' }]}
                                            placeholder={'Expense Title'}
                                            onChangeText={(periodicTitle) => this.setState({ periodicTitle })}
                                            value={this.state.periodicTitle}
                                        />
                                        <View style={{ flexDirection: 'column', marginLeft:40 }}>
                                            <Text style={[styles.Label3, { right: Platform.OS === 'ios'? 20:0, top: Platform.OS==='ios'? 20:100 }]}>Amount</Text>
                                            <View style={{ width: 100, height: 100, flexDirection: 'row', top: Platform.OS==='ios'? -55:-40, marginLeft: Platform.OS==='ios'? 0:'15%' }}>
                                                <Picker
                                                    style={[styles.currencyPicker, { top: Platform.OS === 'ios' ? 0 : -10, right:0 }]}
                                                    selectedValue={this.state.periodicCurrency}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({ periodicCurrency: itemValue })}
                                                >
                                                    <Picker.Item label="€" value="eur" />
                                                    <Picker.Item label="£" value="gbp" />
                                                    <Picker.Item label="$" value="usd" />
                                                </Picker>

                                                <TextInput style={[styles.amountInput, { top: Platform.OS === 'ios' ? 90 : -5, width: Platform.OS === 'ios' ? 110 : 130, right: 0, backgroundColor: global.dark === 'white' ?"darkgrey":'grey' }]}
                                                    placeholder={"0"}
                                                    onChangeText={(periodicAmount) => this.setState({ periodicAmount })}
                                                    value={this.state.periodicAmount}
                                                    Amount={this.state.periodicAmount}
                                                />
                                            </View>
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

                                        <View style={{ flexDirection:'column' , position: 'absolute', right: '5%', bottom: Platform.OS === 'ios' ? 100 : 80, width: '90%' }}>

                                            <Text style={{ fontSize: 20, fontWeight: "600", position: 'absolute', textAlign: 'left', marginTop: '10%' }}>Repeat each</Text>
                                            <TextInput style={{ marginTop: 30, left: '35%', fontSize: 15, borderWidth: 1, position: 'absolute', padding: 10, width: 40, textAlign: 'center', justifyContent: 'space-around' }}
                                                onChangeText={(interval) => this.setState({ interval })}
                                                value={this.state.interval}/>

                                            <View style={{ flexDirection: 'row', marginLeft: '50%' }}>
                                                <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'day' })}
                                                    style={{ borderTopLeftRadius: 25, width: 90, height: 50, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat === "day" ? global.color : global.dark === 'white' ?"darkgrey":'grey'}}>
                                                    <Text style={{ justifyContent: 'center', textAlign: "center" }} >{this.state.interval === '1' ? 'Day' : 'Days'}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'week' })}
                                                    style={{ borderTopRightRadius: 25, width: 90, height: 50, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat === "week" ? global.color : global.dark === 'white' ?"darkgrey":'grey' }}>
                                                    <Text style={{ justifyContent: 'center', textAlign: "center" }} >{this.state.interval === '1' ? 'Week' : 'Weeks'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginLeft: '50%' }}>
                                                <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'month' })}
                                                    style={{ width: 90, height: 50, justifyContent: 'space-around', borderBottomLeftRadius:  25 , backgroundColor: this.state.periodicRepeat === "month" ? global.color : global.dark === 'white' ?"darkgrey":'grey' }}>
                                                    <Text style={{ textAlign: "center" }}> {this.state.interval === '1' ? 'Month' : 'Months'}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'year' })}
                                                    style={{ width: 90, height: 50, borderBottomRightRadius: 50, borderBottomRightRadius: 25, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat === "year" ? global.color : global.dark === 'white' ?"darkgrey":'grey'}}>
                                                    <Text style={{ textAlign: "center" }}> {this.state.interval === '1' ? 'Year' : 'Years'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <Text style={{ position: 'absolute', left: Platform.OS === 'ios' ? 25 : 30, bottom: Platform.OS === 'ios' ? 60 : 25, fontSize: 15, fontWeight: '400' }}>Start Date: </Text>
                                        <View style={{ flexDirection: 'row', position: 'absolute', left: Platform.OS === 'ios' ? '22.5%' : '35%', bottom: 10, alignSelf: 'center' }}>
                                            <TextInput
                                                style={{ borderTopLeftRadius: 40, borderBottomLeftRadius: 40, width: '25%', padding: 15, justifyContent: 'space-around', backgroundColor: global.dark==='white'? 'darkgrey':'grey', textAlign: 'center' }}
                                                maxLength={2}
                                                placeholder={'DD'}
                                                onChangeText={(periodicDay) => this.setState({ periodicDay })}
                                                value={this.state.periodicDay}
                                            >
                                            </TextInput>
                                            <TextInput
                                                style={{ width: '25%', justifyContent: 'space-around', padding: 15, backgroundColor: global.dark==='white'? 'darkgrey':'grey', textAlign: 'center' }}
                                                maxLength={2}
                                                placeholder={'MM'}
                                                onChangeText={(periodicMonth) => this.setState({ periodicMonth })}
                                                value={this.state.periodicMonth}
                                            >
                                            </TextInput>
                                            <TextInput
                                                style={{ width: '25%', borderBottomRightRadius: 40, borderTopRightRadius: 40, padding: 15, justifyContent: 'space-around', backgroundColor: global.dark==='white'? 'darkgrey':'grey', textAlign: 'center' }}
                                                maxLength={4}
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
                                        style={{ backgroundColor: global.dark==='white'? 'lightgrey' : 'grey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, right: 20 }}
                                        onPress={() => this.state.nav.pop()}
                                    >
                                        <Text style={{ justifyContent: 'center', textAlign: "center", color: 'black', fontWeight: '600' }}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ backgroundColor: global.dark==='white'? 'lightgrey' : 'grey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, left: 20 }}
                                        onPress={() => this.prepPeriodicExpense()}
                                    >
                                        <Text style={{ justifyContent: 'center', textAlign: "center", color: 'black', fontWeight: '600' }}>Go!</Text>
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