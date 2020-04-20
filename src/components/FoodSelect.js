import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import { Button, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Header from '../Header'

const useStyles = makeStyles(() => ({
		root: {
			display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',

		},
		gridList: {
    width: 500,
    height: 450,
  },
    typographyStyles: {
        flex: 1
    }
}));

export class FoodSelect extends Component {



    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    goBack = e => {
        e.preventDefault()
        this.props.prevStep()
    }


    handleSubmit = input => event => {
      console.log("food is " + input);
      event.preventDefault();

      this.props.updateFoodTypes(input);

      console.log("test: ");
      this.props.nextStep();

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

        return (
					<Grid container
							direction='column'
					>
					<Header
					goToLogOut={this.goToLeave}
					goHome={this.goHome}
					getFavorites={this.getFavorites}
					/>
					<div className={useStyles.root}>
            <Grid container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={3}
								style={{height: '80vh' }}
            >

								<GridList cellHeight={80} className={useStyles.gridList}>
                         <GridListTile cols={2} style={{ height: '10vh' }}>
		                       <Typography variant='h5' align='center' className={useStyles.typographyStyles}>
															Select what type of food you want.
		                      </Typography>
                        </GridListTile>
                        { this.props.possibleFoodTypes.map(type =>
                            <GridListTile >
							    <Button
                                    variant='contained'
                                    color="secondary"
                                    onClick={this.handleSubmit(type)}
                                    fullWidth={true}
                                    key={type}
                                >
                                    {type}
                                </Button>
                            </GridListTile>
                        )}
							</GridList>
            </Grid>
						</div>
					</Grid>
        )
    }
}


export default FoodSelect
