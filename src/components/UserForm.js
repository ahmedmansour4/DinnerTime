import React, { Component } from 'react'

import Login from './Login'
import FindFood from './FindFood'
import FoodSelect from './FoodSelect'
import FriendSelect from './FriendSelect'


export class UserForm extends Component {

    state = {
        step: 1,
        foodTypes: '',
        lastName: '',
        email: '',
        occupation: '',
        city: '',
        bio: ''
    }

    // Go to next step
    nextStep = () => {
        const { step } = this.state

        this.setState({
            step: step + 1
        })
    }

    // Go to previous step
    prevStep = () => {
        const { step } = this.state

        this.setState({
            step: step - 1
        })
    }

    // Handle feilds change
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }

    render() {
        const { step } = this.state
        const { firstName, lastName, email, occupation, city, bio} = this.state
        const values = { firstName, lastName, email, occupation, city, bio}

        switch(step) {
            case 0:
                return (
                    <Login
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 1:
                return (
                    <FindFood
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <FoodSelect
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 3:
                return (
                    <FriendSelect
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 4:
                return <h1>Confirm</h1>
            case 5:
                return <h1>Success!</h1>

        }
    }
}

export default UserForm
