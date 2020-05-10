import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Modal, Platform, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import styles from '../MyStyleSheet';

export default class PersonalDetails extends React.Component {

    constructor({ navigation }) {
        super();

        this.state = {
            nav: navigation,
            isLoading: true,
            show: false,
            name: '',
            surname: '',
            email: '',
            dob: '',
            newDOB: ''
        };

        this.navigateUser = this.navigateUser.bind(this);
    }

    navigateUser(screen) {
        this.props.navigation.navigate(screen);
    }

    componentDidMount() {
        fetch('http://myvault.technology/api/users/details', {
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

    async apiCall() {

        await fetch('http://myvault.technology/api/users/update', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                dob: this.state.dob
            })
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    Alert.alert('Success', 'Personal details updated!')
                    this.state.nav.navigate('Profile')
                }
                else {
                    console.log('something went wrong!')
                    console.log(response)
                    Alert.alert('Oops!', 'Something went wrong')
                }
            })
            .catch(error => console.warn(error))

    }

    async postUpdatedDetails() {
        if (this.state.name === '' || this.state.surname === '' || this.state.email === '') {
            Alert.alert('Oops!', 'Please ensure all fields are filled')
            this.setState({ show: false })
        }
        else {
            this.setState({ show: false })
            this.apiCall();
            console.log('Sending user details PUT to express server using name: ' + this.state.name + ' surname: ' + this.state.surname + ' email: ' + this.state.email + ' dob: ' + this.state.dob);

        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={[styles.container, { backgroundColor: global.dark }]}>
                    <Text style={styles.heading}>Personal Details</Text>
                    <View style={styles.body}>
                        <Text style={{ textAlign: 'center', justifyContent: 'space-around' }}>Loading...</Text>
                    </View>
                    <Footer navigateUser={this.navigateUser} />
                </View>

            );
        }
        else {

            let details = this.state.dataSource.map((val, key) => {

                return <View key={key} style={[styles.container, { backgroundColor: global.dark }]} >
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ backgroundColor: global.dark==='white'? 'darkgrey':'#505050', width: 80, height: 30, borderRadius: 20, position: 'absolute', left: '6%', top: 48, justifyContent: 'space-around' }}
                            onPress={() => this.state.nav.navigate('Profile')}
                        >
                            <Text style={styles.text}>BACK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: global.dark==='white'? 'darkgrey':'#505050', width: 80, height: 30, borderRadius: 20, position: 'absolute', right: '6%', top: 48, justifyContent: 'space-around' }}
                            onPress={() => this.setState({ show: true, name: val.name, surname: val.surname, email: val.email, dob: val.dob })}
                        >
                            <Text style={styles.text}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '95%', paddingTop: 30, paddingBottom: 30, alignSelf: 'center', backgroundColor: global.dark==='white'? 'darkgrey':'#505050', borderRadius: 20, flexDirection: 'row', top: '20%' }} >
                        <View style={{ alignItems: 'center', flex: 4, marginRight: 10 }}>
                            <Text style={styles.viewDetails}>Name</Text>

                            <Text style={styles.viewDetails}>Surname</Text>

                            <Text style={styles.viewDetails}>Email</Text>

                            <Text style={styles.viewDetails}>Date of Birth</Text>
                        </View>

                        <View style={{ flex: 0.1, position: 'relative', width: 1, height: '100%', backgroundColor: global.dark, zIndex: 1 }}></View>


                        <View style={{ flex: 4, alignItems: 'center', marginLeft: 10, width: '45%' }}>
                            <Text style={styles.viewDetails}>{val.name}</Text>
                            <Text style={styles.viewDetails}>{val.surname}</Text>
                            <Text style={styles.viewDetails}>{val.email}</Text>
                            <Text style={styles.viewDetails}>{val.dob.split('T00:00:00.000Z')}</Text>
                        </View>
                    </View>
                </View >

            });

            return (
                <View style={[styles.container, { backgroundColor: global.dark }]}>
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.heading}>Personal Details</Text>
                        </View>
                    </View>

                    <View style={styles.body}>

                        <View style={{ flex: 7 }}>

                            {details}

                            < Modal transparent={true} visible={this.state.show} animationType={'fade'}>
                                <View style={{ flex: 1, backgroundColor: global.dark, justifyContent:'space-around' }}>
                                    <View style={{ height: '60%', backgroundColor: global.dark }}>



                                        <View style={{ width: '95%', paddingTop: 70, paddingBottom: 30, alignSelf: 'center', backgroundColor: global.color, borderRadius: 20, flexDirection: 'row' }} >
                                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 80, height: 30, borderRadius: 20, position: 'absolute', left: '6%', top: 10, justifyContent: 'space-around' }}
                                                onPress={() => this.setState({ show: false })}
                                            >
                                                <Text style={styles.text}>CANCEL</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ backgroundColor: 'lightgrey', width: 80, height: 30, borderRadius: 20, position: 'absolute', right: '6%', top: 10, justifyContent: 'space-around' }}
                                                onPress={() => this.postUpdatedDetails()}
                                            >
                                                <Text style={styles.text}>SAVE</Text>
                                            </TouchableOpacity>
                                            <View style={{ alignItems: 'center', flex: 4, marginRight: 10 }}>
                                                <Text style={styles.viewDetails}>Name</Text>

                                                <Text style={styles.viewDetails}>Surname</Text>

                                                <Text style={styles.viewDetails}>Email</Text>

                                                <Text style={styles.viewDetails}>Date of Birth</Text>
                                            </View>

                                            <View style={{ flex: 0.1, position: 'relative', width: 1, height: '100%', backgroundColor: global.dark, zIndex: 1 }}></View>

                                            <View style={{ alignItems: 'center', marginLeft: 10, width: '45%', flex: 4 }}>
                                                <TextInput style={styles.viewDetails}
                                                    placeholder={this.state.name}
                                                    onChangeText={(name) => this.setState({ name })}
                                                    value={this.state.name}
                                                />
                                                <TextInput style={styles.viewDetails}
                                                    placeholder={this.state.surname}
                                                    onChangeText={(surname) => this.setState({ surname })}
                                                    value={this.state.surname}
                                                />
                                                <TextInput style={styles.viewDetails}
                                                    placeholder={this.state.email}
                                                    onChangeText={(email) => this.setState({ email })}
                                                    value={this.state.email}
                                                />
                                                <Text style={styles.viewDetails}>{this.state.dob.split('T00:00:00.000Z')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal >
                        </View>
                    </View>

                    <Footer navigateUser={this.navigateUser} />

                </View>
            );
        }

    }
}