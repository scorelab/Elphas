import React, {Component} from 'react';
import axios from "axios/index";
import {auth, database} from '../../firebase/index'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button/Button";
import Slide from '@material-ui/core/Slide';
import withStyles from "material-ui/styles/withStyles";
import modalStyle from "../../assets/jss/material-kit-react/modalStyle";
import Dialog from "@material-ui/core/Dialog/Dialog";



function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ProcessButton extends Component {
    state = {
        open: false,
    };

    getResults(event){
        const props = this.props;

        props.setWaiting(true);

        this.handleClose();
        const path = props.path.data;

        let url;

        if(this.props.countOn){
            url = 'http://localhost:5000/process/count/'+path;
        }
        else {
            if(this.props.classifyingAlgo==="inception"){
                url = 'http://localhost:5000/process/inception/'+path;
            }
            else if(this.props.classifyingAlgo==="mobilenet"){
                url = 'http://localhost:5000/process/mobilenet/'+path;
            }
            else {
                url = 'http://localhost:5000/process/resnet50/'+path;
            }
        }

        const updateCountAndLocation = function(res) {
            res.forEach((locount) => {
                if(locount[2] !== null){
                    database.updateCount(auth.getUser().uid, locount[2].toString().replace(".","i").replace(".","i"), locount[1]);
                }
                else {
                    database.updateCount(auth.getUser().uid, null, locount[1]);
                }
            })
        };

        axios.post(url)
            .then(function (response) {

                if(props.savedProcess){
                    database.deleteProcess(auth.getUser().uid, path)
                }

                props.setWaiting(false);

                updateCountAndLocation(response.data);

                setTimeout(function() {
                    props.updateState(response);
                }, 1400);

                props.updateUploadState(1,false);

                setTimeout(function() {
                    props.changeUploadShow(false);
                }, 400);

                setTimeout(function() {
                    props.updateUploadState(0,false);
                }, 1200);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    saveProcess(event) {
        this.handleClose();
        database.updateProcess(auth.getUser().uid,this.props.path.data);
        window.location.reload();
    }


    render() {
        const props = this.props;
        const { classes } = this.props;
        if(props.uploadState===1 && !this.props.savedProcess){
            return (
                <div>
                    &nbsp;
                    <p style={{color:'green', fontWeight:'bold'}}>Upload was successful.</p>
                    <p>If you are going to process now choose your settings above</p>
                    <div>
                        <Button variant="raised" color="primary" onClick={this.handleClickOpen}>Click to continue</Button>
                    </div>
                    <Dialog
                        classes={{
                            root: classes.center,
                            paper: classes.modal
                        }}
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="modal-slide-title"
                        aria-describedby="modal-slide-description"
                    >
                        <DialogTitle id="classic-modal-slide-title">
                            {"Save or Proceed? :)"}
                        </DialogTitle>
                        <DialogContent id="modal-slide-description">
                            <p >
                                If you are in a hurry, you can save this process and get results later as processing may take some time.
                            </p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(event) => this.saveProcess(event)} color="primary">
                                Save Process
                            </Button>
                            <Button onClick={(event) => this.getResults(event)} color="primary">
                                Process Now
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
        else if(this.props.savedProcess){
            return(
                <div>
                    &nbsp;
                    <p>Choose your settings above</p>
                    <div>
                        <Button variant="raised" color="primary" onClick={(event) => this.getResults(event)}>Click to continue</Button>
                    </div>
                    &nbsp;
                </div>
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }
}

export default withStyles(modalStyle)(ProcessButton);