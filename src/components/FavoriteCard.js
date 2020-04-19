import React, { Component } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import StarRateIcon from '@material-ui/icons/StarRate'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export class FavoriteCard extends Component {

    render() {
            return (
                <Card className={useStyles.card}>
                    <CardHeader
                    title={<Typography align='center' variant='h4'>{this.props.favorite.name}</Typography>}
                    />
                        <CardContent className={useStyles.title}>
                        <Typography align='center' variant='h5'>Contact Information</Typography>
                        <Typography align='left' variant='subtitle1'>{this.props.favorite.address}</Typography>
                        <Typography align='left' variant='subtitle1'>{this.props.favorite.phone}</Typography>
                        <Typography align='left' variant='body1'>{this.props.favorite.website}</Typography>
                        <Typography align='left' variant='body1'>{this.props.favorite.restaurantId}</Typography>
                        <Typography align='center' variant='h4'>{this.props.favorite.rating}<StarRateIcon/></Typography>
                        </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={this.props.removeFav.bind(this, this.props.favorite.arrId)}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            )
    }
}

export default FavoriteCard
