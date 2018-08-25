import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }
//
// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
//
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class SimpleModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            open: this.props.modal,
            image:null
        };
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.modal !== this.props.modal){
            this.setState({open:nextProps.modal});
            this.setState({image: nextProps.image});
        }
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.updateToInitialState(null,false);
    };

    render() {

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    id="modal"
                >
                    <div id="modalDiv" style={{marginLeft:'25%', marginRight:'auto', marginTop:'auto', marginBottom:'auto'}}>
                        <img alt="selectedImage" src={this.props.image} width="70%%" height="70%%" id="imagee" style={{align:'center'}}/>
                    </div>
                </Modal>
            </div>
        );

    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(SimpleModal);

