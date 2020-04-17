import React, { Component } from 'react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'
import Header from '../Header'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.tryLogin = this.tryLogin.bind(this);
    }

    handleChange = input => event => {
        this.setState( {[input]: event.target.value })
    }

    tryLogin() {

        const loginData = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:5000/users/login', loginData)
            .then(results => {
                console.log(results)
            })
            .catch(err => {
                console.log(err)
            })
    }

    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    goBack = e => {
        e.preventDefault()
        this.props.prevStep()
    }

    render() {
        return (

            <Grid container
                direction='column'
                justify='center'
                alignItems='center'
								spacing={3}
								maxWidth="sm"

								
            >
                <Grid item />

                <Grid item container spacing={3} justify='center'alignItems='center' direction='column'>
                       <Grid item xs={12} sm={7}>
                         <Typography variant='h3' align='center' className={useStyles.typographyStyles}>
                            Welcome to Dinner Time!
                        	</Typography>
                      	</Grid>
												<Grid item xs={12}></Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Username"
                                variant="outlined"
                                onChange={ this.props.handleChange }
                                fullWidth={true}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Password"
                                type='password'
                                onChange={ this.props.handleChange }
                                variant="outlined"
                                fullWidth={true}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
	                        <Button
	                            variant='contained'
	                            color="secondary"
	                            fullWidth={true}
	                            onClick={this.tryLogin}
	                        >
	                            Login
	                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
	                        <Button
	                            variant='contained'
	                            color="secondary"
	                            fullWidth={true}
	                            onClick={this.goBack}
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
