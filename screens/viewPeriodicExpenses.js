import * as React from 'react';
import { View, Text, Alert, TouchableOpacity, Modal, Platform, Picker, Switch } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import styles from '../MyStyleSheet';

var compareToMonths = [2, 4, 6, 9, 11];
const digits = new RegExp("^[1-1000]+$");

var APIDelLink = 'https://myvault.technology/api/expenses/periodic/del/';
var APIGetByTimeLink = 'https://myvault.technology/api/expenses/';
var APISaveEditedExpense = 'https://myvault.technology/api/expenses/edit/';
var APISaveEditedPeriodicExpense = 'https://myvault.technology/api/expenses/periodic/edit/';

export default class viewPeriodicExpenses extends React.Component {

    constructor({ navigation }) {
        super();

        this.state = {
            nav: navigation,
            isLoading: true,
            show: false,
            edit: false,

            id: '',
            title: '',
            amount: '',
            currency: '',
            date: '',
            category: '',
            online: false,
            cashcard: '',
            isClicked: 'all',
            showFilter: false,
            filterCategory: '',

            periodicID: '',
            periodicTitle: '',
            periodicAmount: '',
            periodicCurrency: 'eur',
            periodicCategory: '',
            periodicRepeat: 'day',
            periodicDay: '',
            periodicMonth: '',
            periodicYear: '',
            periodicDate: '',
            interval: '1',
            requestInterval:''
        };

        this.navigateUser = this.navigateUser.bind(this);
        this.call = this.call.bind(this);
    }

    navigateUser(screen) {
        this.props.navigation.navigate(screen);
    }

    call(method) {
        getAllExpenses();
    }

    componentDidMount() {
        console.disableYellowBox = true;
        this.fetchExpenses();
    }

    //save expense edited by appending ID to link
    saveEditedExpense() {
        APISaveEditedExpense = APISaveEditedExpense + this.state.id;
        console.log(APISaveEditedExpense)

        this.editOneTimeExpenseSave();
        APISaveEditedExpense = 'https://myvault.technology/api/expenses/edit/';
        console.log(this.state.title + " " + this.state.category + " " + this.state.amount + " " + this.state.cashcard + " " + this.state.currency + " " + this.state.online + " " + this.state.id + " " + this.state.date.split('T00:00:00.000Z'));
    }

