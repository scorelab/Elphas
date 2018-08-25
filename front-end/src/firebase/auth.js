import { auth } from './firebase';
import * as firebase from 'firebase';

export const doSignInWithGoogle = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
};
// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
    auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);

export const getUser = () =>
    auth.currentUser;