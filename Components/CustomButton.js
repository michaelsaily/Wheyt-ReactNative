import React from 'react';
import {View, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native';

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
const CustomButton = props => {
    return (
        /**
         * PointerEvents have been configured to 'none' within the View
         * below, in order to ensure that there are no issues in 'tapping'
         * the touchable button. This ensures that the users are able to
         * always tap and execute the onPress functions inherited by
         * the TouchableOpacity component.
         */
        <TouchableOpacity style={styles.inputStyling} onPress={props.func}>
            <View pointerEvents='none'>
                <Button title={props.title} />
            </View>
        </TouchableOpacity>
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

export default CustomButton;
