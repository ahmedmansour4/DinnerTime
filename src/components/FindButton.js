import React, { Component } from 'react'
import {AppBar, MuiThemeProvider, Button} from '@material-ui/core'

export class FindButton extends Component {
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
                    <br/>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.continue}
                    >
                        FIND
                    </Button>
                    <br/>
                    <Button variant='contained' color="primary" onChange={handleChange('foodTypes')}>
                        QuickFind
                    </Button>


                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default FindButton
