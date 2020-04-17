import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Typography} from '@material-ui/core'
import Fastfood from '@material-ui/icons/Fastfood'
import { makeStyles } from '@material-ui/styles'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class Result extends Component {

    render() {
        return (
          <Map google={this.props.google} zoom={14}>

            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>
                
            </InfoWindow>
          </Map>
        );
      }
    }





export default GoogleApiWrapper({
    apiKey: ("AIzaSyDqBSIr1u7owxnrzuWY-GlULfxeTuz9kIk")
  })(Result)