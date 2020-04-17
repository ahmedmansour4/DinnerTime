import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import { Button, Typography} from '@material-ui/core'
import Fastfood from '@material-ui/icons/Fastfood'
import { makeStyles } from '@material-ui/styles'

import Header from '../Header'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

  }));


export class FindFood extends Component {

    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    goToAddFriends = e => {
        e.preventDefault()
        this.props.goToAddFriends()
    }
		/*goToLogOut = e => {
        e.preventDefault()
        this.props.goToLogOut()
    }*/


		goToLeave = e => {
			this.props.goToLogOut()
		}

		goHome = e => {
			this.props.goHome()
		}

		getFriendList = e => {
			this.props.getFriendList()
		}

		getFavorites = e => {
			this.props.getFavorites()
		}

    render() {
        const {values, handleChange} = this.props

        return (
					<Grid container
							direction='column'
					>
					<Header
					goToLogOut={this.goToLeave}
					goHome={this.goHome}
					getFriendList={this.getFriendList}
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
		                       <Typography variant='h3' align='center' className={useStyles.typographyStyles}>
		                          Welcome to Dinner Time!
		                      </Typography>
		                      </Grid>
													<Grid item xs={12}></Grid>
	                        <Grid item xs={12} sm={7}>
	                        <Button
	                            variant='contained'
	                            color="secondary"
	                            fullWidth={true}
	                            onClick={this.continue}
	                        >
	                            <Fastfood />
	                        </Button>
	                        </Grid>

	                        <Grid item xs={12} sm={7}>
	                        <Button
	                            variant='contained'
	                            color="secondary"
	                            onChange={handleChange('foodTypes')}
	                            fullWidth={true}
	                            onClick={this.continue}
	                        >
	                            Random
	                        </Button>
	                        </Grid>
	                        <Grid item xs={12} sm={7}>
	                        <Button
	                            variant='contained'
	                            color="secondary"
	                            fullWidth={true}
	                            onClick={this.goToAddFriends}
	                        >
	                            Add Friend
	                        </Button>
	                        </Grid>
	                </Grid>
	            </Grid>
						</Grid>
        )
    }
}

export default FindFood
