import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Firebase from 'firebase';
import {firebaseConfig} from './ConfigurationConstants/FirebaseConfiguration';
//Screen Imports
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import Diary from './Screens/Diary';
import AddFoodToDiary from './Screens/AddFoodToDiary';
import Profile from './Screens/Profile';
import Progress from './Screens/Progress';
import UpdateWeight from './Screens/UpdateWeight';

/**
 * Finally, the tab navigator handles navigation for the Home, Diary,
 * Progress and Profile screens within my React Native application.
 * This tab navigator is nested within a stack navigator, which is
 * then nested within the root switch navigator of the application.
 * @type {import("react-navigation")
 *.NavigationNavigator<any, import("react-navigation")
 * .NavigationProp<import("react-navigation").NavigationState>>}
 */
const AppTabNavigator = createBottomTabNavigator({
    Home: {screen: Home},
    Diary: {screen: Diary},
    Progress: {screen: Progress},
    Profile: {screen: Profile}
}, {navigationOptions: ({navigation}) => {
    const {routeName} = navigation.state.routes[navigation.state.index];
    return {
        headerTitle: routeName
    }
    }});

/**
 * The following stack navigator is nested within the root switch
 * navigator of the application, and handles navigation for the
 * Home, AddFoodToDiary and UpdateWeight screens. This navigator is
 * nested within the root switch navigator, and has a tab navigator
 * nested within it.
 * @type {any}
 */
const AppStackNavigator = createStackNavigator({
   Home: {screen: AppTabNavigator},
   AddFoodToDiary: {screen: AddFoodToDiary, navigationOptions:{headerTitle: 'Add Food To Diary'}},
   UpdateWeight: {screen: UpdateWeight, navigationOptions:{headerTitle: 'Update Weight'}}});

/**
 * The switch navigator is the root navigator within the Wheyt
 * React Native application. The switch navigator primarily handles
 * the Login, Register and Home screens within the application.
 * @type {NavigationNavigator<{}, NavigationProp<NavigationState>>}
 */
const AppSwitchNavigator = createSwitchNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    Diary: {screen: Diary},
    Progress: {screen: Progress},
    UpdateWeight: {screen: UpdateWeight},
    Home: {screen: AppStackNavigator}
});

/**
 * The following allows for the root, nested hierarchical
 * navigator to be exported and used within the react
 * native application.
 * @type {NavigationContainer}
 */
const Navigator = createAppContainer(AppSwitchNavigator);

export default class App extends Component {

    constructor(props){
        super(props);
        /**
         * The following allows for Firebase and Firestore API
         * calls to be made by the application at a later point
         * in time throughout the native application's life cycle.
         */
        console.log(firebaseConfig);
        Firebase.initializeApp(firebaseConfig);
    }

    render() {
        return (
            /**
             * The nested navigator is the only component
             * that we are required to display on each and
             * every page of the application.
             */
            <Navigator />
        );
    }
};

