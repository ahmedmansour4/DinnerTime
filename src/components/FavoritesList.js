import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import FavoriteCard from './FavoriteCard'
import { makeStyles } from '@material-ui/styles'

import Header from '../Header'

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));


export class FavoritesList extends Component {

    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    goBack = e => {
        e.preventDefault()
        this.props.prevStep()
    }

		goToLeave = e => {
			this.props.goToLogOut()
		}

		goHome = e => {
			this.props.goHome()
		}

		getFriendList = e => {
			this.props.getFriendList()
		}


    render() {
        const { values } = this.props
        return (
					<Grid container
							direction='column'
					>
					<Header
					goToLogOut={this.goToLeave}
					goHome={this.goHome}
					getFriendList={this.getFriendList}
					/>
            <Grid container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={3}
								maxWidth="sm"
								style={{height: '80vh' }}
            >
                <Grid item />

                <Grid item container spacing={3} justify='center'>
                         <Grid item xs={12} sm={7}>
                         <Typography variant='h5' align='center' className={useStyles.typographyStyles}>
                            Favorite Restaurants
                        </Typography>
                        </Grid>

						{/* Friend Cards */}
                        { values.favoriteRestaurants.map(favorite =>
                            <Grid item xs={12} sm={6} lg={2}>
							    <FavoriteCard name={favorite}/>
                            </Grid>
                        )}

                </Grid>
            </Grid>
						</Grid>
        )
    }
}


export default FavoritesList
