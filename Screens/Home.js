import React from 'react';
import {ScrollView, Text, StyleSheet, ImageBackground} from 'react-native';

import HomeScreenCard from '../Components/HomeScreenCard';
import NewsService from '../ConfigurationConstants/NewsAPI';

/**
 * The Home screen is effectively utilised as a
 * news-feed for users, providing access to the
 * latest 'fitness, health, gym and sports' results
 retrieved through the use of a news-api.
 */
export default class Home extends React.Component {
    /**
     * The following line of code configures the default
     * starting state of the data. This value is not
     * configured within the constructor as it should
     * only ever be modified once for the duration and
     * life of the app.
     * @type {{data: string}}
     */
    state = {data: '' };

    /**
     * The following function is used to handle all of the
     * required processing which must take place in terms
     * of external API calls, specifically the NewsAPI.
     * The function requests the API, and decodes the json
     * response that is retrieved. In doing so, it is then
     * able to update the current state of the data within
     * the screen - causing a re-render cycle to take place.
     */
    async componentDidMount () {
        /**
         * The fetch call essentially makes a GET request to the server which can be
         * located through the use of the following link.
         */
        fetch(NewsService.getNewsFeed('everything?q=fitness'), {method: 'GET'})
            .then((response) => response.json())
            //The state is then updated as required, once the response data has been decoded to a json object.
            .then((responseJson) => this.setState({data: responseJson}));
    };

    render() {
        {/**
         * The following block of code is responsible for checking if a valid
         * list can be retrieved from the NewsAPI to render. Until a list
         * is retrieved, the function ensures that a feedback is provided
         * to the user indicating that the loading process has not completed.
         * Note: A ternary operator must be used here as we are unable to code
         * native javascript logic within the render function (which primarily uses JSX).
         */}
        let content = this.state.data === '' ?
            <Text>Loading Please Wait...</Text> : this.state.data.articles.map(item => {
                     return <HomeScreenCard description={item.description} src={item.urlToImage} title={item.title} item={item}/>;
                });

        return (
            //The following line of code sets the background of the screen.
            <ImageBackground source={require("../assets/images/general/night.png")}
                             style={{width: '100%', height: '100%', flex: 1}}>

                {/**
                 * A ScrollView is used to wrap the content of the screen,
                 * because it is expected that the Home Screen content will
                 * continue beyond the main screen's dimensions. Wrapping the
                 * outputted content in a scroll view allows the users to
                 * scroll down and effectively view all of the entries.
                 */}
                <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                    {content}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
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

