import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Typography} from '@material-ui/core'
import axios from 'axios';
import Fastfood from '@material-ui/icons/Fastfood'
import { makeStyles } from '@material-ui/styles'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));


export class Result extends Component {

  

  handleSubmit = event => {
    let key = "longitude"
    console.log("hmmm! state location value is " + this.props.longitude);
    const ops = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.props.latitude + "," + this.props.longitude + "&radius=" + this.props.radius + "&type=restaurant&keyword=" + this.props.foodTypes + "&key=AIzaSyDqBSIr1u7owxnrzuWY-GlULfxeTuz9kIk"

  }
  axios(ops)
    .then(res => {
        // Get the response here, do something with it here
        // TODO stuff here!
        //this.props.updateUsername(loginInfo.username);
        //this.props.nextStep();
          console.log(res.data);
    }).catch((error) => {
        // There was an error sent back, so read the String sent back and act accordingly.
        console.log(error);
        if(error  === "Authorization Unsuccessful") {
            // If we got here, the user's login details were not in the database.
            console.log("INCORRECT LOGIN DETAILS");
        }
        else if(error  === "Authorization Unsuccessful, confirm email") {
            // If we got here, the user's email was unverifed.
            console.log("EMAIL UNVERIFIED")
        }
        else {
            // If we got here, some unknown error occured.
            console.log("SOME UNKNOWN ERROR :(");
        }
    });
  }

  render() {
    const { handleChange } = this.props

    return (
        
        <Grid container
            direction='column'
            justify='center'
            alignItems='center'
            spacing={3}
        >
            <Grid item />
            
            <Grid item container spacing={3} justify='center'>



                    <Grid item xs={12} sm={7}>
                    <Button 
                        variant='contained'
                        color="secondary"
                        onClick={this.handleSubmit}
                        fullWidth={true}
                    >
    
                        Press for magic!
                    </Button>
                    </Grid>

            </Grid>
        </Grid>
    )
}

}





export default GoogleApiWrapper({
    apiKey: ("AIzaSyDqBSIr1u7owxnrzuWY-GlULfxeTuz9kIk")
  })(Result)