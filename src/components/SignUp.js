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

export class SignUp extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            username: '',
            name: '',
            password: '',
            email: ''
        }
    }

    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    // This event thingy is triggered when a change is made to the username field, and sets the value of the field to the variable username
    handleChangeUsername = event => {
        this.setState({ username: event.target.value });
      }

      // This event thingy is triggered when a change is made to the password field, and sets the value of the field to the variable password
      handleChangePassword = event => {
        this.setState({ password: event.target.value });
      }

      // This event thingy is triggered when a change is made to the password field, and sets the value of the field to the variable password
      handleChangeName = event => {
        this.setState({ name: event.target.value });
      }
     
      // This event thingy is triggered when a change is made to the password field, and sets the value of the field to the variable password
      handleChangeEmail = event => {
        this.setState({ email: event.target.value });
      }
      
      // This event thingy is triggered when you click the submit button.
      handleSubmit = event => {
        event.preventDefault();


        // Creating a object to hold all our login info and send it to API
        const SignupInfo = {
          username: this.state.username,
          name: this.state.name,
          password: this.state.password,
          email : this.state.email
        };
        
        // Performing the post request, first paramter is the URL for where the API is located, second is the data we are sending, probably as a JSON packet.
        console.log("username is: " + SignupInfo.username + " and password is " + SignupInfo.password + ", and email is " + SignupInfo.email + ", name is " + SignupInfo.name);
        // Placeholder URL below

        const ops = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(SignupInfo) ,
            url: API_URL + "/users/createAccount"
        }
        axios(ops)
          .then(res => {
              // Get the response here, do something with it here
              console.log("SIGNUP SUCCESSFUL :)");
              console.log(res);
              // On successful SignUp, we recieve a Javascript Web Token (JWT). We need to save this somewhere locally so we can use it to get authorization to load other pages.
              // Ian, I don't know how to call the continue event thing thats at the top of this page so I can replace the next line with that. Think you can do that? Also for Login.js
              this.props.nextStep();
                
          }).catch((error) => {
              // There was an error sent back, so read the String sent back and act accordingly.
              if(error.response.data.message === "User already exists") {
                  // If we got here, then the user being created already exists
                  console.log("USER ALREADY EXISTS");
              }
              else {
                // If we got here, some unknown error occured.
                console.log(ops)
                console.log("SOME UNKNOWN ERROR :(");

            }

          });
          
      }

      render() {
        return (
            <Grid container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={3}
            >
                <Grid item />
                
                <Grid item container spacing={3} justify='center' alignItems='center' direction='column'>
                         <Grid item xs={12} sm={7}>
                         <Typography variant='h3' align='center' className={useStyles.typographyStyles}>
                            Sign Up!
                        </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
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
                                id="outlined-required"
                                label="Email"
                                variant="outlined"
                                fullWidth={true}
                                onChange={this.handleChangeEmail}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                                variant="outlined"
                                fullWidth={true}
                                onChange={this.handleChangeName}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                type='password'
                                variant="outlined"
                                fullWidth={true}
                                onChange={this.handleChangePassword}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            fullWidth={true}
                            onClick={this.handleSubmit}
                        >
                            Confirm
                        </Button>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default SignUp