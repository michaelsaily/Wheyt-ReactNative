import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

/**
 * The CustomInput component was developed as a convenience
 * component, which allowed me to apply styling to all 'text-based'
 * input throughout the entire app in one stop, while still
 * maintaining the ability to freely modify the component how I see
 * fit.
 * @param props
 * @returns {*}
 * @constructor
 */
const CustomInput = props => {
    return (
        <View style={styles.inputStyling}>
            <TextInput secureTextEntry={props.secure} autoCapitalize="none" autoCorrect={false} onChangeText={props.func} placeholder={props.place_holder}/>
        </View>
    );
};

/**
 * The base styling can be further modified by passing through
 * extra styling which can be used to overwrite the default values.
 */
const styles = StyleSheet.create({
    inputStyling: {
        backgroundColor: 'white',
        width: '80%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    }
});

export default CustomInput;
