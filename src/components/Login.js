import React, { Component } from 'react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
//import { makeStyles } from '@material-ui/styles'
import { withStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import {API_URL} from './URLConstants'


import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';

import HeaderNoMenu from './HeaderNoMenu'

const useStyles = theme => ({
    typographyStyles: {
        flex: 1
    },
		paper: {
		 marginTop: theme.spacing(8),
		 display: 'flex',
		 flexDirection: 'column',
		 alignItems: 'center',
	 },
	 form: {
		 width: '100%', // Fix IE 11 issue.
		 marginTop: theme.spacing(1),
	 },
	 submit: {
		 margin: theme.spacing(3, 0, 2),
	 },
});

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
			goLogIn = e => {
				this.props.goToLogOut()
			}
      // This render function controls what is displayed, it's all in HTML
    render() {
				const {classes} = this.props;
        return (
					<Grid container
							direction='column'
					>
					<HeaderNoMenu
					goLogIn = {this.goLogIn}
					/>
					<Grid item style={{height: '10vh' }}/>
					<Container component="main" maxWidth="xs">
						<CssBaseline />
						<div className={classes.paper}>
							<Typography variant='h3' align='center' className={useStyles.typographyStyles}>
								 Welcome to Dinner Time!
						 </Typography>
							<form className={classes.form} noValidate>
							<TextField
								 required
								 defaultValue=''
								 id="outlined-required"
								 label="Username"
								 variant="outlined"
								 fullWidth={true}
								 onChange={this.handleChangeUsername}
								 margin="normal"
						 />
								<TextField
	 								 required
	 								 defaultValue=''
	 								 id="outlined-required"
	 								 label="Password"
	 								 type='password'
	 								 variant="outlined"
	 								 fullWidth={true}
	 								 onChange={this.handleChangePassword}
									  margin="normal"
	 						 />
								<Button
 									 variant='contained'
 									 color="primary"
 									 fullWidth={true}
 									 onClick={this.handleSubmit}
									 className={classes.submit}
 							 >
 									 Login
 							 </Button>
							 <Button
									variant='contained'
									color="secondary"
									fullWidth={true}
									onClick={this.prevStep}
									className={classes.submit}
							>
									Sign Up
							</Button>

							</form>
						</div>

					</Container>

					</Grid>
        )
    }
}

export default withStyles(useStyles)(Login)
