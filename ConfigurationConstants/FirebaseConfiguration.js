/**
 * The Firebase configuration option has been provided
 * within the ConfigurationConstants/FirebaseConfiguration.js
 * file because of the fact that this is one of the core
 * dependencies of the native application. As such, extracting
 * it away from the main application is a key core requirement,
 * that must be taken into consideration - in an event that the
 * application would be put out into production. In doing so, we
 * are essentially ensuring that we do not run the risk of
 * distributing the configuration options used by the app to
 * all of its users. It is for this reason that this dependency
 * has been extracted away from the main application.
 *
 * @type {{storageBucket: string,
 * apiKey: string,
 * messagingSenderId: string,
 * appId: string,
 * projectId: string,
 * databaseURL: string,
 * authDomain: string}}
 */
export const firebaseConfig = {
    apiKey: "AIzaSyA7wHXWqe3TtLUe8VHrzod15pXkSbQNPxk",
    authDomain: "wheytreact-5341d.firebaseapp.com",
    databaseURL: "https://wheytreact-5341d.firebaseio.com",
    projectId: "wheytreact-5341d",
    storageBucket: "wheytreact-5341d.appspot.com",
    messagingSenderId: "583466017070",
    appId: "1:583466017070:web:86f326051521eb28c01abf"
};
