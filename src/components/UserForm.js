import React, { Component } from 'react'

import Login from './Login'
import FindFood from './FindFood'
import FoodSelect from './FoodSelect'
import FriendSelect from './FriendSelect'
import SignUp from './SignUp'
import AddFriend from './AddFriend'
import Confirm from './Confirm'


export class UserForm extends Component {

    state = {
        step: 4,
        username: '',
        foodTypes: '',
        radius: 0,
        favorites: ['McDonalds'],
        friends: ['bob'],
        eventInfo: {
            attendees: [],
            restaurant: '',
            description: '',
            timeOfEvent: '',
            duration: ''
        },
        token: ''
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

    goToAddFriends = () => {
        const { step } = this.state
        this.setState({
            step: 100
        })
    }

    goToFindFood = () => {
        const { step } = this.state
        this.setState({
            step: 1
        })
    }

    // Handle feilds change
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }


    render() {
        const { step } = this.state
        const { username, foodTypes, favorites, friends } = this.state
        const values = { username, foodTypes, favorites, friends }

        switch(step) {
            case -1:
                return (
                    <SignUp
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        value={ values }
                    />
                )
            case 0:
                return (
                    <Login
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        value={ values }
                    />
                )
            case 1:
                return (
                    <FindFood
                        nextStep={this.nextStep}
                        goToAddFriends={this.goToAddFriends}
                        handleChange={this.handleChange}
                        value={ values }
                    />
                )
            case 2:
                return (
                    <FoodSelect
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        value={ values }
                    />
                )
            case 3:
                return (
                    <FriendSelect
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={ values }
                    />
                )
            case 4:
                return (
                    <Confirm
                        handleChange={this.handleChange}
                        values={ values }
                    />
                )
            case 5:
                return <h1>Success!</h1>
            case 100:
                return (
                    <AddFriend
                        goToFindFood={this.goToFindFood}
                    />
                )
        }
    }
}

export default UserForm
