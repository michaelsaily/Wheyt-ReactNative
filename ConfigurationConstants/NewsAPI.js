/**
 * The NewsAPI configuration options have been provided
 * within the ConfigurationConstants/NewsAPI.js
 * file because of the fact that this is one of the core
 * dependencies of the native application. As such, extracting
 * it away from the main application is a key core requirement,
 * that must be taken into consideration - in an event that the
 * application would be put out into production. In doing so, we
 * are essentially ensuring that we do not run the risk of
 * distributing the configuration options used by the app to
 * all of its users. It is for this reason that this dependency
 * has been extracted away from the main application.
 */

/**
 * The environment constant is tasked with the responsibility of
 * containing the API's primary access url, as well as my personal
 * API key that is used to retrieve information from the given
 * service.
 *
 * @type {{API_URL: string, API_KEY: string, production: boolean}}
 */
export const environment = {
        production: false,
        API_URL: 'https://newsapi.org/v2',
        API_KEY: '716726d4fd8a4a129fccb6f7edef4717'
};

/**
 * The class below is effectively utilised as a 'getter' in order to
 * retrieve the prebuilt link, using which a fetch call can be made
 * to the required servers as needed.
 */
export default class NewsService {
    static getNewsFeed(url) {
        return `${environment.API_URL}/${url}&apiKey=${environment.API_KEY}`;
    }
}
