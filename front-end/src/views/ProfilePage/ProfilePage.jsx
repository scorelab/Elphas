import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
// core components
import GridContainer from "../../assets/components/Grid/GridContainer.jsx";
import GridItem from "../../assets/components/Grid/GridItem.jsx";
import Parallax from "../../assets/components/Parallax/Parallax.jsx";

import profile from "assets/img/faces/avatar.jpg";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/LocationOn";
import NavPills from "../../assets/components/NavPills/NavPills";
import Settings from "@material-ui/icons/Settings";
import logo from '../../assets/img/wait.svg';
import CustomDropdown from "../../assets/components/CustomDropdown/CustomDropdown";
import Link from "react-router-dom/es/Link";
import {MapLoco} from "./Maps/Maps";
import Button from "@material-ui/core/Button/Button";

class ProfilePage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            username:null,
            admin:null,
            about:null,
            processes:null,
            locations:null,
            institute:null,
            anywhereCount:null,
            totalCount: null
        }
    }

    componentDidMount(){
        this.props.username
            .then((user) => {
                this.setState({username: user.username, about: user.about, processes: user.processes, locations: user.locations, institute: user.institute}, () => {
                    const snapshotToArray = Object.entries(this.state.processes).map(e => e[1]);

                    var locasRaw = Object.entries(this.state.locations).map(e => e[0]);
                    var countRaw = Object.entries(this.state.locations).map(e => e[1]);
                    var locas=[];
                    var totalCounts=0;
                    var i=0;
                    var loca;

                    if(this.state.locations.anywhere) {
                        for (i; i < locasRaw.length - 1; i++) {
                            loca = locasRaw[i].toString().split(",");
                            loca[0] = parseFloat(loca[0].toString().replace("i", "."));
                            loca[1] = parseFloat(loca[1].toString().replace("i", "."));
                            locas.push([loca, countRaw[i]]);
                            totalCounts += countRaw[i];
                        }
                    }
                    else {
                        for (i; i < locasRaw.length; i++) {
                            loca = locasRaw[i].toString().split(",");
                            loca[0] = parseFloat(loca[0].toString().replace("i", "."));
                            loca[1] = parseFloat(loca[1].toString().replace("i", "."));
                            locas.push([loca, countRaw[i]]);
                            totalCounts += countRaw[i];
                        }
                    }
                    totalCounts += countRaw[i];

                    this.setState({
                        locations:locas,
                        processes: snapshotToArray,
                        totalCount: totalCounts,
                        anywhereCount:countRaw[i]
                    })
                });
            });
    }

    render() {
        const { classes } = this.props;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );

        if(this.state.anywhereCount===null){
            return(
                <div>
                    <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div>
                            <div className={classes.container}>
                                <img src={logo} align="center" style={{marginLeft: '40%'}} className="App-logo" alt="logo" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {

            return(
                <div>
                    <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div>
                            <div style={{marginLeft:'90%'}}>
                                <CustomDropdown
                                    left
                                    caret={false}
                                    buttonText={
                                        <Settings/>
                                    }
                                    buttonProps={{
                                        className:
                                        classes.navLink + " " + classes.imageDropdownButton,
                                        color: "transparent"
                                    }}
                                    dropdownList={[
                                        <Link to={"/profile_edit"}><p style={{color: 'black', textShadow: '1px 1px 1px white'}} >Edit</p></Link>,
                                        <Link to={"/password_change"}><p style={{color: 'black', textShadow: '1px 1px 1px white'}} >Change Password</p></Link>
                                    ]}
                                />
                            </div>
                            <div className={classes.container} style={{marginTop:'-3%'}}>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className={classes.profile}>
                                            <div>
                                                <img src={localStorage.getItem("photo")?localStorage.getItem("photo"):profile} alt="..." className={imageClasses} />
                                            </div>
                                            <div className={classes.name}>
                                                <h3 className={classes.title}>{localStorage.getItem("Name")?localStorage.getItem("Name"): this.state.username}</h3>
                                            </div>
                                        </div>
                                    </GridItem>
                                </GridContainer>

                                <div className={classes.description}>
                                    <p>
                                        {this.state.about}
                                    </p>
                                </div>

                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                                        <NavPills
                                            alignCenter
                                            color="info"
                                            tabs={[
                                                {
                                                    tabButton: "Saved Processes",
                                                    tabIcon: Camera,
                                                    tabContent: (
                                                        <span>
                                                        {this.state.processes
                                                            .map(process => {
                                                                return(
                                                                    <div style={{marginLeft:'20%'}}>
                                                                        <h5 style={{textAlign:'left'}}>{process}<Link to={{pathname: '/home', state: { path: process}}}><Button type="button" color="info">Process</Button></Link></h5>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </span>
                                                    )
                                                },
                                                {
                                                    tabButton: "Locations",
                                                    tabIcon: Palette,
                                                    tabContent: (
                                                        <GridContainer justify="center">
                                                            <div>
                                                                <MapLoco locations={this.state.locations} />
                                                                <h3>Total elephants without a location: {this.state.anywhereCount}</h3>
                                                                <h3>Total count: {this.state.totalCount}</h3>
                                                            </div>
                                                        </GridContainer>
                                                    )
                                                },
                                            ]}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default withStyles(profilePageStyle)(ProfilePage);