    //get all periodic expenses to be displayed
    fetchExpenses() {
        fetch('https://myvault.technology/api/expenses/periodic', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    this.setState({
                        isLoading: false,
                        dataSource: response.output,

                    })
                }
                else {
                    alert('there was an error loading details')
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    //call API to delete periodic expense by ID
    async apiCall() {
        APIDelLink = APIDelLink + this.state.periodicID;
        await fetch(APIDelLink, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
        })
            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    this.setState({ show: false })
                    APIDelLink = 'https://myvault.technology/api/expenses/periodic/del/';
                    this.componentDidMount();
                    console.log(response.output(0).lasttransdate)
                }
                else {
                    console.log('Unsuccessful')
                    console.log(response)
                    Alert.alert('Oops!', 'Something went wrong removing the expense')
                    this.state.nav.navigate('viewPeriodicExpenses')
                }
            })
            .catch(error => console.warn(error))

    }

    //put requests update data to ensure all data instances are valid and proper data is shown
    async periodicApiCall() {

        await fetch(APISaveEditedPeriodicExpense + this.state.periodicID, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            }, //send data as JSON to API
            body: JSON.stringify({
                category: this.state.periodicCategory,
                amount: this.state.periodicAmount,
                currency: this.state.periodicCurrency,
                title: this.state.periodicTitle,
                interval: this.state.requestInterval,
                date: this.state.date
            })
        })
            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    console.log('Expense successfully posted!')
                    this.setState({ edit: false })
                    this.componentDidMount();
                }
                else {
                    console.log('something went wrong!')
                    console.log(response)
                    Alert.alert('Oops!', 'Something went wrong')
                }
            })
            .catch(error => console.warn(error))

    }

    //format date to be recieved  by API
    prepPeriodicExpenseSaveEdit() {
        this.setState({
            date: this.state.periodicYear + '-' + this.state.periodicMonth + '-' + this.state.periodicDay,
            requestInterval: this.state.interval + " " + this.state.periodicRepeat
        }, () => { this.postPeriodicExpense() });

    }

    async postPeriodicExpense() {

        var dayInteger = parseInt(this.state.periodicDay)
        var monthInteger = parseInt(this.state.periodicMonth)
        var intervalInteger = parseInt(this.state.interval)

        //check if strings are empty
        if (this.state.periodicTitle === '' || this.state.periodicCategory === '' || this.state.periodicDay === '' || this.state.periodicMonth === '' || this.state.periodicYear === '') {
            Alert.alert('Oops!', 'Please ensure all fields are filled')
        } //check if day is valid
        else if (dayInteger>31 | dayInteger < 1) {
            Alert.alert('Error posting date', 'Please ensure the day entered is valid!');
        } //check if month is valid
        else if (monthInteger<1 || monthInteger>12) {
            Alert.alert('Error posting date', 'Please ensure the month entered is valid!');
        } //check if valid day in Feb is entered
        else if (dayInteger > 29 && monthInteger == 2 ) {
            Alert.alert('Error posting date', 'Please ensure a correct day in Febuary is selected!');
        } //check if no day 31 is in a month with 30 days
        else if (dayInteger > 30 && compareToMonths.includes(monthInteger)) {
            Alert.alert('Error posting date', 'Please ensure the date is valid');
        } //ensure intetger is entered 
        else if (!parseInt(this.state.interval)) {
            Alert.alert('Interval error', 'Please ensure the interval is an integer greater than 0');
        } // ensure no 0 interval is entered
          else if (intervalInteger == 0) {
            Alert.alert('Interval error', 'Please ensure the interval is an integer greater than 0');
          }//if all is good then call API
        else {
            this.periodicApiCall();
            APISaveEditedPeriodicExpense = 'https://myvault.technology/api/expenses/periodic/edit/';
        }

    }

    deleteExpense() {
        this.apiCall();
        console.log('removing record no. ' + this.state.periodicID);
        this.setState({ show: false })
        this.componentDidMount();
    }



    convertCurrency(c) {

        switch (c) {
            case 'eur':
                return '€';

            case 'gbp':
                return '£';

            case 'usd':
                return '$';

            default:
                break;
        }
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={[styles.container, { backgroundColor: global.dark }]}>
                    <Text style={[styles.heading, { color: global.color }]}>Periodic Expenses</Text>
                    <View style={styles.body}>
                    </View>
                    <Footer navigateUser={this.navigateUser} />
                </View>

            );
        }
        else if (this.state.dataSource[0] === undefined) {
            return (
                <View style={[styles.container, { backgroundColor: global.dark }]}>
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.heading, { color: global.color }]}>Periodic Expenses</Text>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View style={{ justifyContent: 'space-around', marginTop: '80%' }}>
                            <Text style={{ textAlign: 'center' }}>No expenses to show!</Text>
                        </View>
                        <TouchableOpacity
                            style={{ padding: 10, backgroundColor: global.dark, width: 170, alignSelf: 'center', marginLeft: '2.5%', borderWidth: 1, margin: 10, borderColor: global.dark === 'white' ? 'black' : '#909090' }}
                            onPress={() => this.state.nav.navigate('ViewExpenses')}
                        >
                            <Text style={[styles.text, { fontSize: 12, color: global.dark === 'white' ? 'black' : '#909090' }]}>BACK</Text>
                        </TouchableOpacity>

                    </View>

                    <Footer navigateUser={this.navigateUser} />

                </View>
            );
        }
        else {
            let expenses = this.state.dataSource.map((val, key) => {
                if (val.expensetype == this.state.filterCategory | this.state.filterCategory === '') {
                    console.log(val.interval)
                    var splitString = val.interval.split(" ");
                    return <View key={key} style={[styles.container, { backgroundColor: global.dark }]} >
                        <View style={{ height: 10 }}></View>
                        <TouchableOpacity style={{ width: '95%', height: 80, alignSelf: 'center', backgroundColor: global.dark === 'white' ? 'darkgrey' : '#505050', borderRadius: 20, borderWidth: global.dark === 'grey' ? 1 : 0, shadowOpacity: 0.2, shadowRadius: 7, elevation: 11, margin: 10, marginBottom: 10 }}
                            onPress={() => this.setState({ show: true, periodicID: val.periodicid, periodicTitle: val.transactiontitle, periodicDate: val.lasttransdate, periodicCurrency: val.transactioncurrency, periodicCategory: val.expensetype, periodicAmount: val.expensecost, periodicYear: (val.lasttransdate).substring(0, 4), periodicMonth: (val.lasttransdate).substring(5, 7), periodicDay: (val.lasttransdate).substring(8, 10), interval: splitString[0], periodicRepeat: splitString[1] })} >
                            <Text style={{ fontSize: 40, fontWeight: '600', position: 'absolute', top: Platform.OS === 'ios' ? 18 : 13, left: 30, color: global.color }}>{this.convertCurrency(val.transactioncurrency)}{val.expensecost}</Text>
                            <Text style={{ position: 'absolute', fontSize: 15, right: 30, top: 10 }}>{val.lasttransdate.split('T00:00:00.000Z')}</Text>
                            <Text style={{ position: 'absolute', fontSize: 25, right: 30, top: 40, maxWidth: '45%' }}>{val.transactiontitle}</Text>
                        </TouchableOpacity>

                        < Modal transparent={true} visible={this.state.show} animationType={'fade'}>
                            <View style={{ flex: 1, backgroundColor: global.dark === '#303030' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', justifyContent: 'center' }}>
                                <View style={{ backgroundColor: global.color, paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 20, borderRadius: 40, width: '90%', height: '60%', alignSelf: 'center', justifyContent: 'center' }}>
                                    <ScrollView>

                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity style={{ justifyContent: 'space-around', width: 100, height: 30, borderRadius: 25, backgroundColor: 'grey', position: 'absolute', left: 20, top: 20 }} onPress={() => { this.setState({ show: false }) }}>
                                                <Text style={{ fontSize: 14, textAlign: 'center', color: 'white', fontWeight: '300' }}>CLOSE</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ justifyContent: 'space-around', width: 100, height: 30, borderRadius: 25, backgroundColor: 'grey', position: 'absolute', right: 20, top: 20 }} onPress={() => { this.setState({ show: false, edit: true }) }}>
                                                <Text style={{ fontSize: 14, textAlign: 'center', color: 'white', fontWeight: '300' }}>EDIT</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ position: 'absolute', width: 1, height: '70%', backgroundColor: global.dark, zIndex: -1, alignSelf: 'center', marginTop: 100}}></View>

                                        <View style={{ flexDirection: 'column', marginTop: 80 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ alignItems: 'flex-start', flex: 4, marginRight: 20 }}>
                                                    <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Title</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', marginLeft: 20, flex: 4 }}>
                                                    <Text style={styles.viewDetails}>{this.state.periodicTitle}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ alignItems: 'flex-start', flex: 4, marginRight: 20 }}>
                                                    <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Category</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', marginLeft: 20, flex: 4 }}>
                                                    <Text style={styles.viewDetails}>{this.state.periodicCategory}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ alignItems: 'flex-start', flex: 4, marginRight: 20 }}>
                                                    <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Currency</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', marginLeft: 20, flex: 4 }}>
                                                    <Text style={styles.viewDetails}>{this.state.periodicCurrency}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ alignItems: 'flex-start', flex: 4, marginRight: 20 }}>
                                                    <Text style={[styles.viewDetails, { fontWeight: "600" }]}>{this.state.cashcard === 'Periodic' ? 'Amount' : 'Price'}</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', marginLeft: 20, flex: 4 }}>
                                                    <Text style={styles.viewDetails}>{this.state.periodicAmount}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ alignItems: 'flex-start', flex: 4, marginRight: 20 }}>
                                                    <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Date</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end', marginLeft: 20, flex: 4 }}>
                                                    <Text style={styles.viewDetails}>{this.state.periodicDate.split('T00:00:00.000Z')}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{ backgroundColor: 'grey', borderRadius: 20, height: 30, justifyContent: 'space-around', top: 30, marginBottom: 50 }} onPress={() => this.deleteExpense()}>
                                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', textAlign: 'center' }}>Remove</Text>
                                        </TouchableOpacity>

                                    </ScrollView>
                                </View>
                            </View>
                        </Modal >
                        <Modal animationType={'fade'} transparent={true} visible={this.state.edit}>
                            <View style={{ backgroundColor: global.dark === '#303030' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', flex: 1, width: '100%', alignSelf: 'flex-end', justifyContent: 'space-around' }}>
                                <View style={{ backgroundColor: global.color, height: 600, borderRadius: 40, width: '100%' }}>

                                    <View style={[styles.body, { marginTop: 50 }]}>
                                        <View style={{ flex: 4 }}>
                                            <View style={[styles.AddExpenseContainer, { backgroundColor: global.dark === 'white' ? 'lightgrey' : '#707070'}]}>

                                                <TextInput style={[styles.expenseTitleInput, { top: 10, backgroundColor: global.dark === 'white' ? "darkgrey" : 'grey' }]}
                                                    placeholder={'Expense Title'}
                                                    onChangeText={(periodicTitle) => this.setState({ periodicTitle })}
                                                    value={this.state.periodicTitle}
                                                />
                                                <View style={{ flexDirection: 'column', marginLeft: 40 }}>
                                                    <Text style={[styles.Label3, { right: Platform.OS === 'ios' ? 20 : 0, top: Platform.OS === 'ios' ? 20 : 100 }]}>Amount</Text>
                                                    <View style={{ width: 100, height: 100, flexDirection: 'row', top: Platform.OS === 'ios' ? -55 : -40, marginLeft: Platform.OS === 'ios' ? 0 : '15%' }}>
                                                        <Picker
                                                            style={[styles.currencyPicker, { top: Platform.OS === 'ios' ? 0 : -10, right: 0 }]}
                                                            selectedValue={this.state.periodicCurrency}
                                                            onValueChange={(itemValue, itemIndex) => this.setState({ periodicCurrency: itemValue })}
                                                        >
                                                            <Picker.Item label="€" value="eur" />
                                                            <Picker.Item label="£" value="gbp" />
                                                            <Picker.Item label="$" value="usd" />
                                                        </Picker>

                                                        <TextInput style={[styles.amountInput, { top: Platform.OS === 'ios' ? 90 : -5, width: Platform.OS === 'ios' ? 110 : 130, right: 0, backgroundColor: global.dark === 'white' ? "darkgrey" : 'grey' }]}
                                                            placeholder={"0"}
                                                            onChangeText={(periodicAmount) => this.setState({ periodicAmount })}
                                                            keyboardType = 'numeric'
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

                                                <View style={{ flexDirection: 'column', position: 'absolute', right: '5%', bottom: Platform.OS === 'ios' ? 100 : 80, width:  '90%' }}>

                                                    <Text style={{ fontSize: 20, fontWeight: "600", position: 'absolute', textAlign: 'left', marginTop: '10%' }}>Repeat each</Text>
                                                    <TextInput style={{ marginTop: 30, left: '35%', fontSize: 15, borderWidth: 1, position: 'absolute', padding: 10, width: 50, textAlign: 'center', justifyContent: 'space-around' }}
                                                        onChangeText={(interval) => this.setState({ interval })}
                                                        value={this.state.interval} />

                                                    <View style={{ flexDirection: 'row', marginLeft: '50%' }}>
                                                        <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'day' })}
                                                            style={{ borderTopLeftRadius: 25, width: Platform.OS ==='ios'? 90:80, height: 50, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat.includes("day") ? global.color : global.dark === 'white' ? "darkgrey" : 'grey' }}>
                                                            <Text style={{ justifyContent: 'center', textAlign: "center" }} >{this.state.interval === '1' ? 'Day' : 'Days'}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'week' })}
                                                            style={{ borderTopRightRadius: 25, width: Platform.OS ==='ios'? 90:80, height: 50, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat.includes("week") ? global.color : global.dark === 'white' ? "darkgrey" : 'grey' }}>
                                                            <Text style={{ justifyContent: 'center', textAlign: "center" }} >{this.state.interval === '1' ? 'Week' : 'Weeks'}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginLeft: '50%' }}>
                                                        <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'month' })}
                                                            style={{ width: Platform.OS ==='ios'? 90:80, height: 50, justifyContent: 'space-around', borderBottomLeftRadius: 25, backgroundColor: this.state.periodicRepeat.includes("month") ? global.color : global.dark === 'white' ? "darkgrey" : 'grey' }}>
                                                            <Text style={{ textAlign: "center" }}> {this.state.interval === '1' ? 'Month' : 'Months'}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => this.setState({ periodicRepeat: 'year' })}
                                                            style={{ width: Platform.OS ==='ios'? 90:80, height: 50, borderBottomRightRadius: 50, borderBottomRightRadius: 25, justifyContent: 'space-around', backgroundColor: this.state.periodicRepeat.includes("year") ? global.color : global.dark === 'white' ? "darkgrey" : 'grey' }}>
                                                            <Text style={{ textAlign: "center" }}> {this.state.interval === '1' ? 'Year' : 'Years'}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                                <Text style={{ position: 'absolute', left: Platform.OS === 'ios' ? 25 : 30, bottom: Platform.OS === 'ios' ? 60 : 25, fontSize: 15, fontWeight: '400' }}>Start Date: </Text>
                                                <View style={{ flexDirection: 'row', position: 'absolute', left: Platform.OS === 'ios' ? '22.5%' : '35%', bottom: 10, alignSelf: 'center' }}>
                                                    <TextInput
                                                        style={{ borderTopLeftRadius: 40, borderBottomLeftRadius: 40, width: '25%', padding: 15, justifyContent: 'space-around', backgroundColor: global.dark === 'white' ? 'darkgrey' : 'grey', textAlign: 'center' }}
                                                        maxLength={2}
                                                        placeholder={'DD'}
                                                        onChangeText={(periodicDay) => this.setState({ periodicDay })}
                                                        value={this.state.periodicDay}
                                                    >
                                                    </TextInput>
                                                    <TextInput
                                                        style={{ width: '25%', justifyContent: 'space-around', padding: 15, backgroundColor: global.dark === 'white' ? 'darkgrey' : 'grey', textAlign: 'center' }}
                                                        maxLength={2}
                                                        placeholder={'MM'}
                                                        onChangeText={(periodicMonth) => this.setState({ periodicMonth })}
                                                        value={this.state.periodicMonth}
                                                    >
                                                    </TextInput>
                                                    <TextInput
                                                        style={{ width: '25%', borderBottomRightRadius: 40, borderTopRightRadius: 40, padding: 15, justifyContent: 'space-around', backgroundColor: global.dark === 'white' ? 'darkgrey' : 'grey', textAlign: 'center' }}
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
                                                style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, right: 20 }}
                                                onPress={() => this.setState({ edit: false })}
                                            >
                                                <Text style={{ justifyContent: 'center', textAlign: "center", color: 'grey', fontWeight: 'bold' }}>CANCEL</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 10, left: 20 }}
                                                onPress={() => this.prepPeriodicExpenseSaveEdit()}>
                                                <Text style={{ justifyContent: 'center', textAlign: "center", color: 'grey', fontWeight: 'bold' }}>SAVE</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal >
                    </View >
                }
            });



            return (
                <View style={[styles.container, { backgroundColor: global.dark }]}>
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.heading, { color: global.color }]}>Periodic Expenses</Text>
                        </View>
                    </View>

                    <View style={styles.body}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity
                                style={{ padding: 10, backgroundColor: global.dark, width: 170, alignSelf: 'flex-start', marginLeft: '2.5%', borderWidth: 1, margin: 10, borderColor: global.dark === 'white' ? 'black' : '#909090' }}
                                onPress={() => this.state.nav.navigate('ViewExpenses')}
                            >
                                <Text style={[styles.text, { fontSize: 12, color: global.dark === 'white' ? 'black' : '#909090' }]}>BACK</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 10, backgroundColor: global.dark, width: 170, alignSelf: 'flex-end', marginRight: '2.5%', borderWidth: 1, margin: 10, borderColor: global.dark === 'white' ? 'black' : '#909090' }}
                                onPress={() => this.setState({ showFilter: true })}
                            >
                                <Text style={[styles.text, { fontSize: 12, color: global.dark === 'white' ? 'black' : '#909090' }]}>{this.state.filterCategory === '' ? 'FILTER' : 'FILTER: ' + this.state.filterCategory.toLocaleUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 7 }}>
                            <ScrollView name='scroll'>
                                {expenses}
                            </ScrollView>
                        </View>
                    </View>

                    <Footer navigateUser={this.navigateUser} />


                    < Modal transparent={true} visible={this.state.showFilter} animationType={'none'}>
                        <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-around' }}>
                            <View style={{ backgroundColor: global.color, paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 70, borderRadius: 40, width: '75%', alignSelf: 'center', justifyContent: 'center', height: '50%' }}>


                                <TouchableOpacity style={{ justifyContent: 'space-around', width: 50, height: 50, borderRadius: 25, backgroundColor: 'grey', position: 'absolute', right: 30, top: 25 }} onPress={() => { this.setState({ showFilter: false }) }}>
                                    <Text style={{ fontSize: 40, textAlign: 'center', color: 'white' }}>-</Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row' }}>

                                    <Picker
                                        style={[styles.categoryPicker, { left: '22%' }]}
                                        selectedValue={this.state.filterCategory}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ filterCategory: itemValue })}
                                    >
                                        <Picker.Item label="All" value="" />
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
                                <TouchableOpacity style={{ backgroundColor: 'grey', borderRadius: 20, height: 40, justifyContent: 'space-around', bottom: 20 }} onPress={() => this.setState({ showFilter: false })}>
                                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '300', textAlign: 'center' }}>APPLY FILTER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal >
                </View>


            );
        }
    }
}