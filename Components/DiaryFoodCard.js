import React from 'react';
import {View, StyleSheet, Button, TouchableHighlight, Text} from 'react-native';

/**
 * The DiaryFoodCard Component provides a convenient
 * method for providing the user with information retrieved
 * from the Firestore Database.
 * @param props
 * @returns {*}
 * @constructor
 */
const DiaryFoodCard = props => {
    let description = props.description;
    return (
        <TouchableHighlight style={styles.touchableStyling}>
            <View style={styles.cardStyling}>
                <Text style={styles.textStyling}>Food Type: {props.foodName}</Text>
                <Text style={styles.textStyling}>Meal Time: {props.meal}</Text>
                <Text style={styles.textStyling}>Estimated Calories: {props.calories}</Text>
                <Text style={styles.textStyling}>Date Consumed: {props.date}</Text>
            </View>
        </TouchableHighlight>
    );
};

/**
 * The main advantage of handling all user diary food's
 * in this way is that we can (1) reuse the styling code
 * a number of times, without needing to repeat it within
 * the main logic of the screen, and (2) we are able to
 * abstract the component away from the other components
 * in the screen - therefore providing developers with
 * greater control over the component itself.
 */
const styles = StyleSheet.create({
    cardStyling: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'flex-start',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.3,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    imageStyling: {
        height: 300,
        width: 300,
        flex: 1,
        resizeMode: 'contain',
        borderRadius: 50,
        // paddingTop: -10,
    },
    touchableStyling: {
        width: '80%',
        height: 125,
        flex: 1,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.3,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 20,
    },
    textStyling: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default DiaryFoodCard;
