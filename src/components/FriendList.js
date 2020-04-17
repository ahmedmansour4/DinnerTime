import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import FriendCardNoCheckBox from './FriendCardNoCheckBox'
import { makeStyles } from '@material-ui/styles'

import yankee from './img/yankee.jpg'
import obamaPrism from './img/obama-prism.jpg'
import obamaSphere from './img/obama-sphere.png'
import Header from '../Header'

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));


export class FriendList extends Component {

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

		getFavorites = e => {
			this.props.getFavorites()
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
					getFavorites={this.getFavorites}
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
                            All Friends
                        </Typography>
                        </Grid>

						{/* Friend Cards */}
                        { values.friends.map(friend =>
                            <Grid item xs={12} sm={6} lg={2}>
							    <FriendCardNoCheckBox name={friend}/>
                            </Grid>
                        )}
                </Grid>
            </Grid>
						</Grid>
        )
    }
}


export default FriendList
