import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RestaurantCard from './RestaurantCard';
import DateFnsUtils from '@date-io/date-fns';
import Slider from '@material-ui/core/Slider'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class Confirm extends Component {

    getSearchRadius = radius => {
        this.setState({radius: radius.target.value })
    }

    findRestaurant = () => {
        console.log("Select Restaurant here and display on the next page")
    }

    render() {
        const { values } = this.props
        return (
            <Grid container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={3}
            >
                <Grid item />
                
                <Grid item container spacing={10} justify='center'>
                        <Grid item xs={12} sm={7}>
                        <Typography variant='h3' align='center' className={useStyles.typographyStyles}>
                            How far do you want to search?
                        </Typography>
                        </Grid>

    
                        <Grid item xs={12} sm={8} >
                        <Typography id="discrete-slider" gutterBottom>
                            Miles
                        </Typography>
                        <Slider
                            defaultValue={5}
                            //getAriaValueText={this.getSearchRadius}
                            onChange={this.getSearchRadius}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={50}
                        />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                        <Button
                            variant='contained'
                            color="secondary"
                            fullWidth={true}
                            onClick={this.findRestaurant}
                        >
                            Confirm
                        </Button>
                        </Grid>

                </Grid>
            </Grid>
        )
    }
}

export default Confirm
