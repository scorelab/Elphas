/* eslint-disable */
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps, CloudDownload, Home } from "@material-ui/icons";
import profileImage from "assets/img/faces/avatar.jpg";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.jsx";
import Button from "../CustomButtons/Button.jsx";

import navbarsStyle from "../../jss/material-kit-react/views/componentsSections/navbarsStyle";

class HeaderLinks extends React.Component{
    render() {
        const {classes} = this.props;

        return (
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <div style={{marginRight:'auto', marginLeft: 'auto',alignItems:'center'}}>
                        <Button
                            color="transparent"
                            target="home"
                            className={classes.navLink}
                        >
                            <Home className={classes.icons} /> <Link to={'/home'} style={{color:'white', textShadow: '1px 1px 1px black'}}> Home </Link>
                        </Button>
                    </div>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <CustomDropdown
                        left
                        caret={false}
                        buttonText={
                            <img
                                src={localStorage.getItem("photo") ? localStorage.getItem("photo") : profileImage}
                                className={classes.img}
                                alt="profile"
                            />
                        }
                        buttonProps={{
                            className:
                            classes.navLink + " " + classes.imageDropdownButton,
                            color: "transparent"
                        }}
                        dropdownList={[
                            <Link to={"/profile"} color="transparent"><p style={{color: 'black', textShadow: '1px 1px 1px white, 0 0 1px white'}}>Profile</p></Link>,
                            {divider: true},
                            <p style={{padding: '0px'}} onClick={this.props.onSignOutClicked}>Sign Out</p>,
                        ]}
                    />
                </ListItem>
            </List>
        );
    }
}

export default withStyles(navbarsStyle)(HeaderLinks);
