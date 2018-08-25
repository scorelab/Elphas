import React from "react";

const { compose, withStateHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");

const MapWithAMakredInfoWindow = compose(
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
        })
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 7.8731, lng: 80.7718 }}
    >
        {props.locations
            .map(location => {
                return(
                    <Marker
                        position={{ lat: location[0][0], lng: location[0][1] }}
                        onClick={props.onToggleOpen}
                        {...props}
                    >
                        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                            <h6>Elephants: {location[1]}</h6>
                        </InfoWindow>}
                    </Marker>
                )
            })
        }
    </GoogleMap>
);

export class MapLoco extends React.Component {
    render(){
        return(
            <MapWithAMakredInfoWindow
                locations={this.props.locations}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC5SCFJ2RSjf0QhmwHcX0c_-ZYy2Kn1rF0&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `500px`, width: '500px' }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}


