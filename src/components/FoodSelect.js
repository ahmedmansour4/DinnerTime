import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import { Button, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    },
    button: {
        variant: 'contained',
        color: "secondary",
        fullWidth: true
    }
}));

export class FoodSelect extends Component {

    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    goBack = e => {
        e.preventDefault()
        this.props.prevStep()
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
                         <Typography variant='h5' align='center' className={useStyles.typographyStyles}>
                            Select what type of food you want.
                        </Typography>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                        <Button
                            variant='contained'
                            color="secondary"
                            onChange={handleChange('foodTypes')}
                            fullWidth={true}
                        >
                            Chinese
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            onChange={handleChange('foodTypes')}
                            fullWidth={true}
                        >
                            American
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            onChange={handleChange('foodTypes')}
                            fullWidth={true}
                        >
                            Mexican
                        </Button>
                        </Grid>

                        <Grid item container xs={6}  justify='center' spacing={3}>
                                
                                <Grid item xs={6} sm={4}>
                                <Button 
                                    variant='contained'
                                    color="secondary"
                                    onChange={handleChange('foodTypes')}
                                    fullWidth={true}
                                >
                                    Back
                                </Button>
                                </Grid>

                                <Grid item xs={6} sm={4}>
                                <Button 
                                    variant='contained'
                                    color="secondary"
                                    onChange={handleChange('foodTypes')}
                                    fullWidth={true}
                                >
                                    Next
                                </Button>
                                </Grid>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}


export default FoodSelect
