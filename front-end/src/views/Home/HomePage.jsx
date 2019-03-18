import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../assets/components/Grid/GridContainer.jsx";
import GridItem from "../../assets/components/Grid/GridItem.jsx";
import Parallax from "../../assets/components/Parallax/Parallax.jsx";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
import Classification from "./ClassifiedTable/Classification";
import ProcessButton from "./ProcessButton";
import Upload from "./Upload";
import './home.css';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio/Radio";
import logo from '../../assets/img/wait.svg';

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            open: false,
            showUpload: true,
            uploadVisible: true,
            processVisible: false,
            results:{},
            uploadStatus:0,
            countOn: true,
            classifyingAlgo: "inception",
            waiting:false,
            savedProcess:false,
            path:null
        };
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
    }

    componentDidMount(){
        if(this.props.path !== undefined){
            this.setState({
                uploadVisible:false,
                path: {data:this.props.path},
                uploadStatus: 1,
                showUpload:false,
                savedProcess:true,
                processVisible: true
            })
        }
    }

    setWaiting(value){
        this.setState({waiting:value})
    }

    handleChangeEnabled(event) {
        this.setState({ classifyingAlgo: event.target.value });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    updateState(value){
        this.setState({
            results:value
        });
    }

    updatePath(value){
        this.setState({
            path:value
        });
    }

    updateShowUpdate(value){
        this.setState({
            showUpload:value
        });
    }

    updateUploadState(value,booleanValue){
        this.setState({
            uploadStatus:value,
            uploadVisible: false,
            processVisible: booleanValue
        });
    }

    render() {
        const { classes } = this.props;
        if(!this.state.waiting) {
            return (
                <div>
                    <Parallax small filter image={require("../../assets/img/pa1.jpg")}/>

                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div className={this.state.processVisible ? 'fadeIn' : 'fadeOut'}>
                            <GridContainer style={{marginLeft: '10%'}}>
                                <GridItem xs={12} sm={6} md={4} lg={3}>
                                    <div className={classes.title}>
                                        <h3>Need to count?</h3>
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={this.state.countOn}
                                                    onChange={this.handleChange("countOn")}
                                                    value="countOn"
                                                    color="primary"
                                                    classes={{
                                                        switchBase: classes.switchBase,
                                                        checked: classes.switchChecked,
                                                        icon: classes.switchIcon,
                                                        iconChecked: classes.switchIconChecked,
                                                        bar: classes.switchBar
                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="Get the Count"
                                        />
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={4} lg={3} style={{marginLeft: '40%'}}>
                                    <div className={classes.title}>
                                        <h3>Choose classifying algorithm</h3>
                                    </div>
                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            disabled={this.state.countOn}
                                            control={
                                                <Radio
                                                    checked={this.state.classifyingAlgo === "inception"}
                                                    onChange={this.handleChangeEnabled}
                                                    value="inception"
                                                    name="radio button enabled"
                                                    aria-label="A"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord className={classes.radioChecked}/>
                                                    }
                                                    classes={{
                                                        checked: classes.radio
                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="Inception V3"
                                        />
                                    </div>
                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            disabled={this.state.countOn}
                                            control={
                                                <Radio
                                                    checked={this.state.classifyingAlgo === "mobilenet"}
                                                    onChange={this.handleChangeEnabled}
                                                    value="mobilenet"
                                                    name="radio button enabled"
                                                    aria-label="B"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord className={classes.radioChecked}/>
                                                    }
                                                    classes={{
                                                        checked: classes.radio
                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="MobileNet"
                                        />
                                    </div>
                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            disabled={this.state.countOn}
                                            control={
                                                <Radio
                                                    checked={this.state.classifyingAlgo === "resnet50"}
                                                    onChange={this.handleChangeEnabled}
                                                    value="resnet50"
                                                    name="radio button disabled"
                                                    aria-label="B"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord className={classes.radioChecked}/>
                                                    }
                                                    classes={{
                                                        checked: classes.radio,
                                                        disabled: classes.disabledCheckboxAndRadio
                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="ResNet50 from Keras"
                                        />
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <hr/>
                        </div>

                        <div className="col-md-12" align="centre" style={{height: '600px'}}>
                            <div className={this.state.uploadVisible ? 'fadeIn' : 'fadeOut'}>
                                <Upload style={{marginRight: "auto", marginLeft: "auto"}} setWaiting={this.setWaiting.bind(this)} callUpdate={this.updatePath.bind(this)} updateUploadState={this.updateUploadState.bind(this)} uploadvisible={this.state.showUpload}/>
                            </div>
                            <div className={this.state.processVisible ? 'fadeInn' : 'fadeOut'}>
                                <ProcessButton savedProcess={this.state.savedProcess} path={this.state.path} countOn={this.state.countOn} setWaiting={this.setWaiting.bind(this)} classifyingAlgo={this.state.classifyingAlgo} updateState={this.updateState.bind(this)} uploadState={this.state.uploadStatus} updateUploadState={this.updateUploadState.bind(this)} changeUploadShow={this.updateShowUpdate.bind(this)}/>
                            </div>
                            <div>
                                <Classification countOn={this.state.countOn} result={this.state.results} path={this.state.path}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div>
                    <Parallax small filter image={require("../../assets/img/pa1.jpg")}/>
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div>
                            &nbsp;
                            <div className={classes.container}>
                                <img src={logo} align="center" style={{marginLeft: '40%'}} className="App-logo" alt="logo" />
                            </div>
                            &nbsp;
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default withStyles(profilePageStyle)(HomePage);