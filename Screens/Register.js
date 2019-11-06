import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Button, Image, Alert} from 'react-native';
import {Header, Left, Right, Icon, Body, Input} from 'native-base';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Firebase from 'firebase';
import 'firebase/firestore';
import Home from './Home';

/**
 * The Register screen essentially serves as the fundamental
 * entry point for all users into the React Native application.
 * In order to use the application, users must first register:
 * the Register screen therefore is delegated all of the responsibility
 * associated with ensuring that a user is able to sign-up as expected.
 * And that all of the necessary information is then stored
 * within the appropriate locations across both the Firebase
 * Authentication service, and any Firestore documents that
 * store user-relevant information.
 * @param navigation
 * @returns {*}
 * @constructor
 */
export default function Register ({navigation}) {
    /**
     * The following block of code serves the purpose of
     * extracting user input from the required input
     * components defined further below within the file.
     * Once extracted, the user input can then be processed
     * through the use of the Firebase Authentication and Firestore
     * modules, in order to make the necessary API calls to
     * successfully register a user.
     * Note: In order to achieve this functionality fluidly, useState
     * hooks have been employed, making the process much more seamless
     * from a development perspective.
     */
    const [enteredName, setEnteredName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredHeight, setEnteredHeight] = useState('');
    const [enteredStartingWeight, setEnteredStartingWeight] = useState('');
    const [enteredDesiredWeight, setEnteredDesiredWeight] = useState('');

    /**
     * The createAccount method is tasked with the responsibility
     * of ensuring that all user input is appropriately managed
     * and stored within Firebase. By providing this information, the
     * user should then be able to log in from the Login screen
     * of the application.
     * @returns {Promise<firebase.auth.UserCredential | never>}
     */
    const createAccount = () => {
        let enteredCurrentWeight = enteredStartingWeight;
        let weightHistory = [enteredCurrentWeight];
        return Firebase
            .auth()
            .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
            .then((newUserCredential) => {
                Firebase
                    .firestore()
                    .doc(`/userProfiles/${newUserCredential.user.uid}`)
                    .set({enteredEmail, enteredName, enteredHeight, enteredStartingWeight, enteredCurrentWeight, enteredDesiredWeight, weightHistory})
                    .then(navigation.navigate('Login'));
            })
            .catch(error => {
                Alert.alert(error);
            });
    };

    return (
        //The following line of code sets the background of the screen.
        <ImageBackground source={require("../assets/images/general/night.png")} style={{width: '100%', height: '100%', flex: 1}}>

            {/**
             * The following block of code is used to effectively render the
             * header at the top of the application. The reason that this is
             * required is because the Login screen hierarchically is not
             * located within the tab navigator, but instead its parent
             * switch navigator instead.
             */}
            <Header>
                <Body>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}> Register </Text>
                </Body>
            </Header>

            <View style={styles.container}>

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
                 * hooks to the createAccount function provided above. This in turn allows the information
                 * to be processed therefore allowing the user to effectively log in.
                 */}
                <View style={styles.center}>
                    <CustomInput func={(enteredText) => setEnteredName(enteredText)} place_holder="Name"/>
                    <CustomInput func={(enteredText) => setEnteredEmail(enteredText)} place_holder="Email"/>
                    <CustomInput func={(enteredText) => setEnteredPassword(enteredText)} place_holder="Password" secure={true}/>
                    <CustomInput func={(enteredText) => setEnteredHeight(enteredText)} place_holder="Height"/>
                    <CustomInput func={(enteredText) => setEnteredStartingWeight(enteredText)} place_holder="Starting Weight"/>
                    <CustomInput func={(enteredText) => setEnteredDesiredWeight(enteredText)} place_holder="Desired Weight"/>
                    <CustomButton title="CREATE AN ACCOUNT" func={createAccount} />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: -60,
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
});

