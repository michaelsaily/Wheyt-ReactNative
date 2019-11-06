import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

/**
 * The CustomKeyboardInput component was developed as a convenience
 * component, which allowed me as a developer to specify different
 * types of keyboard for different input types - while continuing
 * to maintain the original styling that I had applied.
 * @param props
 * @returns {*}
 * @constructor
 */
const CustomKeyboardInput = props => {
    return (
        /**
         * Note: maxLength controls the maximum length of the input,
         * regardless of whether it is text-based or numeric.
         */
        <View style={styles.inputStyling}>
            <TextInput blurOnSubmit autoCapitalize="none"
                       autoCorrect={false}
                       onChangeText={props.func}
                       placeholder={props.place_holder}
                       keyboardType={props.keyboard}
                       maxLength={props.length}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyling: {
        backgroundColor: 'white',
        width: '80%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    }
});

export default CustomKeyboardInput;
