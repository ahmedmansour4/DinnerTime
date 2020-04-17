import React, { Component } from 'react'

import Login from './Login'
import FindFood from './FindFood'
import FoodSelect from './FoodSelect'
import FriendSelect from './FriendSelect'
import SignUp from './SignUp'
import AddFriend from './AddFriend'
import Result from './Result'


export class UserForm extends Component {

    state = {
        step: 6,
        username: '',
        foodTypes: 'Chinese',
        favoriteRestaurants: [],
        radius: 20000,
        latitude: 28.5619217,
        longitude: -81.1640778,
        friends:["test", "test2", "test2", "test2", "test2", "test2", "test2",]
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

    goToAddFriends = e => {
        const { step } = this.state
        this.setState({
            step: 100
        })
    }

    // Handle feilds change
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }

    updateFoodTypes = input =>  {
        this.setState({foodTypes : input});
      }

    updateUsername = input =>  {
        this.setState({username : input});
      }

      updateLongitude = longitude => {
        console.log("YOOOOOOOOOOOOOOOOOOOOOOOOO nIce, location is " + longitude);
        this.setState({longitude: longitude});
    }

    updateLatitude = latitude => {
        console.log("YOOOOOOOOOOOOOOOOOOOOOOOOO nIce, location is " + latitude);
        this.setState({latitude: latitude});
    }
    render() {
        const { step } = this.state
        const { username, foodTypes, favoriteRestaurants, friends } = this.state
        const values = { username, foodTypes, favoriteRestaurants, friends }

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
                        updateUsername={this.updateUsername}
                    />
                )
            case 1:
                return (
                    <FindFood
                        nextStep={this.nextStep}
                        goToAddFriends={this.goToAddFriends}
                        handleChange={this.handleChange}
                        value={ values }
                        updateLongitude={this.updateLongitude}
                        updateLatitude={this.updateLatitude}
                    />
                )
            case 2:
                return (
                    <FoodSelect
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        updateFoodTypes={this.updateFoodTypes}
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
                return <h1>Confirm</h1>
            case 5:
                return <h1>Success!</h1>
            case 6:
                return <Result
                value={ values }
                longitude = {this.state.longitude}
                latitude = {this.state.latitude}
                foodTypes = {this.state.foodTypes}
                radius = {this.state.radius}
                />
            case 100:
                return (
                    <AddFriend

                    />
                )
        }
    }
}

export default UserForm