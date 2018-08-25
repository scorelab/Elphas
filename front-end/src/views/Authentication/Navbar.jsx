import React from "react";
// nodejs library that concatenates classes
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
// @material-ui/icons
// core components
import Header from "../../assets/components/Header/Header.jsx";
// sections for this page
import navbarsStyle from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import Button from "../../assets/components/CustomButtons/Button";

import AuthUserContext from "../Authentication/AuthUserContext";
import NavigationAuth from "./NavigationAuth";


const Navigation = ({authUser}) =>
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <NavigationAuth/>
            : <NavigationNonAuth/>
        }
    </AuthUserContext.Consumer>;




class NavigationNonAuth extends React.Component {
    render() {
        const {...rest } = this.props;
        return (
            <div>
                <Header
                    brand="Elphas"
                    rightLinks={
                        <Link to={{pathname: '/login-page', state:{ lab: 'laba'}}}><Button round color="primary">Login</Button></Link>
                    }
                    fixed
                    color="transparent"
                    changeColorOnScroll={{
                        height: 400,
                        color: "white"
                    }}
                    {...rest}
                />
            </div>
        );
    }
}

export default withStyles(navbarsStyle)(Navigation);
