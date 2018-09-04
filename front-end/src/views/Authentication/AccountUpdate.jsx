import React,{ Component } from 'react';
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/es/Button/Button";
import {auth, database} from '../../firebase/index';

const style = {
    height: '450px',
    width: '650px',
    marginTop: '-40%',
    textAlign: 'center',
    display: 'inline-block',

};


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

this.updateAccount = function (event) {
    //this.handleClose();
    database.doCreateUser();
    window.location.reload();
};
class AccountUpdatePage extends Component {

    constructor(props){
        super(props);

        //this.state = { ...INITIAL_STATE };

        this.state = {

            about : '',
            country : '',
            email: '',
            institute: ''
        }

    }
    handleClose = () => {
        this.setState({ open: false });
    };

    updateAccount(event) {
        this.handleClose();
        console.log(this.state);
        console.log(this.state.about);
        database.doUpdateUser(auth.getUser().uid,this.state.about,this.state.country,this.state.email,this.state.institute);
        window.location.reload();

    }
    render() {
        const {
            about,
            country,
            institute,
        } = this.state;
        //console.log(auth.getUser());
        return (
            <div>
                <AuthUserContext.Consumer>

                    {authUser =>

                        <div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <img alt="profile" src={require('../../assets/img/profile.jpg')} width="100%"/>
                                </div>

                                <div className="col-lg-4">
                                    <div align="center">
                                        <Paper style={style} zDepth={2}>
                                            <br/>
                                            <h2>Update Profile</h2>
                                            <br/>


                                            <TextField
                                                label="About"
                                                value={about}
                                                onChange={event => this.setState(byPropKey('about', event.target.value))}
                                                type="text"
                                                placeholder="About"
                                            /><br/>

                                            <TextField
                                                label="country"
                                                value={country}
                                                onChange={event => this.setState(byPropKey('country', event.target.value))}
                                                type="text"
                                                placeholder="Country"
                                            /><br/>

                                            <TextField
                                                label="institute"
                                                value={institute}
                                                onChange={event => this.setState(byPropKey('institute', event.target.value))}
                                                type="text"
                                                placeholder="Institute"
                                            /><br/>
                                            <br/>
                                            <Button type="button" color="primary"
                                                    onClick={(event) => this.updateAccount(event)}
                                                    round>Update</Button>

                                            <Link to={"/profile"}>
                                                <Button type="button" color="primary" round>Back</Button>
                                            </Link>
                                        </Paper>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </AuthUserContext.Consumer>
            </div>
        )
    }
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountUpdatePage);