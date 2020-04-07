import React, { Component } from 'react'
import FoodSelect from './FoodSelect'
import FriendSelect from './FriendSelect'



export class UserForm extends Component {

    state = {
        step: 0,
        foodTypes: [],
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

    addToList = input => e => {
        this.setState({})
    }

    render() {
        const { step } = this.state
        const { firstName, lastName, email, occupation, city, bio} = this.state
        const values = { firstName, lastName, email, occupation, city, bio}

        switch(step) {
            case 0:
                return (
                    <FoodSelect
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 1:
                return (
                    <FriendSelect
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return <h1>Confirm</h1>
            case 3:
                return <h1>Success!</h1>

        }
    }
}

export default UserForm
