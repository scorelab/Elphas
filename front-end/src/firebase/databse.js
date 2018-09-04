import {database} from './firebase';

//Sign Up
export const doCreateUser = (id, username, email, admin) =>
    database.ref(`users/${id}`).set({
        username,
        email,
        about: false,
        institute:false,
        country: false,
        admin:false,
        processes: false,
        locations: false
    });


export const doUpdateUser = (id, about , country, institute) =>
    database.ref(`users/${id}`).update({
        about: about,
        country: country,
        institute:institute,
    });


export const onceGetUsers = function(id){
    let userRef = database.ref('users').child(`${id}`);
    return userRef.once('value').then(function(snapshot) {
        return snapshot.val();
    });
};


export const getUsers = function () {
    let userRef = database.ref('users');
    return userRef.once('value', function(snapshot) {
        return snapshot.val();
    });
};


export const updateProcess = function (id,value) {
    let userRef = database.ref('users').child(`${id}`).child('processes');
    return userRef.push(value);
};


export const deleteProcess = function (id,value) {
    let userRef = database.ref('users').child(`${id}`).child('processes');

    userRef.once("value", function(snapshot) {
        if(snapshot.numChildren() === 1){
            return userRef.set(false);
        }
        snapshot.forEach(function (child) {
            if(child.node_.value_ === value){
                return child.ref.remove();
            }
        })
    })
};


export const updateCount = function (id, location, count) {
    let userRef = database.ref('users').child(`${id}`).child('locations');

    userRef.once("value", function(snap){
        if(location !== null) {
            if (snap.hasChild(`${location}`)) {
                userRef.child(`${location}`).once('value').then(function (snap) {
                    userRef.child(`${location}`).set(count + snap.val());
                });
            }
            else {
                userRef.child(`${location}`).set(count);
            }
        }
        else {
            if (snap.hasChild('anywhere')) {
                userRef.child('anywhere').once('value').then(function (snap) {
                    userRef.child('anywhere').set(count + snap.val());
                });
            }
            else {
                userRef.child('anywhere').set(count);
            }
        }
    });
};

export const addReport = function (path) {
    let reportRef = database.ref('reports');
    return reportRef.push(path);
};

export const getReports = function () {
    let reportRef = database.ref('reports');
    return reportRef.once("value", function(snap){
        return snap.val();
    });
};


