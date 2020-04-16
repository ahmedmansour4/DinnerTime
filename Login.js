import React, { Component } from 'react'


import axios from 'axios';

import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class Login extends Component {

    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }
    
    // This event thingy is triggered when a change is made to the username field, and sets the value of the field to the variable username
    handleChangeUsername = event => {
        this.setState({ username: event.target.value });
        console.log("woot test2");
      }

      // This event thingy is triggered when a change is made to the password field, and sets the value of the field to the variable password
      handleChangePassword = event => {
        this.setState({ password: event.target.value });
        console.log("woot test2");
      }
     
      // This event thingy is triggered when you click the submit button.
      handleSubmit = event => {
        event.preventDefault();
        console.log("woot test2");

        // Creating a object to hold all our login info and send it to API
        const loginInfo = {
          username: this.state.username,
          password: this.state.password
        };
        // Performing the post request, first paramter is the URL for where the API is located, second is the data we are sending, probably as a JSON packet.
        console.log("username is: " + loginInfo.username + " and password is " + loginInfo.password);
        // Placeholder URL below
        axios.post(`localhost:3000/api/Login.php`, { loginInfo })
          .then(res => {
              // Get the response here, do something with it here
            console.log(res);
            console.log(res.data);
          })
      }
    
      // This render function controls what is displayed, it's all in HTML
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
                            Welcome to Dinner Time!
                        </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required id="outlined-required" label="Username" variant="outlined" fullWidth={true} onChange={this.handleChangeUsername}/>
                            
                        </Grid>

                        <Grid item xs={6}>
                            <TextField required id="outlined-required" label="Password" type='password' variant="outlined" fullWidth={true} onChange={this.handleChangePassword}/>
                        </Grid>
                        <p>Test!!</p>
                        <Grid item xs={12} sm={7}>
                        <Button variant='contained' color="secondary" fullWidth={true} onClick={this.handleSubmit}
                        >
                            Login
                        </Button>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Login
