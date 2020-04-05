// import * as React from 'react';
// import { View, Text, Button, Image, TouchableOpacity, Picker, Platform, Alert, Modal} from 'react-native';
// import styles from '../MyStyleSheet';
// import Footer from './Footer';
// import { TextInput, Switch } from 'react-native-gesture-handler';

// export default class AddExpense extends React.Component {

//     constructor({ navigation }) {
//         super();
//         this.state = {
//             nav: navigation,
//             title: '',
//             amount: '',
//             currency: 'euro',
//             category: '',
//             cashCard: null,
//             onlineSwitch: false,
//         };
//         this.selectionOnPress = this.selectionOnPress.bind(this);
//     }

//     selectionOnPress(PurchaseLocation) {
//         this.setState({ cashCard: PurchaseLocation });
//     }

//     async apiCall() {

//         await fetch('http://myvault.technology/api/expenses', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + global.clientToken,
//             },
//             body: JSON.stringify({
//                 title: this.state.title,
//                 category: this.state.category,
//                 amount: this.state.amount,
//                 cashCard: this.state.cashCard,
//                 currency: this.state.currency,
//                 onlineSwitch: this.state.onlineSwitch,
//             })
//         })


//             .then(response => (response.json()))
//             .then((response) => {

//                 if (response.success) {
//                     alert('Expense successfully posted!')
//                     this.state.nav.navigate('Home')
//                 }
//                 else {
//                     console.log('something went wrong!')
//                     console.log(response)
//                     Alert.alert('Oops!', 'Something went wrong')
//                     this.setState({ title: '' })
//                     this.setState({ currency: '' })
//                     this.setState({ category: '' })
//                     this.setState({ cashCard: '' })
//                     this.setState({ onlineSwitch: '' })
//                     this.setState({ amount: '' })
//                 }
//             })
//             .catch(error => console.warn(error))

//     }

//     async postExpense() {
//         if (this.state.title === '' || this.state.category === '' || this.state.currency === '' || this.state.cashCard === '' || this.state.amount === '') {
// Alert.alert('Oops!', 'Please ensure all fields are filled')
// }
// else {
//     this.apiCall();
//     console.log('Sending credentials post to express server using title: ' + this.state.title + ' amount: ' + this.state.amount + ' currency: ' + this.state.currency + ' category: ' + this.state.category + ' cash/card: ' + this.state.cashCard + " online? " + this.state.onlineSwitch);
// }
//     }

//     render() {

//         return (
//             <View style={styles.container}>
//                 <View style={styles.header}>
//                     <View style={styles.headerContainer}>
//                         <Text style={styles.HeaderText}>Add Expense</Text>
//                     </View>
//                 </View>

//                 <View style={styles.body}>
//                     <View style={{ flex: 4 }}>
//                         <View style={styles.AddExpenseContainer}>



//                             <View style={{ flexDirection: 'row' }}>

//                                 <TextInput style={styles.expenseTitleInput}
//                                     placeholder={'Title'}
//                                     onChangeText={(title) => this.setState({ title })}
//                                     value={this.state.title}
//                                 />

//                                 <Text style={styles.Label2}>Amount Spent </Text>

//                                 <Picker
//                                     style={styles.currencyPicker}
//                                     selectedValue={this.state.currency}
//                                     onValueChange={(itemValue, itemIndex) => this.setState({ currency: itemValue })}
//                                 >
//                                     <Picker.Item label="€" value="euro" />
//                                     <Picker.Item label="£" value="pound" />
//                                     <Picker.Item label="$" value="dollar" />
//                                 </Picker>

//                                 <TextInput style={styles.amountInput}
//                                     placeholder={"0"}
//                                     onChangeText={(amount) => this.setState({ amount })}
//                                     value={this.state.amount}
//                                     Amount={this.state.amount}
//                                 />
//                             </View>

//                             <View style={{ flexDirection: 'row' }}>
//                                 <Picker
//                                     style={styles.categoryPicker}
//                                     selectedValue={this.state.category}
//                                     onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}
//                                 >
//                                     <Picker.Item label="-Select Category-" value="" />
//                                     <Picker.Item label="Groceries" value="Groceries" />
//                                     <Picker.Item label="Restaurants" value="Restaurants" />
//                                     <Picker.Item label="Shopping" value="Shopping" />
//                                     <Picker.Item label="Transport" value="Transport" />
//                                     <Picker.Item label="Travel" value="Travel" />
//                                     <Picker.Item label="Entertainment" value="Entertainment" />
//                                     <Picker.Item label="Utilities" value="Utilities" />
//                                     <Picker.Item label="Health" value="Health" />
//                                     <Picker.Item label="Services" value="Services" />
//                                     <Picker.Item label="General" value="General" />
//                                     <Picker.Item label="Insurance" value="Insurance" />
//                                     <Picker.Item label="Vehicle" value="Vehicle" />
//                                 </Picker>

