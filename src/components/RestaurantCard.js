import React, { Component } from 'react'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import { CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    card: {
        minWidth: 500,
    }
}));
  
export class RestaurantCard extends Component {
    render() {
        return (
            <Card className={useStyles.card}>
                <CardHeader
                    title={<Typography align='center' variant='h3'>{this.props.restaurant.name}</Typography>}
                />
                <CardContent>
                <Typography align='center' variant='h5'>
                    {this.props.restaurant.address}
                    {this.props.restaurant.rating}
                    {this.props.restaurant.website}
                    {this.props.restaurant.phone}
                </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default RestaurantCard
