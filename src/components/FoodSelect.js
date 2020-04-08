import React, { Component } from 'react'

import {AppBar, MuiThemeProvider, Button} from '@material-ui/core'

export class FoodSelect extends Component {
    continue = e => {
        e.preventDefault()
        this.props.nextStep()
    }

    goBack = e => {
        e.preventDefault()
        this.props.prevStep()
    }

    render() {
        const {values, handleChange} = this.props
        
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar position='static'>
                        <div>What do you want to eat?</div>
                    </AppBar>
                    <Button 
                        variant='contained'
                        color="primary"
                        onChange={handleChange('foodTypes')}
                        onClick={this.continue}
                    >
                        Chinese
                    </Button>
                    <br/>
                    <Button 
                        variant='contained'
                        color="primary"
                        onChange={handleChange('foodTypes')}
                        onClick={this.continue}
                    >
                        American
                    </Button>
                    <br/>
                    <Button 
                        variant='contained'
                        color="primary"
                        onChange={handleChange('foodTypes')}
                        onClick={this.continue}
                    >
                        Thai
                    </Button>
                    <br/>
                    <Button 
                        variant='contained'
                        color="primary"
                        onChange={handleChange('foodTypes')}
                        onClick={this.continue}
                    >
                        Italian
                    </Button>
                    <br/>

                    <Button 
                        variant="contained"
                        color="secondary"
                        onClick={this.continue}
                    >
                        NEXT
                    </Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={this.goBack}
                    >
                        BACK
                    </Button>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}


export default FoodSelect
