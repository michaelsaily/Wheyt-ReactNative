import React from 'react';
import {View, TextInput, StyleSheet, Button, TouchableHighlight, Text, Image, Alert} from 'react-native';

/**
 * The HomeScreenCard Component provides a convenient
 * method for providing the user with information retrieved
 * by the NewsAPI.
 * @param props
 * @returns {*}
 * @constructor
 */
const HomeScreenCard = props => {
    let description = props.description;
    return (
        <TouchableHighlight style={styles.touchableStyling}>
        <View style={styles.cardStyling}>
            <Image style={styles.imageStyling} source={{uri:props.src}}/>
            <Text style={{fontWeight: 'bold'}}> {props.title} </Text>
            <Text> </Text>
            {/**
            * The following line of code is used to detail the entire
             * description with a modifier at the end, highlighting the
             * fact that the entire article is not yet over.
            */}
            <Text> {description.substring(0, description.length)}... </Text>
        </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    cardStyling: {
        width: '100%',
        height: 300,
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
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
        paddingTop: 10
    },
    touchableStyling: {
        width: '100%',
        height: 300,
        flex: 1,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.3,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 20,
    }
});

export default HomeScreenCard;
