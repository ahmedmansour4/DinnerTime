import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Typography} from '@material-ui/core'
import axios from 'axios';
import { withStyles } from '@material-ui/styles'

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';

//card stuff
import RestaurantCard from './RestaurantCard'
import Header from '../Header'

const useStyles = theme => ({
    typographyStyles: {
        flex: 1
    },
		paper: {
		 marginTop: theme.spacing(8),
		 display: 'flex',
		 flexDirection: 'column',
		 alignItems: 'center',
	 },
	 form: {
		 width: '100%', // Fix IE 11 issue.
		 marginTop: theme.spacing(1),
	 },
	 submit: {
		 margin: theme.spacing(3, 0, 2),
	 },
});

export class Result extends Component {


    constructor(props) {
        super(props);

        this.state = {
            selectedRestaurant: {
                name: '',
                address: '',
                rating: '',
                website: '',
                phone: '',
                place_id: ''
            }
        }
    }

    componentDidMount() {
        this.pickRestaurant();
    }


    pickRestaurant = () => {
        console.log('in confirm:'+this.props.radius)
        const ops = {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.props.latitude + "," + this.props.longitude + "&radius=" + this.props.radius + "&type=restaurant&keyword=" + this.props.foodTypes + "&key=AIzaSyDqBSIr1u7owxnrzuWY-GlULfxeTuz9kIk"
        }
        axios(ops)
            .then(res => {
                let pick = Math.floor(Math.random() * res.data.results.length);
                console.log(res.data.results[pick].place_id);
                this.getRestaurantDetails(res.data.results[pick].place_id)

            }).catch((error) => {
                // There was an error sent back, so read the String sent back and act accordingly.
                console.log(error);
            });
    }

    getRestaurantDetails = id => {
        const ops = {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=" + id + "&fields=name,rating,formatted_phone_number,formatted_address,website&key=AIzaSyDqBSIr1u7owxnrzuWY-GlULfxeTuz9kIk"
          }
          axios(ops)
          .then(res => {

            this.setSelectedRestaurant(res.data.result.name,
                res.data.result.formatted_address,
                res.data.result.formatted_phone_number,
                res.data.result.rating,
                res.data.result.website,
                id)

          }).catch((error) => {
              // There was an error sent back, so read the String sent back and act accordingly.
              console.log(error);
          });
    }

    setSelectedRestaurant = (name, address, phone, rating, website, place_id) => {
        const selectedRestaurant = {name, address, phone, rating, website, place_id}
        this.setState(prevState => ({
            selectedRestaurant: {
                name: selectedRestaurant.name,
                address: selectedRestaurant.address,
                rating: selectedRestaurant.rating,
                website: selectedRestaurant.website,
                phone: selectedRestaurant.phone,
                place_id: selectedRestaurant.place_id
            }
        }))
    }

    goToFindFood = () => {
        this.props.goToFindFood();
    }

    addToFavorites = (restaurant) => {
        this.props.addToFavorites(restaurant)
    }

		goHome = e => {
			this.props.goHome()
		}

		goToLeave = e => {
			this.props.goToLogOut()
		}

		getFavorites = e => {
			this.props.goToFavoritesList()
		}


  render() {
		const {classes} = this.props;
    return (
			<Grid container
					direction='column'
			>
			<Header
			goToLogOut={this.goToLeave}
			goHome={this.goHome}
			getFavorites={this.getFavorites}
			/>
        <Grid container
            direction='column'
            justify='center'
            alignItems='center'
            spacing={3}
        >
				<Grid item style={{height: '10vh' }} />
				<Container component="main" maxWidth="md">
				<CssBaseline />
				<div className={classes.paper}>
                <Typography variant='h3' align='center' className={useStyles.typographyStyles}>
                    Here's what we found
                </Typography>
								<Grid item style={{height: '2vh' }} />
								<form className={classes.form} noValidate>
                <RestaurantCard
                    restaurant={this.state.selectedRestaurant}
                    addToFavorites={this.addToFavorites}
                    JWT={this.props.JWT}
                    userId={this.props.userId}
                />

                <Button
                    variant='contained'
                    color="secondary"
                    fullWidth={true}
                    onClick={this.goToFindFood}
										className={classes.submit}
                >
                    Done
                </Button>
								</form>
					</div>
					</Container>
        </Grid>
				</Grid>
    )
}

}

export default withStyles(useStyles)(Result)
