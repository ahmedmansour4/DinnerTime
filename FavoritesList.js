import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { Button, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import FavoriteCard from './FavoriteCard'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class FavoritesList extends Component {

    goToFindFood = () => {
        this.props.goToFindFood()
    }

    componentDidMount() {
        this.loadFavorites();
    }

    loadFavorites = () => {

        console.log("my tokenis " + this.props.JWT);
        console.log("my username is " + this.props.username);
        console.log("myuserId is: " + this.props.userId);
        var username = this.props.username;

        const ops = {
            method: 'GET',
            headers: { 
                'content-type': 'application/json',  
                'authorization': this.props.JWT
                    },
            url: "http://localhost:5000/users/getFavorites/" + this.props.userId
          }
          axios(ops)
              .then(res => {
                    // Favorites are here!
                    console.log("res is " + JSON.stringify(res));
              }).catch((error) => {
                  // There was an error sent back, so read the String sent back and act accordingly.
                  console.log(error);
              });
        
      
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
                        { this.props.favorites.map(({name, address, phone, rating, website}) => 
                            <Grid item xs={12} sm={6} lg={2}>
                                <FavoriteCard 
                                    name={name}
                                    address={address}
                                    phone={phone}
                                    rating={rating}
                                    website={website}
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
