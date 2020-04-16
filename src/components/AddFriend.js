import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class AddFriend extends Component {

    // Add functions here

    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    goToFindFood = e => {
        e.preventDefault()
        this.props.goToFindFood()
    }

    addFriend = e => {
        console.log('adding friend')
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
                            Add a new friend.
                        </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Username"
                                variant="outlined"
                                fullWidth={true}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            fullWidth={true}
                            onClick={this.addFriend}
                        >
                            Confirm
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            fullWidth={true}
                            onClick={this.goToFindFood}
                        >
                            Cancel
                        </Button>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default AddFriend
