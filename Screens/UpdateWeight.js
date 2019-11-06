import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Alert} from 'react-native';
import Firebase from 'firebase';
import 'firebase/firestore';
// Screen imports
import Progress from './Progress';
// Component imports
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';

/**
 * The UpdateWeight screen essentially allows a user
 * to update their weight information that is stored
 * across the Firebase and Firestore services used
 * throughout the application. In doing so, the user
 * is able to view the most up-to-date progress information
 * pertaining strictly to their goals - allowing them to
 * better control their weight-management needs.
 * @param navigation
 * @returns {*}
 * @constructor
 */
export default function UpdateWeight ({navigation}) {
    const [newWeight, setNewWeight] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    /**
     * The following function is delegated the responsibility
     * of ensuring that the newly supplied weight information
     * is updated within both the Firebase and Firestore services
     * as required. To best meet this responsibility, the following
     * function places a number of different 'checks' in place, to
     * confirm whether a valid weight value has been supplied.
     */
    const updateWeight = () => {
        /**
         * The following block of code ensures that a weight
         * value must be provided by the user, in order for their
         * weight to be updated. Furthermore, the weight value
         * provided is then validated (by checking if it is greater
         * than zero) before the operation is executed.
         */
        if(newWeight === '' || parseInt(newWeight) <= 0 || newWeight === undefined){
            Alert.alert('Please enter a weight value that is greater than 0. ');
            return;
        }

        /**
         * The following function handles all API calls specifically
         * related to the 'weight updating' process through the use of
         * the Firebase Authentication and Firestore Storage modules.
         * In the event that the user provides successful credentials
         * to the application, the relating weight information can
         * be updated as expected. However, in the event that a user
         * cannot be validated, they are instead provided with feedback
         * indicating to try again by logging on (a situation that should
         * realistically never occur).
         * @returns {Promise<void>}
         */
        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                /**
                 * The following array contains the weight history
                 * of the individual. This must be stored locally, as
                 * we are unable to directly append information to Firestore.
                 * Instead the information or data must be read in first,
                 * processed, and then updated within the database.
                 * For this purpose, this local array is required.
                 * @type {Array}
                 */
                let downloadedWeightHistory = [];

                /**
                 * The following block of code aims to systematically update
                 * the weight information on the user through the following
                 * steps: (1) store the weight history from Firestore,
                 * into the local variable (downloadedWeightHistory) defined
                 * above, (2) append the new weight to the downloaded weight
                 * history array, (3) upload the modified weightHistory array
                 * to the Firestore module, updating the previously stored object
                 * within the database.
                 */
                Firebase.firestore().doc(`/userProfiles/${user.uid}`).get()
                    .then(weightListSnapshot =>
                {
                    downloadedWeightHistory = weightListSnapshot.get('weightHistory');
                    // Appending new weight to the weight history
                    downloadedWeightHistory.push(newWeight);
                }).then(()=> {
                    Firebase.firestore().doc(`/userProfiles/${user.uid}`)
                        .update({weightHistory: downloadedWeightHistory, enteredCurrentWeight: newWeight})
                        .then(Alert.alert('Weight', 'Your Weight Has Been Updated Successfully', [{text: 'Okay', onPress: ()=>
                            {
                                //Clearing the new weight input fields.
                                setNewWeight('');
                                setEnteredDate('');
                                navigation.navigate('Progress');
                            }}]));
                });
            } else {
                /**
                 * Feedback to the user must be provided in the case
                 * and situation that no valid userID is detected.
                 */
                Alert.alert('User not signed in');
            }
        });

    };

    return (
        //The following line of code sets the background of the screen.
        <ImageBackground source={require("../assets/images/general/night.png")} style={{width: '100%', height: '100%', flex: 1}}>
            <View style={styles.container}>

                {/**
                 * The following block of code is used to primarily retrieve the user's updated
                 * weight information, and then parse the information (through useState) to the
                 * updateWeight function that has been defined above. This in turn allows for
                 * the user's progress information to be updated as required.
                 */}
                <View style={styles.center}>
                    <CustomInput func={(enteredText) => setNewWeight(enteredText)} place_holder="Please enter your new weight"/>
                    <CustomInput func={(enteredText) => setEnteredDate(enteredText)} place_holder="Please enter a date" />
                    <CustomButton title="Update Weight" func={updateWeight} />
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
        height: '100%',
        marginTop: '100%',
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


