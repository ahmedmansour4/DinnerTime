import React, { Component } from 'react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'
import {API_URL} from './URLConstants'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class Login extends Component {


    nextStep = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    prevStep = e => {
        e.preventDefault()
        this.props.prevStep()
    }
    
    // This event thingy is triggered when a change is made to the username field, and sets the value of the field to the variable username
    handleChangeUsername = event => {
        this.setState({ username: event.target.value });
      }

      // This event thingy is triggered when a change is made to the password field, and sets the value of the field to the variable password
      handleChangePassword = event => {
        this.setState({ password: event.target.value });
      }
     
      // This event thingy is triggered when you click the submit button.
      handleSubmit = event => {
        event.preventDefault();


        // Creating a object to hold all our login info and send it to API
        const loginInfo = {
          username: this.state.username,
          password: this.state.password
        };
        
        const ops = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(loginInfo) ,
            url: API_URL + "/users/login"
        }
        axios(ops)
          .then(res => {
                // Get the response here, do something with it here
                // On successful login, we recieve a Javascript Web Token (JWT). We need to save this somewhere locally so we can use it to get authorization to load other pages.
                this.props.updateUsername(loginInfo.username);
                this.props.setJWT(res.data.token);
                this.props.setUserId(res.data.userId);
                this.props.nextStep();
                 
          }).catch((error) => {
              // There was an error sent back, so read the String sent back and act accordingly.
              if(error.response.data.message === "Authorization Unsuccessful") {
                  // If we got here, the user's login details were not in the database.
                  console.log("INCORRECT LOGIN DETAILS");
              }
              else if(error.response.data.message === "Authorization Unsuccessful, confirm email") {
                  // If we got here, the user's email was unverifed.
                  console.log("EMAIL UNVERIFIED")
              }
              else {
                  // If we got here, some unknown error occured.
                  console.log("SOME UNKNOWN ERROR :(");
              }
          });
          
      }
    
      // This render function controls what is displayed, it's all in HTML
    render() {
        return (
            <Grid 
                container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={3}
            >
                <Grid item />
                
                <Grid item container spacing={3} justify='center' alignItems='center' direction='column'>
                         <Grid item xs={12} sm={7}>
                         <Typography variant='h3' align='center' className={useStyles.typographyStyles}>
                            Welcome to Dinner Time!
                        </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            required
                            defaultValue=''
                            id="outlined-required"
                            label="Username"
                            variant="outlined"
                            fullWidth={true}
                            onChange={this.handleChangeUsername}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField 
                            required
                            defaultValue=''
                            id="outlined-required"
                            label="Password"
                            type='password'
                            variant="outlined"
                            fullWidth={true}
                            onChange={this.handleChangePassword}
                        />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                        <Button
                            variant='contained'
                            color="secondary"
                            fullWidth={true}
                            onClick={this.handleSubmit}
                        >
                            Login
                        </Button>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            fullWidth={true}
                            onClick={this.prevStep}
                        >
                            Sign Up
                        </Button>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Login
