// import React from 'react';
import * as firebase from 'firebase';

// Initialize Firebase

const config = {
    apiKey: "AIzaSyCtAxopbD91W1jryKS2UsKHbJ2Opj1LFqI",
    authDomain: "react-auth-7f06e.firebaseapp.com",
    databaseURL: "https://react-auth-7f06e.firebaseio.com",
    projectId: "react-auth-7f06e",
    storageBucket: "",
    messagingSenderId: "305642152901"
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export {
    auth,
    database
};