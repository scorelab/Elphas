import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase/index';

const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (!authCondition(authUser)) {
                    this.props.history.push("/login-page");
                }
            });
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => authUser ? <Component data={this.props}/> : null}
                </AuthUserContext.Consumer>
            );
        }
    }

    return withRouter(WithAuthorization);
};

export default withAuthorization;