import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { Button, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import FavoriteCard from './FavoriteCard'
import {API_URL} from './URLConstants'



const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class FavoritesList extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            favorites: [
            ]
        }
    }


    goToFindFood = () => {
        this.props.goToFindFood()
    }

    componentDidMount() {
        this.loadFavorites();
    }

    loadFavorites = () => {

        const ops = {
            method: 'GET',
            headers: { 
                'content-type': 'application/json',  
                'authorization': this.props.JWT
                    },
            url: API_URL + "/users/getFavorites/" + this.props.userId
          }
          axios(ops)
              .then(res => {
                    // Favorites are here!
                    console.log("res is " + JSON.stringify(res));

                    for (let i = 0; i < res.data.length; i++)
                    {
                        const favorite_fields = {
                            name: res.data[i].restaurantName,
                            address: res.data[i].restaurantAddress,
                            rating: res.data[i].rating,
                            website: res.data[i].websiteUrl,
                            phone: res.data[i].restaurantPhone,
                            restarauntId: res.data[i]._id,
                            arrId: i
                        }

                        this.setState({
                            favorites: [...this.state.favorites, favorite_fields]
                        })
                    }
              }).catch((error) => {
                  // There was an error sent back, so read the String sent back and act accordingly.
                  console.log(error);
              }); 
    }
    
    deleteFavorite = (id) => {

        console.log("delteting...")
        const ops = {
            method: 'DELETE',
            headers: { 
                'content-type': 'application/json',  
                'authorization': this.props.JWT
                    },
            url: API_URL + "/users/deleteFavorite/" + this.props.userId + "&" + this.state.favorites[id].restarauntId
          }
          axios(ops)
              .then(res => {
                console.log(res.data)
              }).catch((error) => {
                  // There was an error sent back, so read the String sent back and act accordingly.
                  console.log(error);
              }); 
    }

    removeFav = (arrId) => {
        console.log(arrId)
        this.setState({
            favorites: [...this.state.favorites.filter(favorite => favorite.arrId !== arrId)]
        })
        this.deleteFavorite(arrId)
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
                
                <Grid item container spacing={3} justify='center'>
                         <Grid item xs={12} sm={7}>
                         <Typography variant='h5' align='center' className={useStyles.typographyStyles}>
                            Your favorite restaurants
                        </Typography>
                        </Grid>

						{/* Friend Cards */}
                        { this.state.favorites.map((favorite) => 
                            <Grid item key={favorite.arrId} xs={12} sm={6}>
                                <FavoriteCard 
                                    favorite={favorite}
                                    JWT={this.props.JWT}
                                    key={favorite.arrId}
                                    removeFav={this.removeFav}
                                />
                            </Grid>
                        )}

                            
                        {/* Next and Back Buttons */}
                        <Grid item container xs={12} 
                            justify='center'
                            alignItems='stretch'
                            spacing={3}
                        >        
                                <Grid item xs={6} sm={4}>
                                <Button 
                                    variant='contained'
                                    color="secondary"
                                    fullWidth={true}
                                    onClick={this.goToFindFood}
                                >
                                    Back
                                </Button>
                                </Grid>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default FavoritesList
