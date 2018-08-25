import React from "react";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputAdornment from "material-ui/Input/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "../../assets/components/Grid/GridContainer.jsx";
import GridItem from "../../assets/components/Grid/GridItem.jsx";
import Button from "../../assets/components/CustomButtons/Button.jsx";
import Card from "../../assets/components/Card/Card.jsx";
import CardBody from "../../assets/components/Card/CardBody.jsx";
import CardHeader from "../../assets/components/Card/CardHeader.jsx";
import CardFooter from "../../assets/components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import {auth, database} from "../../firebase";
import TextField from '@material-ui/core/TextField';
import withRouter from "react-router-dom/es/withRouter";



const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    cardAnimaton: "cardHidden",
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends React.Component {
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
            200
        );
    }

    handleClick(event){
        this.props.updateAuthComponent(true);
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne
        } = this.state;

        const {
            history
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                database.doCreateUser(auth.getUser().uid, username, email)
                    .then(() => {
                        this.setState(() => ({ ...INITIAL_STATE }));
                        history.push("/");
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState(byPropKey('error', error));
                    });

            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        event.preventDefault();
    };


    render() {
        const { classes} = this.props;
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card className={classes[this.state.cardAnimaton]}>
                            <form className={classes.form} onSubmit={this.onSubmit}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                    <h4>Sign Up</h4>
                                </CardHeader>
                                <CardBody style={{marginLeft:'12%', marginTop:'10%'}}>
                                    <TextField
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <People className={classes.inputIconsColor}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        iid="input-with-icon-textfield"
                                        label="Username"
                                        placeholder="Username"
                                        className={classes.textField}
                                        margin="normal"
                                        value={username}
                                        onChange={event => this.setState(byPropKey('username', event.target.value))}
                                    /><br />
                                    <TextField
                                        id="with-placeholder"
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
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <LockOutline className={classes.inputIconsColor}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        id="with-placeholder"
                                        label="Password"
                                        placeholder="Password"
                                        type="password"
                                        className={classes.textField}
                                        margin="normal"
                                        value={passwordOne}
                                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                                    /><br />
                                    <TextField
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <LockOutline className={classes.inputIconsColor}/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        id="password-input"
                                        label="Confirm Password"
                                        className={classes.textField}
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        value={passwordTwo}
                                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                                    />
                                </CardBody>
                                <CardFooter className={classes.cardFooter} style={{marginLeft:'-1%'}}>
                                    <Button color="primary" round size="medium" disabled={isInvalid} type="submit">
                                        Get started
                                    </Button>
                                </CardFooter>
                                <div style={{margin:'15%'}}>
                                    { error && <p style={{color:'red'}}>{error.message}</p> }
                                </div>
                                <Button type="button" size="lg" color="info" simple onClick={(event) => this.handleClick(event)} >Back</Button>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withRouter(withStyles(loginPageStyle)(SignUpForm));
