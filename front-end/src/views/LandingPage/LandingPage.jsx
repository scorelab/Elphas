import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import SectionCarousel from "./Sections/Carousel";
import Paper from "@material-ui/core/Paper/Paper";

const style = {
    height: '65%',
    width: '60%',
    margin: '5%',
    textAlign: 'center',
    display: 'inline-block',
};
const stylepara = {
    marginLeft: '15px',
};

class LandingPage extends React.Component {

  render() {
      const { classes } = this.props;
      return(
          <div>
              <div className={classNames(classes.main, classes.mainRaised)}/>
              <SectionCarousel/>
              <div className="col-md-12" align="centre">
                  <div align="center">
                      <br/>
                      <h1>Elephant Recognizer</h1>
                      <p style={style}>Once common throughout Africa and Asia, elephant numbers were severely depleted during the
                          20th century,
                          largely due to the massive ivory trade. While some populations are now stable and growing, poaching,
                          conflict and habitat destruction continue to threaten the species.</p>
                  </div>
                  <div align="center">
                      <Paper style={style} zDepth={2}>
                          <h1>Facts</h1>
                          <div className="row">
                              <div className="col-lg-6">
                                  <p align="justify" style={stylepara}>Elephant Recognizer attempt to detect and classify
                                      elephants in drone images using deep
                                      learning.
                                      This is not a trivial task even for a human since elephants naturally blend in with their
                                      surroundings,
                                      making it a challenging and meaningful problem to solve. Possible applications of this work
                                      extend into general animal conservation and search-and-rescue operations, with natural
                                      extension
                                      to drone imagery as input source.</p>
                                  <p align="justify" style={stylepara}>First of all, we send drones to capture images in a certain
                                      area. After collecting drone
                                      images we can upload photos to the system and detect whether there are elephants in those
                                      photos and get a count of them.To achieve this goal we need to have quality number of photos
                                      and a trained model which can identify elephants. We run the images through filters and
                                      clarify the identification.When we train more images using the model the accuracy rate
                                      increase.</p>
                              </div>
                          </div>
                      </Paper>

                      <Paper style={style} zDepth={2}>
                          <h1>Demonstration</h1>
                          <img alt="dropzoneGif" src={require('../../assets/img/.dropzone.gif')}/>
                      </Paper>
                  </div>
              </div>
          </div>
      )
    }
}

export default withStyles(landingPageStyle)(LandingPage);
