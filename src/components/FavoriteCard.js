import React, { Component } from 'react'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(() => ({
    card: {
        minWidth: 500,
    }
}));


export class FavoriteCard extends Component {
    render() {
        return (
            <Card className={useStyles.card}>
                <CardHeader
                    title={<Typography align='center' variant='h3'>{this.props.name}</Typography>}
                />
                <CardContent>
                <Typography align='center' variant='h5'>
                    {this.props.address}
                    {this.props.rating}
                    {this.props.website}
                    {this.props.phone}
                </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={console.log('Adding'+this.props.name+'to favorites.')}>
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default FavoriteCard
