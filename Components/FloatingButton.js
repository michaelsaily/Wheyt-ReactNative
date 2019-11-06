import React from 'react';
import {View, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';

/**
 * The following react component is essentially used to return a pre-styled,
 * button that can therefore provide a consistent look-and-feel for the
 * react-native application. By essentially extracting this component out,
 * I am able to not only maximum my code re-use, but enforce consistency
 * to a larger degree within my application.
 * @param props
 * @returns {*}
 * @constructor
 */
const FloatingButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyling} onPress={props.func}>
            <Image style={styles.imgStyling} source={require('../assets/icon/icon2.png')} />
        </TouchableOpacity>
    );
};

/**
 * Through the use of the following styling, I was
 * able to ensure that the button remained position
 * in exactly the same section of the screen. A
 * significant component of this was the fact that
 * absolute position has been used on the component.
 */
const styles = StyleSheet.create({
    buttonStyling: {
        width: 50,
        height: 50,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 35,
        bottom: 90,
        backgroundColor: 'white',
        borderRadius: 35,
    },
    imgStyling: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }
});

export default FloatingButton;
