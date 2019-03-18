import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg8.jpg";
import LoginPage from "./LoginPage";
import SignUpForm from "./SignUpForm";


class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state={
        loginShow:true
    }
  }

  updateAuthComponent(value){
      this.setState({
          loginShow:value
      });
  }

  render() {
    const { classes } = this.props;
    if(this.state.loginShow){
        return (
            <div>
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                >
                    <LoginPage updateAuthComponent={this.updateAuthComponent.bind(this)}/>
                </div>

            </div>
        );
    }
    else {
        return (
            <div>
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                >
                    <SignUpForm updateAuthComponent={this.updateAuthComponent.bind(this)} />
                </div>

            </div>
        );
    }

  }
}

export default withStyles(loginPageStyle)(AuthPage);
