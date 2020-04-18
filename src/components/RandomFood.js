import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Typography} from '@material-ui/core'
import axios from 'axios';
import Fastfood from '@material-ui/icons/Fastfood'
import { makeStyles } from '@material-ui/styles'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

//card stuff
import { CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';

import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

var x = 0;
var y = 0;
var foodGenres = ["Mexican", "American", "Chinese", "Japanese", "Italian"];

//random integer generator for the recieved array from google ♥
function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(20));
  }
function getRandomFoodGenre() {
    return Math.floor(Math.random() * Math.floor(5));
  }

export class Result extends Component {

  foodSubmit = event => {


    
  }

  handleSubmit = event => {
    y = getRandomFoodGenre()
    this.props.updateFoodTypes(foodGenres[y]);

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
          x = getRandomInt()
          console.log(res.data.results[x].name);
          console.log(res.data.results[x].vicinity);

          
          
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
    const { image, name } = this.props

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
                       // onClick={this.foodSubmit}
                        fullWidth={true}
                    >
    
                        Roll for a suggestion
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