import React, { Component } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarRateIcon from '@material-ui/icons/StarRate'
import {API_URL} from './URLConstants'

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
  



export class RestaurantCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isFavorite: false
        }
    }

    
    addToFavorites = favorite => {


        const favRequest = {
            restaurantName: this.props.restaurant.name,
            restaurantAddress: this.props.restaurant.address,
            restaurantPhone: this.props.restaurant.phone,
            rating: this.props.restaurant.rating,
            websiteUrl: this.props.restaurant.website
        }
    
        const ops = {
            method: 'PUT',
            headers: { 
                'content-type': 'application/json',  
                'authorization': this.props.JWT
                    },
            data: JSON.stringify(favRequest) ,
            url: API_URL + "/users/addFavorite/" + this.props.userId
        }
        axios(ops)
          .then(res => {
                // Get the response here, do something with it here
                // On successful login, we recieve a Javascript Web Token (JWT). We need to save this somewhere locally so we can use it to get authorization to load other pages.
                    console.log(res)
                    this.setState({isFavorite: true})
    
          }).catch((error) => {
            console.log(error);
          });
          
      }

    render() {
        return (
            <Card className={useStyles.root}>
                <CardHeader
                    title={<Typography align='center' variant='h4'>{this.props.restaurant.name}</Typography>}
                />
                <CardContent className={useStyles.title}>
                <Typography align='center' variant='h5'>Contact Information</Typography>
                <Typography align='left' variant='subtitle1'>{this.props.restaurant.address}</Typography>
                <Typography align='left' variant='subtitle1'>{this.props.restaurant.phone}</Typography>
                <Typography align='left' variant='body1'>{this.props.restaurant.website}</Typography>
                <Typography align='center' variant='h4'>{this.props.restaurant.rating}<StarRateIcon/></Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={this.addToFavorites} align='center'>
                    { this.state.isFavorite
                    ? <FavoriteIcon fontSize="large" />
                    : <FavoriteBorderIcon fontSize="large" />
                    }
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

export default RestaurantCard
