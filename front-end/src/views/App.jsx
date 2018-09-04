import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css";
import Navbar from "views/Authentication/Navbar";
import withAuthentication from "./Authentication/withAuthentication";

var hist = createBrowserHistory();

class App extends React.Component{
    render() {
        return (
            <Router history={hist}>
                <div>
                    <Navbar/>
                    <Switch>
                        {indexRoutes.map((prop, key) => {
                            return <Route path={prop.path} key={key} component={prop.component} />;
                        })}
                    </Switch>
                </div>

            </Router>
        )
    }
}

export default withAuthentication(App);