import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid'

import { Button, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RestaurantCard from './RestaurantCard';


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class FavoritesList extends Component {

    goToFindFood = () => {
        this.props.goToFindFood()
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
                        { this.props.favorites.map((name, address, phone, website) => 
                            <Grid item xs={12} sm={6} lg={2}>
							    <RestaurantCard name={name} address={address} phone={phone} website={website}/>
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
                                    onClick={this.goBack}
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
