import React from 'react';
// import FlatButton from 'material-ui/FlatButton';
import { auth } from '../../firebase/index';
import Button from "/../../components/CustomButtons/Button";


const buttonClicked = function () {
    auth.doSignOut();
    localStorage.clear();
};

const SignOutButton = () =>

    <Button
        simple
        color="warning"
        style={{padding:'0px'}}
        onClick={buttonClicked()}
    >
        Sign Out
    </Button>;


export default SignOutButton;