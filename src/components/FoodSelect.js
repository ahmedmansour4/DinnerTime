import React, { Component } from 'react'
import axios from 'axios';
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
        const { handleChange } = this.props

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


                        {/* List of Food Types */}
                        <Grid item xs={12} sm={7}>
                        <Button
                            variant='contained'
                            color="secondary"
                            onClick={this.handleChange}
                            fullWidth={true}
                            onClick={this.handleSubmit("Chinese")}
                        >
                            Chinese
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            onClick={this.handleSubmit("American")}
                            fullWidth={true}
                        >
                            American
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            onClick={this.handleSubmit("Mexican")}
                            fullWidth={true}
                        >
        
                            Mexican
                        </Button>
                        </Grid>

                </Grid>
            </Grid>
        )
    }
}


export default FoodSelect
