import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import { Button, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles(() => ({
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
                            Select what type of food you want.
                        </Typography>
                        </Grid>

                        { this.props.possibleFoodTypes.map(type => 
                            <Grid item key={type} xs={12} sm={6} lg={2}>
							    <Button
                                    variant='contained'
                                    color="secondary"
                                    onClick={this.handleSubmit(type)}
                                    fullWidth={true}
                                    key={type}
                                >
                                    {type}
                                </Button>
                            </Grid>
                        )}

                </Grid>
            </Grid>
        )
    }
}


export default FoodSelect

