// import * as React from 'react';
// import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
// import Stack from '../homeStack';
// import styles from '../MyStyleSheet';
// var APILink = 'http://myvault.technology/api/users/';

// export default class PersonalDetails extends React.Component {

//     constructor({ navigation }) {
//         super();
//         this.state = {
//             isLoading: true,
//             dataSource: null
//         };
//         this.navigateUser = this.navigateUser.bind(this);
//     }

//     componentDidMount() {
//         fetch('http://myvault.technology/api/users/details', {
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + global.clientToken,
//             },
//         })
//             .then((response) => response.json())
//             .then((response) => {
//                 if (response.success) {
//                     this.setState({
//                         isLoading: false,
//                         dataSource: response.output,
//                     })
//                 }
//                 else {
//                     alert('there was an error loading details')
//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }



//     render() {

//         if (this.state.isLoading) {
//             return (
//                 <View style={styles.container}></View>
//             );
//         }
//         else {
//             let user = this.state.dataSource.map((val, key) => {
//                 return <View style={styles.container} >
//                     <Text>Text</Text>
//                     {/* <View style={{ flexDirection: 'row' }}>
//                         <Text >Name</Text>
//                         <Text style={styles.Input1}>{val.name}</Text>
//                     </View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Text style={styles.Label1}>Surname</Text>
//                         <Text style={styles.Input1}>{val.surname}</Text>
//                     </View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Text style={styles.Label1}>Email</Text>
//                         <Text style={styles.Input1}>{val.email}</Text>
//                     </View> */}
//                 </View>
//             });


//             return (
//                 <View style={styles.container}>
//                     <View style={styles.header}>
//                         <View style={styles.headerContainer}>
//                             <Text style={styles.HeaderText}>Personal Details</Text>
//                         </View>
//                     </View>

//                     <View style={styles.body}>

//                         <Text style={{ textAlign: 'center', top: 200 }}>Title</Text>

//                     </View>

//                     <View style={styles.footer}>
//                         <Footer navigateUser={this.navigateUser} />
//                     </View>
//                 </View>
//             );
//         }

//     }
// }

import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Modal, Platform } from 'react-native';
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
                    <View style={{ position: 'absolute', width: 5, height: '100%', backgroundColor: global.dark, zIndex: 1, left: '40%' }}></View>

                    <TouchableOpacity style={{ backgroundColor: 'lightgrey', width:80, height: 30, borderRadius:20, position:'absolute', right:'6%', top:48, justifyContent:'space-around'}}>
                        <Text style={styles.text}>EDIT</Text>
                    </TouchableOpacity>

                    <View style={{ width: '95%', paddingTop: 30, paddingBottom: 30, alignSelf: 'center', backgroundColor: 'lightgrey', borderRadius: 20, flexDirection: 'row', top: '20%' }} >
                        <View style={{ alignItems: 'center', marginLeft: 22 }}>
                            <Text style={styles.personalDetailsText}>Name</Text>

                            <Text style={styles.personalDetailsText}>Surname</Text>

                            <Text style={styles.personalDetailsText}>Email</Text>

                            <Text style={styles.personalDetailsText}>Date of Birth</Text>
                        </View>
                        <View style={{alignItems: 'center', marginLeft: 50, width: '45%' }}>
                            <Text style={styles.personalDetailsText}>{val.name}</Text>
                            <Text style={styles.personalDetailsText}>{val.surname}</Text>
                            <Text style={styles.personalDetailsText}>{val.email}</Text>
                            <Text style={styles.personalDetailsText}>{val.dob.split('T00:00:00.000Z')}</Text>
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
                        </View>
                    </View>

                    <Footer navigateUser={this.navigateUser} />

                </View>
            );
        }

    }
}