import React, { Component } from 'react'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'

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
                <CardActions>
                    <IconButton onClick={console.log('Adding'+this.props.restaurant.name+'to favorites.')}>
                        <FavoriteIcon fontSize="large" />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default RestaurantCard
