import React from 'react';

import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';

import {auth, database} from "../../firebase";
import ProfileLoader from "../ProfilePage/ProfileLoader";

class AccountPage extends React.Component{
    render(){
        return(
            <AuthUserContext.Consumer>
                {authUser =>
                    <div>
                        <ProfileLoader user={authUser.uid} username={database.onceGetUsers(auth.getUser().uid)} />
                    </div>
                }
            </AuthUserContext.Consumer>
        )
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);