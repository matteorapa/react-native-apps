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
            newDOB: '',
            year: '',
            month: '',
            day: ''
        };

        this.navigateUser = this.navigateUser.bind(this);
    }

    navigateUser(screen) {
        this.props.navigation.navigate(screen);
    }

    componentDidMount() {
        console.disableYellowBox = true;
        fetch('https://myvault.technology/api/users/details', {
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

        await fetch('https://myvault.technology/api/users/update', {
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

                return <View key={key} style={[styles.container, { backgroundColor: 'global.dark', justifyContent: 'space-around' }]} >
                    <View>
                        <View style={{ flexDirection: 'row', marginBottom:50 }}>
                            <TouchableOpacity style={{ backgroundColor: global.dark === 'white' ? 'darkgrey' : '#505050', width: 80, height: 30, borderRadius: 20, position: 'absolute', left: '6%', justifyContent: 'space-around' }}
                                onPress={() => this.state.nav.navigate('Profile')}
                            >
                                <Text style={styles.text}>BACK</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: global.dark === 'white' ? 'darkgrey' : '#505050', width: 80, height: 30, borderRadius: 20, position: 'absolute', right: '6%', justifyContent: 'space-around' }}
                                onPress={() => this.setState({ show: true, name: val.name, surname: val.surname, email: val.email, dob: val.dob, year: (val.dob).substring(0, 4), month: (val.dob).substring(5, 7), day: (val.dob).substring(8, 10) })}
                            >
                                <Text style={styles.text}>EDIT</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '95%', paddingTop: 30, paddingBottom: 30, alignSelf: 'center', backgroundColor: global.dark === 'white' ? 'darkgrey' : '#505050', borderRadius: 20 }} >

                            <View style={{ flexDirection: 'column', marginTop: 0 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignItems: 'flex-start', flex: 4, marginLeft: 20 }}>
                                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Name</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', marginRight: 20, flex: 4 }}>
                                        <Text style={styles.viewDetails}>{val.name}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignItems: 'flex-start', flex: 4, marginLeft: 20 }}>
                                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Surname</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', marginRight: 20, flex: 4 }}>
                                        <Text style={styles.viewDetails}>{val.surname}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignItems: 'flex-start', flex: 4, marginLeft: 20 }}>
                                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Email</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', marginRight: 20, flex: 4 }}>
                                        <Text style={styles.viewDetails}>{val.email}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignItems: 'flex-start', flex: 4, marginLeft: 20 }}>
                                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Date of Birth</Text>
                                    </View>
                                    <View style={{ alignItems: 'flex-end', marginRight: 20, flex: 4 }}>
                                        <Text style={styles.viewDetails}>{val.dob.split('T00:00:00.000Z')}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', width: 1, height: '95%', backgroundColor: global.dark, zIndex: 1, alignSelf: 'center', marginTop: 40 }}></View>
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
                                <View style={{ flex: 1, backgroundColor: global.dark === '#303030' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', justifyContent: 'space-around' }}>
                                    <View style={{ justifyContent: 'space-around', backgroundColor: 'transparent' }}>



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
                                            <View style={{ width: '100%', alignSelf: 'center', borderRadius: 20 }} >

                                                <View style={{ flexDirection: 'column', marginTop: 0 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ alignItems: 'flex-start', flex: 4, marginLeft: 20 }}>
                                                            <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Name</Text>
                                                        </View>
                                                        <View style={{ alignItems: 'flex-end', marginRight: 20, flex: 4 }}>
                                                            <TextInput style={styles.viewDetails}>{this.state.name}</TextInput>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ alignItems: 'flex-start', flex: 4, marginLeft: 20 }}>
                                                            <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Surname</Text>
                                                        </View>
                                                        <View style={{ alignItems: 'flex-end', marginRight: 20, flex: 4 }}>
                                                            <TextInput style={styles.viewDetails}>{this.state.surname}</TextInput>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ alignItems: 'flex-start', flex: 4, marginLeft: 20 }}>
                                                            <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Email</Text>
                                                        </View>
                                                        <View style={{ alignItems: 'flex-end', marginRight: 20, flex: 4 }}>
                                                            <TextInput style={styles.viewDetails}>{this.state.email}</TextInput>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', margintop: 10, marginBottom: 10 }}>
                                                        <View style={{ alignItems: 'flex-start', flex: 4, marginLeft: 20, justifyContent: 'space-around' }}>
                                                            <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Date of Birth</Text>
                                                        </View>

                                                        <View style={{ flex: 3, paddingTop: 10, paddingBottom: 10, flexDirection: 'row', marginRight: 15 }}>
                                                            <TextInput style={{ flex: 1, borderBottomWidth: 0.4, borderColor: 'grey', marginRight: 7, paddingTop: 5, paddingBottom: 5, textAlign: 'center' }} maxLength={2}
                                                                onChangeText={(day) => this.setState({ day })}
                                                                placeholder={'DD'}
                                                                value={this.state.day}
                                                            />
                                                            <TextInput style={{ flex: 1, borderBottomWidth: 0.4, borderColor: 'grey', marginRight: 7, paddingTop: 5, paddingBottom: 5, textAlign: 'center' }} maxLength={2}
                                                                onChangeText={(month) => this.setState({ month })}
                                                                placeholder={'MM'}
                                                                value={this.state.month}
                                                            />
                                                            <TextInput style={{ flex: 2, borderBottomWidth: 0.4, borderColor: 'grey', paddingTop: 5, paddingBottom: 5, textAlign: 'center' }} maxLength={4}
                                                                onChangeText={(year) => this.setState({ year })}
                                                                placeholder={'YYYY'}
                                                                value={this.state.year}
                                                            />
                                                        </View>

                                                    </View>
                                                </View>
                                                <View style={{ position: 'absolute', width: 1, height: '95%', backgroundColor: global.dark, zIndex: 1, alignSelf: 'center', marginTop: 0 }}></View>
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