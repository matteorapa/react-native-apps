import { StyleSheet, YellowBox } from 'react-native';

export default StyleSheet.create({

    header: {
        flex: 2,
    },

    body: {
        flex: 10,
    },

    footer: {
        flex: 1,
    },

    headerContainer: {
        flex: 2,
        justifyContent: 'center',
    },

    HeaderText: {
        fontSize: 30,
        color: '#26baee',
        textAlign: 'center',
        top: 0,
        fontWeight: 'bold',
    },

    button: {
        width: 150,
        height: 150,
        margin: 0,
        borderRadius: 80,
        backgroundColor: '#26baee',
        alignContent: 'center',
        justifyContent: 'center',
    },

    SettingsButton: {
        width: 35,
        resizeMode: 'contain',
        position: 'absolute',
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
    },

    buttonGrid: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        backgroundColor: '#323232',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
    },

    text: {
        textAlign: 'center',
        fontSize: 15,
    },

    SignInFormContainer: {
        flex: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '70%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'lightgray',
    },

    SignInForm: {
        flex: 1,
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        //paddingBottom: 150,
    },

    UsernamePasswordText: {
        flex: 1,
        alignSelf: 'center',
        top: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },

    UsernamePasswordInput: {
        flex: 1,
        alignSelf: 'center',
    },

    SignInButton: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '50%',
        top: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'lightgrey',
    },

    SignUpButton: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '50%',
        padding:10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'lightgrey',
    },

    CreateAnAccountTouchableOpacity: {
        textAlign: 'center',
        padding: 5,
        top: 40,
    },

    CreateAnAccountTouchableOpacityText: {
        textAlign: 'center',
        color: "#26baee",
    },

    CreateAccountFormContainer: {
        flex: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'lightgray',
    },

    CreateAccountForm: {
        alignContent: 'center',
        justifyContent: 'center',
    },

    CreateAccountLabel: {
        flex: 1,
        left: 40,
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },

    CreateAccountInput: {
        flex: 1,
        padding: 20,
        right: 30,
        width: '40%',
        borderRightColor: 'black',
    },
}); 