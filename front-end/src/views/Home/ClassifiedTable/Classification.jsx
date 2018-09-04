import React, { Component } from 'react';
import ResultsTable from "./ResultsTable";
import axios from "axios/index";
import SimpleModal from "./ImageModal";


class Classification extends Component {
    constructor(props){
        super(props);

        this.state = {
            imageSelected:null,
            image:null,
            requestSent:false,
            modal:false
        }
    }

    componentDidUpdate(){
        if((this.state.imageSelected !== null)&&(!this.state.requestSent)){
            this.getImage(this.updateImageAndModal.bind(this));
        }
    }

    updateImageSelected(value){
        this.setState({
            imageSelected:value,
            requestSent:false
        });
    }

    updateToInitialState(val1, val2){
        this.setState({
            imageSelected:val1,
            image:val1,
            requestSent:val2,
            modal:val2
        })
    }

    updateImageAndModal(image,modal){
        this.setState({
            image:image,
            modal:modal,
            requestSent:true
        })
    }

    getImage(func){
        if(this.state.imageSelected!==null){
            const imgUrl = 'http://localhost:5000/getImage/'+this.props.path.data;

            function getBase64(url) {
                return axios
                    .get(url, {
                        responseType: 'arraybuffer'
                    })
                    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
            }

            var img = getBase64(imgUrl+'/'+this.state.imageSelected);
            img
                .then(function (image) {
                    func("data:image/jpg;base64,"+image, true);
                });
        }
    };


    render(){

        if(this.props.result.data !== undefined){
            return(
                <div>
                    &nbsp;
                    <SimpleModal updateToInitialState={this.updateToInitialState.bind(this)} modal={this.state.modal} image={this.state.image}/>
                    <ResultsTable path={this.props.path.data} countOn={this.props.countOn} updateImageSelected={this.updateImageSelected.bind(this)}  results={this.props.result.data}/>
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

export default Classification;