//                                 <View style={{ flexDirection: Platform.OS === 'ios' ? 'column' : 'row', position: 'absolute', right: Platform.OS === 'ios' ? 30 : 70, bottom: Platform.OS === 'ios' ? 120 : -50 }}>
//                                     <TouchableOpacity onPress={() => this.setState({ cashCard: 'Cash' })}
//                                         style={{ borderTopRightRadius: Platform.OS === 'ios' ? 50 : 0, borderTopLeftRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 0 : 50, width: 90, height: 60, justifyContent: 'space-around', backgroundColor: this.state.cashCard === "Cash" ? "grey" : "darkgrey" }}>
//                                         <Text style={{ justifyContent: 'center', textAlign: "center" }} > Cash</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity onPress={() => this.setState({ cashCard: 'Card' })}
//                                         style={{ width: 90, height: 60, borderBottomRightRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 50 : 0, borderTopRightRadius: Platform.OS === 'ios' ? 0 : 50, justifyContent: 'space-around', backgroundColor: this.state.cashCard === "Card" ? "grey" : "darkgrey" }}>
//                                         <Text style={{ textAlign: "center" }}> Card</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <Text style={{ position: 'absolute', right: 25, bottom: 80 }}>{this.state.onlineSwitch ? 'Online Purchase' : 'Online Purchase?'}</Text>
//                                 <Switch onValueChange={(onlineSwitch) => this.setState({ onlineSwitch })} value={this.state.onlineSwitch}
//                                     style={{ position: 'absolute', right: 50, bottom: 40 }}
//                                 />
//                             </View>
//                         </View>

//                     </View>

//                     <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

//                         <TouchableOpacity
//                             style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 210 : 160, right: 20 }}
//                             onPress={() => this.state.nav.navigate('Home')}
//                         >
//                             <Text style={{ justifyContent: 'center', textAlign: "center", color: '#26baee', fontWeight: 'bold' }}>Cancel</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 210 : 160, left: 20 }} onPress={() => this.postExpense()}>
//                             <Text style={{ justifyContent: 'center', textAlign: "center", color: '#26baee', fontWeight: 'bold' }}>Go!</Text>
//                         </TouchableOpacity>

//                     </View>
//                 </View>
//             </View >
//         )
//     }
// }

import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Picker, Platform, Alert, Modal } from 'react-native';
import styles from '../MyStyleSheet';

import { TextInput, Switch } from 'react-native-gesture-handler';

export default class AddExpense extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            title: '',
            amount: '',
            currency: 'euro',
            category: '',
            cashCard: '',
            onlineSwitch: false,
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
                    alert('Expense successfully posted!')
                    this.state.nav.navigate('Home')
                }
                else {
                    console.log('something went wrong!')
                    console.log(response)
                    Alert.alert('Oops!', 'Something went wrong')
                    this.setState({ title: '' })
                    this.setState({ currency: '' })
                    this.setState({ category: '' })
                    this.setState({ cashCard: '' })
                    this.setState({ onlineSwitch: '' })
                    this.setState({ amount: '' })
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
        }
    }

    render() {

        return (
            <Modal animationType={'slide'} transparent={true}>
                <View style={{ backgroundColor: 'transparent', flex: 1, width: '97%', alignSelf: 'center' }}>
                    <View style={{backgroundColor: global.color, height:'73%', top:'12%', borderRadius:40}}>
                        <View style={styles.header}>
                            <Text style={styles.heading}>New Expense</Text>
                        </View>

                        <View style={styles.body}>
                            <View style={{ flex: 4 }}>
                                <View style={styles.AddExpenseContainer}>



                                    <View style={{ flexDirection: 'row' }}>

                                        <TextInput style={styles.expenseTitleInput}
                                            placeholder={'Title'}
                                            onChangeText={(title) => this.setState({ title })}
                                            value={this.state.title}
                                        />

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

                                        <View style={{ flexDirection: Platform.OS === 'ios' ? 'column' : 'row', position: 'absolute', right: Platform.OS === 'ios' ? '10%' : '45%', bottom: Platform.OS === 'ios' ? 120 : -60 }}>
                                            <TouchableOpacity onPress={() => this.setState({ cashCard: 'Cash' })}
                                                style={{ borderTopRightRadius: Platform.OS === 'ios' ? 50 : 0, borderTopLeftRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 0 : 50, width: 90, height: 50, justifyContent: 'space-around', backgroundColor: this.state.cashCard === "Cash" ? "grey" : "darkgrey" }}>
                                                <Text style={{ justifyContent: 'center', textAlign: "center" }} > Cash</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState({ cashCard: 'Card' })}
                                                style={{ width: 90, height: 50, borderBottomRightRadius: 50, borderBottomLeftRadius: Platform.OS === 'ios' ? 50 : 0, borderTopRightRadius: Platform.OS === 'ios' ? 0 : 50, justifyContent: 'space-around', backgroundColor: this.state.cashCard === "Card" ? "grey" : "darkgrey" }}>
                                                <Text style={{ textAlign: "center" }}> Card</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{ position: 'absolute', right: 25, bottom: Platform.OS === 'ios'? 80 : 10 }}>{this.state.onlineSwitch ? 'Online Purchase' : 'Online Purchase?'}</Text>
                                        <Switch onValueChange={(onlineSwitch) => this.setState({ onlineSwitch })} value={this.state.onlineSwitch}
                                            style={{ position: 'absolute', right: 50, bottom: Platform.OS === 'ios'? 30:  -30 }}
                                        />
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                <TouchableOpacity
                                    style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: Platform.OS === 'ios' ? 20 : 20, right: 20 }}
                                    onPress={() => this.state.nav.navigate('Home')}
                                >
                                    <Text style={{ justifyContent: 'center', textAlign: "center", color: 'grey', fontWeight: 'bold' }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 90, height: 90, borderRadius: 50, justifyContent: 'space-evenly', bottom: 20, left: 20 }} onPress={() => this.postExpense()}>
                                    <Text style={{ justifyContent: 'center', textAlign: "center", color: 'grey', fontWeight: 'bold' }}>Go!</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View >
            </Modal>
        )
    }

}