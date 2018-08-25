import React from "react";
import classNames from "classnames";
import Parallax from "../../assets/components/Parallax/Parallax";
import AdminPage from "./Admin/AdminPage";
import ProfilePage from "./ProfilePage";
import withStyles from "material-ui/styles/withStyles";
import profilePageStyle from "../../assets/jss/material-kit-react/views/profilePage";
import logo from '../../assets/img/wait.svg';

class ProfileLoader extends React.Component {
    constructor(props){
        super(props);

        this.state={
            admin:null
        }
    }

    componentDidMount(){
        this.props.username
            .then((user)=>{
                this.setState({admin: user.admin})
            })
        };

    render(){
        const { classes } = this.props;

        if(this.state.admin===null){
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
            if(this.state.admin){
                return (
                    <AdminPage user={this.props.username}/>
                );
            }
            else {
                return(
                    <ProfilePage username={this.props.username} />
                )
            }
        }
    }

}

export default withStyles(profilePageStyle)(ProfileLoader);