import React from 'react';

import AuthUserContext from '../Authentication/AuthUserContext';
import withAuthorization from '../Authentication/withAuthorization';

import Home from "./HomePage";

class HomeAuth extends React.Component{

    render(){
        if(this.props.data.location.state !== undefined) {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        <div>
                            <Home path={this.props.data.location.state.path}/>
                        </div>
                    }
                </AuthUserContext.Consumer>
            )
        }
        else {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        <div>
                            <Home/>
                        </div>
                    }
                </AuthUserContext.Consumer>
            )
        }
    }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomeAuth);