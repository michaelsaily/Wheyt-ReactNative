import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Button, Alert} from 'react-native';
import Firebase from 'firebase';
import 'firebase/firestore';
import UpdateWeight from './UpdateWeight';
import CustomButton from '../Components/CustomButton';
import FloatingButton from '../Components/FloatingButton';
import {withNavigation} from "react-navigation";
import DiaryFoodCard from '../Components/DiaryFoodCard';

/**
 * The Progress page aims to provide a snapshot of the user's current
 * and most up-to-date weight-loss information. The screen is aimed
 * at providing contextual feedback to the user's about their weight
 * loss journey, and how closely they are meeting their overall goal.
 * @param navigation
 * @returns {*}
 * @constructor
 */
class Progress extends React.Component {

    /**
     * The constructor is used to initialise the starting
     * state of the data (which is empty by default).
     * @param props
     */
    constructor(props){
        super(props);
        this.state = {startingWeight: 0, currentWeight: 0, goalWeight: 0, weightHistory: []};
    }

    /**
     * The following function handles all API calls specifically
     * related to the retrieval of the foodList from Firebase.
     * The function essentially queries the Firestore database
     * in order to fetch a list of food items consumed by the
     * current user. In order to perform this action, the following
     * function ensures that a valid user is signed into the app,
     * before the request token is submitted to the Firebase API,
     * in order to successfully complete the operation.
     * @returns {Promise<void>}
     */
    fetchData = async () => {
        /**
         * The following local array is used to store all of the
         * food items retrieved from the API call, before the
         * state is dynamically updated within a later section of
         * the request.
         * @type {Array}
         */
        let downloadedWeightHistory = [];
        let sWeight = 0;
        let cWeight = 0;
        let gWeight = 0;
        /**
         * The following line re-initialises the starting state of the
         * data. This is done in order to allow re-render operations to
         * be carried out by React Native.
         */
        this.setState({startingWeight: 0, currentWeight: 0, goalWeight: 0});
        // The following line ensures that a valid user is in fact logged in
        await Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Firebase.firestore().doc(`/userProfiles/${user.uid}`)
                    .get()
                    .then(weightListSnapshot =>
                    {
                        sWeight = weightListSnapshot.get('enteredStartingWeight');
                        cWeight = weightListSnapshot.get('enteredCurrentWeight');
                        gWeight = weightListSnapshot.get('enteredDesiredWeight');
                        downloadedWeightHistory = weightListSnapshot.get('weightHistory');
                    }).then(()=>{
                    /** The following line will then update the state, ensuring
                     * that if any data change is detected, a re-render will be
                     * called
                     */
                    this.setState({startingWeight: sWeight, currentWeight: cWeight, goalWeight: gWeight, weightHistory: downloadedWeightHistory});
                    // console.log('Starting');
                    // console.log(sWeight);
                    // console.log(this.state.startingWeight);
                    console.log(this.state.weightHistory);
                }).catch(error => console.log(error));
            } else {
                /**
                 * Feedback to the user must be provided in the case
                 * and situation that no valid userID is detected.
                 */
                Alert.alert('User not signed in');
            }
        }).bind(this);
    };

    /**
     * As the following function is instantiated as soon as the
     * component is mounted the very first time, it is the
     * default method used to execute the API call. The function
     * is also responsible for using the didFocus event hook,
     * in order to create a listener which re-requests the
     * Firebase API for food data, every time the page is focused.
     * @returns {Promise<void>}
     */
    componentDidMount = async () => {
        const {navigation} = this.props;
        /**
         * The following listener is used to ensure that all food
         * items added to the diary through the AddFoodToDiary
         * page, are reflected within the current page, by
         * gaining the most up-to-date list available.
         */
        this.focusListener = navigation.addListener('didFocus', ()=>{
            this.fetchData().catch(error=> console.log(error));
        });
    };

    /**
     * The following function ensures that the focus listener is
     * removed when the page is about to unmount, in order to
     * effectively ensure that no performance hits are taken
     * by the program in the long run.
     */
    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        {/**
         * The following block of code is responsible for checking if a valid
         * list can be retrieved from the Firebase API to render. Until a list
         * is retrieved, the function ensures that a feedback is provided
         * to the user indicating that the loading process has not completed.
         * Note: A ternary operator must be used here as we are unable to code
         * native javascript logic within the render function (which primarily uses JSX).
         */}
         let weightLost = this.state.startingWeight - this.state.currentWeight;
        let percentage =  (weightLost / (this.state.startingWeight - this.state.goalWeight)) * 100;
        let content1 = this.state.startingWeight === 0 ?
            <Text>Loading Please Wait...</Text>: <Text>So far you have lost {weightLost} KG cumulatively! You are {percentage}% towards your goal!</Text>;

        let content2 = this.state.startingWeight === 0 ?
            <Text></Text>:this.state.weightHistory.map((item, index) => {
                return <Text> {index} : {item} </Text>
            });

        return (
            //The following line of code sets the background of the screen.
            <ImageBackground source={require("../assets/images/general/night.png")}
                             style={{width: '100%', height: '100%', flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.center1}>
                        {content1}
                    </View>
                    <View style={styles.center2}>
                        <Text style={{fontWeight: 'bold'}}>Your Weight History!</Text>
                        <Text> </Text>
                        {/*<CustomButton title="Add Food" func={() => navigation.navigate('UpdateWeight')} />*/}
                        {content2}
                    </View>
                </View>
                <FloatingButton func={() => this.props.navigation.navigate('UpdateWeight')}/>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center1: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '20%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
    },
    center2: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 10,
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

export default withNavigation(Progress);
