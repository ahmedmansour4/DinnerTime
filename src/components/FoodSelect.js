import React, { Component } from 'react'

import {AppBar, MuiThemeProvider, Button} from '@material-ui/core'

export class FoodSelect extends Component {
    continue = e => {
        e.preventDefault()
        this.props.nextStep()

    }

    render() {
        const {values, handleChange} = this.props
        
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar position='static'>
                        <div>What do you want to eat?</div>
                    </AppBar>
                    <Button variant='contained' onChange={handleChange('foodTypes')}>Chinese</Button>
                    <Button onChange={handleChange('foodTypes')}>American</Button>
                    <Button onChange={handleChange('foodTypes')}>Thai</Button>
                    <Button onChange={handleChange('foodTypes')}>Italian</Button>

                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={this.continue}
                    >
                        NEXT
                    </Button>
                </React.Fragment>
            </MuiThemeProvider>
            
        )
    }
}


export default FoodSelect
