import React, { Component } from 'react'

import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import { CardHeader } from '@material-ui/core';


export class FavoriteCard extends Component {


    render() {

        const { image, name } = this.props

        return (
                <Card>
                    <CardHeader
                        title={<Typography align='center' variant='h5'>{name}</Typography>}
                    />
                </Card>
        )
    }
}

export default FavoriteCard
