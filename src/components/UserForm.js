import React, { Component } from 'react'

import Login from './Login'
import FindFood from './FindFood'
import FoodSelect from './FoodSelect'
import FriendSelect from './FriendSelect'
import SignUp from './SignUp'
import AddFriend from './AddFriend'
import Confirm from './Confirm'
import FavoritesList from './FavoritesList'
import Result from './Result'


export class UserForm extends Component {

    state = {
        step: 0,
        emailConfirmed: false,
        username: '',
        foodTypes: '',
        possibleFoodTypes: ['Chinese', 'Mexican', 'American', 'Italian'],
        radius: 8046.7,
        latitude: 28.5619217,
        longitude: -81.1640778,
        favorites: [
            {
                name: 'Fav1',
                address: '1234 Way',
                rating: 2.2,
                website: 'fav1.com',
                phone: '123456589',
                place_id: ''
            },
            {
                name: 'Fav2',
                address: '1234 Way 2',
                rating: 4.2,
                website: 'fav2.com',
                phone: '12345658933',
                place_id: ''
            }
        ],
        token: '',
        selectedRestaurant: {
            name: '',
            address: '',
            rating: 0,
            website: '',
            phone: '',
            place_id: ''
        }
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

    goToFavoritesList = () => {
        const { step } = this.state
        this.setState(
            { step: 100 }
        )
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

    updateFoodTypes = input =>  {
        this.setState({foodTypes : input});
      }

      updateUsername = input =>  {
        this.setState({username: input});
      }

      updateLongitude = longitude => {
        this.setState({longitude: longitude});
    }

    updateLatitude = latitude => {
        this.setState({latitude: latitude});
    }

    setRadius = milesRadius => {
        this.setState({radius: (milesRadius*1609.34)})
        console.log(milesRadius)
    }

    setSelectedRestaurant = (selectedRestaurant) => {
        this.setState(prevState => ({
            selectedRestaurant: {
                name: selectedRestaurant.name,
                address: selectedRestaurant.address,
                rating: selectedRestaurant.rating,
                website: selectedRestaurant.website,
                phone: selectedRestaurant.phone,
                place_id: selectedRestaurant.place_id
            }
        }))
        console.log(this.state.selectedRestaurant)
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
                        updateUsername={this.updateUsername}
                        value={ values }
                    />
                )
            case 1:
                return (
                    <FindFood
                        nextStep={this.nextStep}
                        goToFavoritesList={this.goToFavoritesList}
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
                        possibleFoodTypes={this.state.possibleFoodTypes}
                    />
                )
            case 3:
                return (
                    <Confirm
                        handleChange={this.handleChange}
                        nextStep={this.nextStep}
                        values={ values }
                        foodTypes = {this.state.foodTypes}
                        setRadius={this.setRadius}
                        radius={this.state.radius}
                        setSelectedRestaurant={this.setSelectedRestaurant}
                    />
                )
            case 4:
                return ( 
                    <Result
                        restaraunt={this.state.selectedRestaurant}
                        longitude = {this.state.longitude}
                        latitude = {this.state.latitude}
                        foodTypes = {this.state.foodTypes}
                        radius={this.state.radius}
                        setSelectedRestaurant={this.setSelectedRestaurant}
                        goToFindFood={this.goToFindFood}
                        addToFavorites={this.addToFavorites}
                    />
                )
            case 100:
                return (
                    <FavoritesList
                        goToFindFood={this.goToFindFood}
                        favorites={this.state.favorites}
                    />
                )
        }
    }
}

export default UserForm
