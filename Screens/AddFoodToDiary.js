import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Alert} from 'react-native';
import Firebase from 'firebase';
import 'firebase/firestore';

//Component imports
import CustomInput from '../Components/CustomInput';
import CustomKeyboardInput from '../Components/CustomKeyboardInput';
import CustomButton from '../Components/CustomButton';

/**
 * The following function is used to essentially update the
 * list of foods consumed by a user within Firebase. The
 * primary reason behind returning a 'function' component,
 * as opposed to a default class (which is more appropriate
 * is the vast majority of contexts) was the fact that
 * achieving two way synchronous data binding is a much more
 * involved process when compared to the functional variant.
 * This is explained in further detail below.
 * @param navigation
 * @returns {*}
 * @constructor
 */
export default function AddFoodToDiary ({navigation}) {

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
    const [enteredFood, setEnteredFood] = useState('');
    const [enteredMeal, setEnteredMeal] = useState('');
    const [enteredCalories, setEnteredCalories] = useState('');
    const [consumptionDate, setEnteredDate] = useState('');
    const [meal, setMeal] = useState('');

    /**
     * The following function is used to handle all of the
     * required processing in terms of Firebase, essentially
     * adding the foods consumed by the user to the database.
     * The function checks if the entered values are applicable,
     * i.e. defined and completes the remainder of the processing
     * needed to handle the food addition process - in terms of
     * external API calls specifically.
     *
     * The following function also ensures that a valid user is
     * logged in before the request token is submitted to the
     * Firebase API in order to complete the operation.
     */
    const addFoods = () => {
        // The following line ensures that a valid user is in fact logged in
        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                Firebase.firestore()
                    // The following references the collection the food items must be added to.
                    .collection(`/userProfiles/${user.uid}/foodList`).add({
                    name: enteredFood,
                    meal: enteredMeal,
                    calories: enteredCalories,
                    date: consumptionDate
                    }) // Once the food item has been added, navigate to the Diary page to reflect the addition.
                    .then(navigation.navigate('Diary')).
                        catch(error => console.log(error));
            } else {
                /**
                 * Feedback to the user must be provided in the case
                 * and situation that no valid userID is detected.
                 */
                Alert.alert('User not signed in');
            }
        });

    };

    /**
     * An important distinction to make is the fact that functional
     * components do not make use of a render function in order to
     * output the required visual changes. They instead simply rely
     * on a return function in which the react 'component' is
     * essentially returned, making it a child element within the
     * code instantiating it.
     */
    return (
        //The following line of code sets the background of the screen.
        <ImageBackground source={require("../assets/images/general/night.png")} style={{width: '100%', height: '100%', flex: 1}}>
            <View style={styles.container}>
                <View style={styles.center}>
                    {/**
                     * Throughout the body of the function I have made use of the
                     * CustomInput and CustomKeyboardInput components that I have
                     * created. A key distinction between the two components is the
                     * fact that CustomKeyboardInput is used to define a number of
                     * additional properties where different keyboard types are
                     * required, e.g. the number pad for calorie estimation.
                     * Whereas CustomInput components are only used to handle regular
                     * input.
                     */}
                    <CustomInput func={(enteredText) => setEnteredFood(enteredText)} place_holder="Please name what you ate"/>
                    <CustomInput func={(enteredText) => setEnteredMeal(enteredText)} place_holder="Please enter what time you ate it" />
                    {/** The following line limits calorie estimation to a maximum length of 3, using the length property */}
                    <CustomKeyboardInput func={(enteredText) => setEnteredCalories(enteredText)} place_holder="Please estimate the caloric intake" keyboard='number-pad' length={3} />
                    <CustomInput func={(enteredText) => setEnteredDate(enteredText)} place_holder="Please enter the consumption date" />
                    {/** When clicked, the defined button calls the addFoods function defined above */}
                    <CustomButton title="Add Food" func={addFoods} />
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
        height: '85%',
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

