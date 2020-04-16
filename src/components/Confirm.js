import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RestaurantCard from './RestaurantCard';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class Confirm extends Component {

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
                
                <Grid item container spacing={3} justify='center' alignItems='center' direction='column'>
                        <Grid item xs={12} sm={7}>
                        <Typography variant='h3' align='center' className={useStyles.typographyStyles}>
                            Here's what we got for you:
                        </Typography>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                        <RestaurantCard
                            /* Insert chosen restaurant name */
                            name={ values.favorites } 
                        />
                        </Grid>

                        <Typography variant='h5' align='center' className={useStyles.typographyStyles}>
                            What time do you want eat?
                        </Typography>
                        

                </Grid>
            </Grid>
        )
    }
}

export default Confirm
