import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
// core components
import GridContainer from "../../assets/components/Grid/GridContainer.jsx";
import GridItem from "../../assets/components/Grid/GridItem.jsx";
import Button from "../../assets/components/CustomButtons/Button.jsx";
import IconButton from "../../assets/components/CustomButtons/IconButton.jsx";
import Card from "../../assets/components/Card/Card.jsx";
import CardBody from "../../assets/components/Card/CardBody.jsx";
import CardHeader from "../../assets/components/Card/CardHeader.jsx";
import CardFooter from "../../assets/components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import {auth, database} from "../../firebase";
import TextField from "@material-ui/core/TextField/TextField";
import withRouter from "react-router-dom/es/withRouter";

const INITIAL_STATE = {
    email: '',
    password: '',
    cardAnimaton: "cardHidden",
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = { ...INITIAL_STATE };
    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
            function() {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            500
        );
    }

    handleClick(event){
        this.props.updateAuthComponent(false);
    }

    onGoogleClicked = (event) => {

        const {
            history,
        } = this.props;

        auth.doSignInWithGoogle()
            .then( (result) => {
                // var token = result.credential.accessToken;
                var user = result.user;

                localStorage.setItem("Name",user.displayName);
                localStorage.setItem("photo",user.photoURL);
                localStorage.setItem("isLogged","true");

                database.onceGetUsers(auth.getUser().uid)
                    .then((result)=>{
                        if(result===null){
                            database.doCreateUser(auth.getUser().uid, user.displayName, user.email, false)
                                .then(() => {
                                    this.setState({ cardAnimaton: "" });
                                    history.push(`/home`)
                                })
                                .catch(error => {
                                    console.log(error);
                                    this.setState(byPropKey('error', error));
                                });
                        }
                        else {
                            history.push(`/home`)
                        }
                    });
            })
            .catch(error => {
                throw error;
            });

        event.preventDefault();
    };

    onSubmit = (event) => {

        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                this.setState({ cardAnimaton: "" });
                history.push(`/`)
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    };


    render() {
        const { classes} = this.props;
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';
        // noinspection JSAnnotator
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card className={classes[this.state.cardAnimaton]}>
                            <form className={classes.form} onSubmit={this.onSubmit}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                    <h4>Login</h4>
                                    <div className={classes.socialLine}>
                                        <IconButton
                                            target="_blank"
                                            color="transparent"
                                            onClick={e => this.onGoogleClicked(e)}
                                        >
                                            <i
                                                className={
                                                    classes.socialIcons + " fab fa-google-plus-g"
                                                }
                                            />
                                        </IconButton>
                                    </div>
                                </CardHeader>
                                <p className={classes.divider}>Or Be Classical</p>
                                <CardBody style={{marginLeft:'12%', marginTop:'10%'}} className={classes.cardFooter}>
                                    <TextField
                                        label="Email Address"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Email className={classes.inputIconsColor}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Email"
                                        className={classes.textField}
                                        margin="normal"
                                        value={email}
                                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                                    /><br />
                                    <TextField
                                        InputProps={{
                                            type: "password",
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <LockOutline className={classes.inputIconsColor}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        label="Password"
                                        placeholder="Password"
                                        type="password"
                                        className={classes.textField}
                                        margin="normal"
                                        value={password}
                                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                                    /><br />
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button style={{marginLeft:'-1%'}} color="primary" round disabled={isInvalid} type="submit">
                                        Push
                                    </Button>
                                </CardFooter>

                                { error && <p style={{color:"red", margin:"15%"}}>{error.message}</p> }

                                <div className={classes.divider}>
                                    <p>Don't have an account?
                                    <Button type="button"  size="lg" color="info" simple onClick={(event) => this.handleClick(event)} >Sign UP</Button>
                                    </p>
                                </div>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withRouter(withStyles(loginPageStyle)(LoginPage));
