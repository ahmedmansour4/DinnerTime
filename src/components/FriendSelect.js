import React, { Component } from 'react'

import {AppBar, MuiThemeProvider, TextField, Button} from '@material-ui/core'

export class FriendSelect extends Component {
    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    goBack = e => {
        e.preventDefault()
        this.props.prevStep()
    }

    render() {
        const {values, handleChange} = this.props
        
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar position='static'>
                        <div>Enter User Details</div>
                    </AppBar>
                    <br/>
                    <TextField
                        label='Enter Your First Name'
                        floatingLabelText='First Name'
                        onChange={handleChange('firstName')}
                        defaultValue={values.firstName}
                    />
                    <br/>
                    <TextField
                        label='Enter Your Last Name'
                        floatingLabelText='Last Name'
                        onChange={handleChange('lastName')}
                        defaultValue={values.lastName}
                    />
                    <br />
                    <TextField
                        label='Enter Your Email'
                        floatingLabelText='Email'
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                    />
                    <br/>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={this.continue}
                    >
                        NEXT
                    </Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={this.goBack}
                    >
                        BACK
                    </Button>
                </React.Fragment>
            </MuiThemeProvider>
            
        )
    }
}



export default FriendSelect
