import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Slider from '@material-ui/core/Slider'
import Header from '../Header'


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

export class Confirm extends Component {

    setRadius = radius => {
        this.props.setRadius(radius)
    }

    nextStep = e => {

        this.props.nextStep()
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
        const handleRadiusChange = (e, value) => {
            this.setRadius(value)
        }

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
								style={{height: '80vh' }}
            >
                <Grid item />

                <Grid item container spacing={10} justify='center'>
                        <Grid item xs={12} sm={7}>
                        <Typography variant='h3' align='center' className={useStyles.typographyStyles}>
                            How far do you want to search?
                        </Typography>
                        </Grid>


                        <Grid item xs={12} sm={8} >
                        <Typography id="discrete-slider" gutterBottom>
                            Miles
                        </Typography>
                        <Slider
                            defaultValue={5}
                            onChange={handleRadiusChange}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={30}
                        />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                        <Button
                            variant='contained'
                            color="secondary"
                            fullWidth={true}
                            onClick={this.nextStep}
                        >
                            Confirm
                        </Button>
                        </Grid>

                </Grid>
            </Grid>
						</Grid>
        )
    }
}

export default Confirm
