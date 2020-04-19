import React, { Component } from 'react'

import Login from './Login'
import FindFood from './FindFood'
import FoodSelect from './FoodSelect'
import SignUp from './SignUp'
import Confirm from './Confirm'
import FavoritesList from './FavoritesList'
import Result from './Result'


export class UserForm extends Component {

    state = {
        step: 0,
        emailConfirmed: false,
        username: '',
        userId: '',
        foodTypes: '',
        possibleFoodTypes: ['Chinese', 'Mexican', 'American', 'Italian', 'Japanese', 'Greek'],
        radius: 8046.7,
        latitude: 28.5619217,
        longitude: -81.1640778,
        JWT: '',
        favorites: [],
        selectedRestaurant: {
            name: '',
            address: '',
            rating: 0,
            website: '',
            phone: '',
            place_id: '',
            restarauntId: ''
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

    //used when user clicks for a random food selection
    goToConfirm = () => {

        var selection = Math.floor(Math.random() * Math.floor(this.state.possibleFoodTypes.length));

        this.setState({
            step: 3,
            foodTypes: this.state.possibleFoodTypes[selection]
        })
    }

    goToFavoritesList = () => {  
        this.setState(
            { step: 100 }
        )
    }

    goToFindFood = () => {
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

    setJWT = JWT => {
        this.setState({JWT: JWT});
    }

    setUserId = userId => {
        this.setState({userId: userId});
    }
    setRadius = milesRadius => {
        this.setState({radius: (milesRadius*1609.34)})
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

    addToFavorites = restaraunt => {
        this.setState(prevState => ({
            favorites: [...prevState.favorites, {restaraunt}],
        }));
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
                        setJWT={this.setJWT}
                        setUserId={this.setUserId}
                        value={ values }
                    />
                )
            case 1:
                return (
                    <FindFood
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        goToFavoritesList={this.goToFavoritesList}
                        goToConfirm={this.goToConfirm}
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
                        JWT={this.state.JWT}
                        userId={this.state.userId}
                    />
                )
            case 100:
                return (
                    <FavoritesList
                        goToFindFood={this.goToFindFood}
                        favorites={this.state.favorites}
                        username = {this.state.username}
                        JWT = {this.state.JWT}
                        userId = {this.state.userId}
                    />
                )
                default:
                    return (
                        <Login
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            updateUsername={this.updateUsername}
                            setJWT={this.setJWT}
                            setUserId={this.setUserId}
                            value={ values }
                        />
                    )
        }
    }
}

export default UserForm
