import navbarsStyle from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import withStyles from "material-ui/styles/withStyles";
import Header from "../../assets/components/Header/Header";
import React from "react";
import {auth} from "../../firebase";
import HeaderLinks from "../../assets/components/Header/HeaderLinks";

class NavigationAuth extends React.Component {

    onSignOutClicked = function(event){
        auth.doSignOut();
        localStorage.clear();
        event.preventDefault();
    };




    render() {
        const {classes, ...rest } = this.props;
        return (
            <div>
                <Header
                    brand="Elphas"
                    rightLinks={<HeaderLinks onSignOutClicked={this.onSignOutClicked}/>}
                    fixed
                    color="transparent"
                    changeColorOnScroll={{
                        height: 200,
                        color: "white"
                    }}
                    {...rest}
                />
            </div>
        );
    }
}

export default withStyles(navbarsStyle)(NavigationAuth);