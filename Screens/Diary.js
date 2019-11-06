import React from 'react';
import {ScrollView, Text, StyleSheet, ImageBackground, Alert} from 'react-native';
import Firebase from 'firebase';
import 'firebase/firestore';
import DiaryFoodCard from '../Components/DiaryFoodCard';
import FloatingButton from '../Components/FloatingButton';
import {withNavigation} from 'react-navigation';

/**
 * The following component class is essentially used to
 * list all of the foods consumed by a user, that is
 * stored within Firebase.
 * @param navigation
 * @returns {*}
 * @constructor
 */
class Diary extends React.Component {

    /**
     * The constructor is used to initialise the starting
     * state of the data (which is empty by default).
     * @param props
     */
    constructor(props){
        super(props);
        this.state = {data: ''};
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
        let foodList = [];
        /**
         * The following line re-initialises the starting state of the
         * data. This is done in order to allow re-render operations to
         * be carried out by React Native.
         */
        this.setState({data: ''});
        // The following line ensures that a valid user is in fact logged in
        await Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Firebase.firestore()
                    // The following references the collection the food items must be added to.
                    .collection(`/userProfiles/${user.uid}/foodList`)
                    .get()
                    /**
                     * The following compiles a list of all of the individual food
                     * items that can be retrieved through the use of the
                     * collection highlighted above. For each of those items, a new
                     * javascript object is constructed and pushed into the local
                     * foodList variable, before the state is dynamically updated.
                     */
                    .then(foodListSnapshot => {
                        foodListSnapshot.forEach(snap => {
                            foodList.push({
                                foodName: snap.data().name,
                                mealConsumed: snap.data().meal,
                                estimatedCalories: snap.data().calories,
                                dateConsumed: snap.data().date
                            });
                        });
                    })
                    /** The following line will then update the state, ensuring
                     * that if any data change is detected, a re-render will be
                     * called
                     */
                    .then(() => {
                    this.setState({data: foodList});
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
        let content = this.state.data.length === 0 ?
            <Text>Loading Please Wait...</Text>:this.state.data.map(item => {
                return <DiaryFoodCard foodName={item.foodName}
                                      meal={item.mealConsumed}
                                      calories={item.estimatedCalories}
                                      date={item.dateConsumed}> </DiaryFoodCard>;
            });

        return (
            //The following line of code sets the background of the screen.
            <ImageBackground source={require("../assets/images/general/night.png")}
                             style={{width: '100%', height: '100%', flex: 1}}>
                {/**
                 * A ScrollView is used to wrap the content of the screen, in the
                 * event that the items from the foodList overflow the main screen.
                 * As such, users will be able to continue scrolling downwards
                 * in order to effectively view all entries.
                 */}
                <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                    {/**
                     * Dynamically rendering the list content to the scroll view.
                     */}
                    {content}
                    {/**
                     * The following button allows users to add food to the Diary,
                     * from the diary page, by navigating them to the AddFoodToDiary
                     * page instead.
                     */}
                    {/*<CustomButton title="Add Food" func={() => this.props.navigation.navigate('AddFoodToDiary')} />*/}
                    <Text></Text>
                    <Text></Text>
                </ScrollView>
                <FloatingButton func={() => this.props.navigation.navigate('AddFoodToDiary')} />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        paddingBottom: 50
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    header: {
        marginLeft: '7.5%',
    },
});

export default withNavigation(Diary);
