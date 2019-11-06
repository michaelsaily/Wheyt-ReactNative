import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet, ImageBackground, Image, Alert} from 'react-native';
import Firebase from 'firebase';
import Home from './Home';

/**
 * The following function provides users access
 * with a Profile screen. The screen is used to
 * provide user's access to app critical information,
 * and a convenient screen to modify any information
 * that they may wish to.
 *
 * The
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
export default function Profile ({navigation}) {
    return (
        //The following line of code sets the background of the screen.
        <ImageBackground source={require("../assets/images/general/night.png")} style={{width: '100%', height: '100%', flex: 1}}>

            {/**
             * A ScrollView is used to wrap the content of the screen,
             * because it is expected that the Profile Screen content will
             * continue beyond the main screen's dimensions. Wrapping the
             * outputted content in a scroll view allows the users to
             * scroll down and effectively view all of the entries.
             */}
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                {/**
                  * The following section of code is tasked with the responsibility
                  * of ensuring that a profile image is placed and centered nearing
                  * the upper portion of the profile screen.
                  */}
                <View style={styles.imgView}>
                    <Image style={styles.imageStyling} source={require('../assets/images/profile/profile3.png')} />
                </View>

                {/**
                 * The following block of code is used to essentially output the
                 * personal information of the user to the screen. The info card
                 * styling has been used to effectively split both personal information,
                 * and contact information of an individual within one View to
                 * group together relevant information for the user.
                 */}
                <View style={styles.infoCard}>
                    {/**
                     * Should output the personal information of a user gained
                     * by accessing the Firebase API.
                     */}
                    <Text style={styles.heading}> Personal Information </Text>
                    <View style={styles.info}>
                        <Text style={styles.textFormat}> Name: Mahesh Michael Saily</Text>
                        <Text style={styles.textFormat}> Height: 180</Text>
                    </View>

                    <Text>                     </Text>
                    <Text>                     </Text>

                    {/**
                     * Should output the personal contact information of an individual,
                     * and allow them to update their email information - reflecting
                     * any changes made within the Firestore database and Authentication
                     * module.
                     */}
                    <Text style={styles.heading}> Contact Information </Text>
                    <View style={styles.info}>
                        <Text style={styles.textFormat}> Email: test@gmail.com</Text>
                    </View>
                </View>

                {/**
                 * Aimed to provide the most up-to-date and relevant goal information
                 * relating to the given individual, based on the data stored across
                 * the Firestore databases.
                 */}
                <View style={styles.infoCard}>
                    <Text style={styles.heading}> Goal Information </Text>
                    <View style={styles.info}>
                        <Text style={styles.textFormat}> Starting Weight: 100 </Text>
                        <Text style={styles.textFormat}> Current Weight: 85  </Text>
                        <Text style={styles.textFormat}> Goal Weight: 80     </Text>
                    </View>
                </View>

            </ScrollView>
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
    },
    header: {
        marginLeft: '7.5%',
    },
    smallerButtons: {
        alignItems: 'center',
        marginTop: '5%',
        width: '100%',
    },
    imageStyling: {
        height: 200,
        width: 200,
        resizeMode: 'stretch',
        overflow: 'hidden',
        borderRadius: 400/2,
    },
    imgView: {
        alignItems: 'center',
        marginVertical: 20,
    },
    infoCard: {
        backgroundColor: 'white',
        width: '80%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.3,
        padding: 20,
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    info: {
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 20,

    },
    textFormat: {
        marginBottom: 10,
    },
    heading: {
        fontWeight: 'bold',
    }
});

