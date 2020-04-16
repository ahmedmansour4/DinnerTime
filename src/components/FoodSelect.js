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
    

    handleChangeFoodChinese = event => {
        this.setState({ Food: "Chinese" });
        console.log("Chinese was selected");

      }

      handleChangeFoodAmerican = event => {
        this.setState({ Food: "American" });
        console.log("American was selected");

      }

      handleChangeFoodMexican = event => {
        this.setState({ Food: "Mexican" });
        console.log("Mexican was selected");

      }
      
      handleSubmit = event => {
        event.preventDefault();
        console.log("food is " + this.state.Food);

        
        this.props.nextStep()
        // Creating a object to hold all our login info and send it to API
        //const loginInfo = {
          //username: this.state.username,
          //password: this.state.password
        //};
        
        // Performing the post request, first paramter is the URL for where the API is located, second is the data we are sending, probably as a JSON packet.
        //console.log("username is: " + loginInfo.username + " and password is " + loginInfo.password);
        // Placeholder URL below

          
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
                            onClick={this.handleChangeFoodChinese}
                            fullWidth={true}
                            
                        >
                            Chinese
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            onClick={this.handleChangeFoodAmerican}
                            fullWidth={true}
                        >
                            American
                        </Button>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                        <Button 
                            variant='contained'
                            color="secondary"
                            onClick={this.handleChangeFoodMexican}
                            fullWidth={true}
        
                        >
        
                            Mexican
                        </Button>
                        </Grid>

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

                                <Grid item xs={6} sm={4}>
                                <Button 
                                    variant='contained'
                                    color="secondary"
                                    fullWidth={true}
                                    onClick={this.handleSubmit}
                                >
                                    Next
                                </Button>
                                </Grid>
                        </Grid>
                </Grid>
            </Grid>
        )
    }
}


export default FoodSelect

