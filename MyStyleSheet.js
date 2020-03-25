import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({

    header: {
        flex: 1.5,
    },

    body: {
        flex: 10,
    },

    footer: {
        flex: 1,
    },

    loginHeader:{
        flex: 3.5,
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

    Homebutton1: {
        width: 150,
        height: 150,
        borderRadius: 50,
        backgroundColor: '#26baee',
        alignContent: 'center',
        justifyContent: 'center',
    },

    Homebutton2: {
        width: 150,
        height: 150,
        margin: 0,
        borderRadius: 80,
        backgroundColor: 'grey',
        alignContent: 'center',
        justifyContent: 'center',
    },

    Homebutton3: {
        width: 150,
        height: 150,
        margin: 0,
        borderRadius: 80,
        backgroundColor: 'darkgrey',
        alignContent: 'center',
        justifyContent: 'center',
    },

    Homebutton4: {
        width: 150,
        height: 150,
        margin: 0,
        borderRadius: 80,
        backgroundColor: 'lightgrey',
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
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
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

    homeScreenButtonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',  
    },

    SignInFormContainer: {
        flex: 4,
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
        textAlign: 'center',
        width: 200,
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
        padding: 10,
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

    FormContainer1: {
        flex: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
        borderRadius: 50,
        backgroundColor: 'lightgray',
    },

    Form1: {
        alignContent: 'center',
        justifyContent: 'center',
    },

    Label1: {
        flex: 1,
        left: 40,
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },

    Input1: {
        flex: 1,
        padding: 20,
        right: 30,
        width: '40%',
    },

    FormContainer2: {
        flex: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 200,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },

    Form2: {
        alignContent: 'center',
        justifyContent: 'center',
    },

    Input2: {
        flex: 1,
        padding: 20,
        right: 20,
        width: '10%',
        backgroundColor: 'darkgrey',
        borderRadius: 50,
    },

    Label3: {
        flex: 1,
        zIndex: 11,
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        left: 30
    },

    AddExpenseContainer: {
        height: Platform.OS === 'ios' ? 420 : 300, 
        backgroundColor: 'lightgrey', 
        justifyContent: 'center', 
        borderRadius: 50
    },

    currencyPicker:{
        width: Platform.OS ==='ios' ? 50: 80, 
        right: Platform.OS ==='ios' ? 60: 30, 
        top: Platform.OS === 'ios'? 20: -10
    },

    amountInput:{
        width: 120, 
        backgroundColor: 'darkgrey', 
        height: 40, 
        right: 20, 
        top: Platform.OS ==='ios' ? 105: -5, 
        borderRadius: 50, 
        padding: 10
    },

    expenseTitleInput:{
        width: '80%', 
        backgroundColor: 'darkgrey', 
        position:'absolute',
        top: Platform.OS ==='ios' ? 30: -65, 
        left: 42,
        borderRadius: 50, 
        padding: 10,
        textAlign:'center',
        zIndex: 1,
    },

    categoryPicker:{
        width: Platform.OS ==='ios' ? 180: 200, 
        bottom: Platform.OS === 'ios' ? 30 : 20, 
        left: Platform.OS ==='ios' ? 20: 120
    },

    Label2: {
        flex: 1,
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        top: Platform.OS === 'ios' ? 95 : -20
    },

    viewExpenseDetails:{
        fontWeight:'300',
        fontSize: 20,
        
    },

}); 