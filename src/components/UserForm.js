import React, { Component } from 'react'

import Login from './Login'
import FindFood from './FindFood'
import FoodSelect from './FoodSelect'
import FriendSelect from './FriendSelect'
import SignUp from './SignUp'
import AddFriend from './AddFriend'
import FriendList from './FriendList'
import FavoritesList from './FavoritesList'


export class UserForm extends Component {

    state = {
        step: 1,
        username: '',
        foodTypes: '',
        favoriteRestaurants: [],
        friends:[]
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

		goToLogOut = e => {
        const { step } = this.state
        this.setState({
            step: 0
        })
    }

		goHome = e => {
        const { step } = this.state
        this.setState({
            step: 1
        })
    }

		getFriendList = e => {
        const { step } = this.state
        this.setState({
            step: 110
        })
    }

		getFavorites = e => {
        const { step } = this.state
        this.setState({
            step: 120
        })
    }



    // Handle feilds change
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
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
                    />
                )
            case 1:
                return (
                    <FindFood
                        nextStep={this.nextStep}
                        goToAddFriends={this.goToAddFriends}
												goToLogOut={this.goToLogOut}
												goHome={this.goHome}
												getFriendList={this.getFriendList}
												getFavorites={this.getFavorites}
                        handleChange={this.handleChange}
                        value={ values }
                    />
                )
            case 2:
                return (
                    <FoodSelect
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
												goToLogOut={this.goToLogOut}
												goHome={this.goHome}
												getFriendList={this.getFriendList}
												getFavorites={this.getFavorites}
                        handleChange={this.handleChange}
                        value={ values }
                    />
                )
            case 3:
                return (
                    <FriendSelect
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
												goToLogOut={this.goToLogOut}
												goHome={this.goHome}
												getFriendList={this.getFriendList}
												getFavorites={this.getFavorites}
                        handleChange={this.handleChange}
                        values={ values }
                    />
                )
            case 4:
                return <h1>Confirm</h1>
            case 5:
                return <h1>Success!</h1>
            case 100:
                return (
                    <AddFriend
										goToLogOut={this.goToLogOut}
										goHome={this.goHome}
										getFriendList={this.getFriendList}
										getFavorites={this.getFavorites}
                    />
                )
						case 110:
                return (
									<FriendList
											nextStep={this.nextStep}
											prevStep={this.prevStep}
											goToLogOut={this.goToLogOut}
											goHome={this.goHome}
											getFriendList={this.getFriendList}
											getFavorites={this.getFavorites}
											handleChange={this.handleChange}
											values={ values }
									/>
                )
						case 120:
								return (
									<FavoritesList
											nextStep={this.nextStep}
											prevStep={this.prevStep}
											goToLogOut={this.goToLogOut}
											goHome={this.goHome}
											getFriendList={this.getFriendList}
											getFavorites={this.getFavorites}
											handleChange={this.handleChange}
											values={ values }
									/>
								)
        }
		}
}

export default UserForm
