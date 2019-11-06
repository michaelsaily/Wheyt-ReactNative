import React from 'react';
import {View, TextInput, StyleSheet, Button, TouchableHighlight, Text} from 'react-native';

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
const SmallerButton = props => {
    return (
            <TouchableHighlight style={styles.inputStyling} onPress={props.func}>
                <Text style={styles.textStyling}>{props.title}</Text>
            </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    inputStyling: {
        padding: 10,
        borderRadius: 5,
    },
    textStyling: {
        color: 'white',
    }
});

export default SmallerButton;
