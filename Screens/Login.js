import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Button, Image, Alert} from 'react-native';
import {Header, Body} from 'native-base';
import Firebase from 'firebase';
//Screen imports
import Register from './Register';
import Home from './Home';
// Component imports
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import SmallerButton from '../Components/SmallerButton';

/**
 * The login screen essentially serves as the fundamental
 * entry point for all users within the application.
 * Additionally, it serves as a screen to allow new users
 * to access the registration page to sign up for the app.
 * @param navigation
 * @returns {*}
 * @constructor
 */
export default function Login ({navigation}) {
    /**
     * One of the key details of React Native that should
     * be noted is the fact that the following useState
     * variables are effectively used to employ 'two way
     * data-binding'. Using the useState hook all values
     * are can be synchronously copied between the screen
     * (where the information is provided by the user) and
     * the local variables that are used to store them.
     *
     * Because of this it may not always be clear, but
     * it is extremely important to ensure that our input
     * fields are correctly bound to the appropriate function
     * used to update the state of each field.
     * Or else the data binding process will not work!
     */
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    /**
     * The following function handles all API calls specifically
     * related to the retrieval of the logging the user into the
     * application, through the use of the Firebase Authentication
     * module. In the event that the user provides successful credentials
     * to the application, they are moved directly to the Home screen.
     * Should they provide invalid credentials, they are instead
     * provided with feedback indicating to try again.
     * @returns {Promise<void>}
     */
    const handleLogin = () => {
        Firebase.auth().signInWithEmailAndPassword(enteredEmail, enteredPassword)
            .then(() => navigation.navigate('Home'))
            // The following line provides an alert back to the user, indicating that an incorrect Username and Password
            // combination has been provided, and that they should try again.
            .catch(error => Alert.alert('Incorrect Username or Password. Please try again.'));
    };

    return (
        //The following line of code sets the background of the screen.
        <ImageBackground source={require("../assets/images/general/night.png")} style={{width: '100%', height: '100%', flex: 1}}>
            <View style={styles.container}>

                {/**
                 * The following block of code is used to effectively render the
                 * header at the top of the application. The reason that this is
                 * required is because the Login screen hierarchically is not
                 * located within the tab navigator, but instead its parent
                 * switch navigator instead.
                 */}
                <Header>
                    <Body>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}> Wheyt </Text>
                    </Body>
                </Header>

                {/**
                 * The following div-image combo is used to essentially place the
                 * app's logo in the required top-central position of the screen.
                 */}
                <View style={styles.logoDiv}>
                    <Image style={styles.logo} source={require('../assets/images/login/logo2.png')}/>
                </View>

                {/**
                 * The following block of code is used to primarily retrieve the user credentials
                 * back from the user, and then pass the information through the use of React useState
                 * hooks to the handleLogin function provided above. This in turn allows the information
                 * to be processed therefore allowing the user to effectively log in.
                 */}
                <View style={styles.center}>
                    <CustomInput func={(enteredText) => setEnteredEmail(enteredText)} place_holder="Email"/>
                    <CustomInput func={(enteredText) => setEnteredPassword(enteredText)} place_holder="Password" secure={true} />
                    <CustomButton title="Login" func={handleLogin} />
                </View>

                {/**
                 * The following buttons have been created in order to allow users to essentially navigate
                 * to other screens within the root switch navigator, in order to register for an account
                 * with the application. These are required as the navigation structure of the application
                 * otherwise forbids users from accessing any of the other pages - until they are able to
                 * sign in with a email and password.
                 */}
                <View style={styles.smallerButtons}>
                    <SmallerButton func={() => navigation.navigate('Register')} title="CREATE A NEW ACCOUNT"  />
                    <SmallerButton title="RESET MY PASSWORD" />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    header: {
        marginLeft: '7.5%',
    },
    logoDiv: {
        alignItems: 'center',
    },
    logo: {
        height: 350,
        resizeMode: 'contain',
    },
    smallerButtons: {
        alignItems: 'center',
        marginTop: '5%',
        width: '100%',
    }
});
