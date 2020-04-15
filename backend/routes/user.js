// When making a call to this router using something like 'axios', you would
// call 'http://localhost:5000/users/' or 'http://localhost:5000/users/login'

const router = require('express').Router();
// bcrypt is what is used to hash the user's password
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Creates a json web token
// Middleware used to check a client's authorization, so they cannot access
// certain webpages without being logged in
const checkAuth = require('../middleware/check-auth');
let User = require('../models/user.model');
let Event = require('../models/event.model');

// Bring in all the middlware required to help send the confirmation email
const sendEmail = require('./email.send');
const msgs = require('../middleware/email.msgs');
const templates = require('../middleware/email.template');

// This endpoint will return all users in the DinnerTime database
router.get('/', checkAuth, (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpoint will return a specific user within the data base using the
// username
router.get('/findUser', checkAuth, (req, res, next) => {
    const username = req.body.username;

    User.findOne({username: username})
        .then(user => res.status(200).json({
            userId: user._id
        }))
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpoint creates a user account for a client within the DinnerTime
// database
router.post('/createAccount', (req, res, next) => {
    // Extract account information entered by the user
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;

    User.find({username: username})
        .then(user => {
            // First verify that a user with that username does not already
            // exist
            if (user.length >= 1){
                return res.status(409).json({
                    message: "User already exists"
                });
            } else {
                // Hash the password and insert the new user to the database
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        //Create a new 'User', which uses the 'userSchema' model
                        // from 'user.mode.js'. NOTE: Some fields are not present
                        // for the fact that a user will not have 'friends',
                        // 'favorites', or 'upcomingEvents' at signUp
                        const newUser = new User({
                            name: name,
                            username: username,
                            password: hash,
                            email: email,
                        });

                        // Save the new user to the DinnerTime database. Then
                        // send a confirmation email to the user, and success
                        // messages to the client
                        newUser.save()
                            .then(() => {
                                sendEmail(newUser.email, templates.confirm(newUser._id))
                                    .then(() => res.status(200).json({
                                        msg1: 'User Added!',
                                        msg2: msgs.confirm
                                    }));
                            })
                            .catch(err => res.status(500).json('Error: ' + err));
                    }
                });
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// This is the endpoint that will be hit by the link sent to the user within the
// confirmation email
router.get('/confirmEmail/:id', (req, res, next) => {
    // Extract the 'userId' from the parameters list
    const userId = req.params.id;

    // Find the user in the DinnerTime database based on the 'userId'
    User.findOne({_id: userId})
        .then(user => {
            // If the query does not return anything then the user is not
            // present within the database
            if (user.length < 1) {
                res.status(400).json({msg: msgs.couldNotFind})
            }
            // If the user exists within the database and the email has not been
            // confirmed, then confirm the user's email
            else if (user && !user.emailConfirmed) {
                user.emailConfirmed = true;

                // Save the changes to the user within the database, while also
                // sending back a confirmation message
                user.save()
                    .then(() => res.status(200).json({msg: msgs.confirmed}))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
            // Hitting this statement means the user already confirmed their
            // email
            else {
                res.status(200).json({msg: msgs.alreadyConfirmed})
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpoint is used when login is attempted by the User
router.post('/login', (req, res, next) => {
    // Extract the user's information
    const username = req.body.username;
    const password = req.body.password;

    // First we want to verify if their is a user in the DinnerTime database
    // with that username
    User.find({username: username})
        .then(user => {
            // If username does not exist, they do not have an account
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authorization Unsuccessful'
                });
            }
//             else if (!user[0].emailConfirmed) {
//                 return res.status(401).json({
//                     message: 'Authorization Unsuccessful, confirm email'
//                 });
//             }

            // 'bcrypt.compare' will verify if the password entered by the user
            // and password stored in the database match. It will return true
            // if they match, otherwise it returns false
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authorization Unsuccessful'
                    });
                }

                // Return success if passwords match, then create a jsobwebtoken
                // for the user, otherwise don't
                if (result) {
                    const token = jwt.sign({
                        username: user[0].name,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY, // SECRET key
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Authorization Successful',
                        token: token
                    })
                } else {
                    res.status(401).json({
                        message: 'Authorization Unsuccessful'
                    });
                }
            });
        })
        .catch(err => res.status(500).json('Error: ' + err));
});

// This endpoint finds a specific user in the DinnerTime database using their
// username and adds a Favorite restaurant to their 'favorites' list. It also
// uses the 'checkAuth' middleware to check a client's authorization
router.put('/addFavorite', checkAuth, (req, res, next) => {
    const username = req.body.username;
    // Extract information about said favorite restaurant
    const restaurantName = req.body.restaurantName;
    const restaurantAddress = req.body.restaurantAddress;
    const restaurantPhone = req.body.restaurantPhone;
    const rating = req.body.rating;
    const websiteUrl = req.body.websiteUrl;

    // First find the current user in the DinnerTime database
    User.findOne({username: username})
        // Once the current user is found, insert the restaurant's information
        // into the 'favorites' array
        .then(response => {
            response.favorites.push({
                restaurantName,
                restaurantAddress,
                restaurantPhone,
                rating,
                websiteUrl
            });

            // Save the new entry in the 'favorites' list
            response.save()
                .then(() => res.json('Favorite Restaurant Added'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpoint will return a user's favorites list
router.get('/getFavorites/:id', checkAuth, (req, res, next) => {
    // Extract the 'userId' from the parameters
    const userId = req.params.id;

    // Find the specific user and return their 'favorites' list
    User.findOne({_id: userId})
        .then(response => res.status(200).json(response.favorites))
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpont will delete an entry in the favorites array within the
// DinnerTime database
router.delete('/deleteFavorite/:id', checkAuth, (req, res, next) => {
    // Extract the 'userId' and 'favoriteRestaurantId' from the parameters list.
    // NOTE: The 'userId' should alwasy be sent first in the url followed by the
    // 'favoriteRestaurantId' and they should be separated by a '&'
    const id = req.params.id.split("&");

    // First find the user whose favorite restaurant we have a request to delete
    User.findOne({_id: id[0]})
        .then(response => {
            // If the user is found go in and delete the restaurant from the
            // user's list using the 'favoriteId'
            response.favorites.pop({_id: id[1]})

            // Make sure to save the changes to the database
            response.save()
                .then(() => res.status(200).json('Favorite Restautant Removed'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(500).json('Error: ' + err));
});

// Use this endpoint to add a friend (another user in the database) to the
// given users 'friends' list. It will also check a client's authorization
// using the 'checkAuth' middleware
router.put('/addFriend/:id', checkAuth, (req, res, next) => {
    // Extract the 'userId' and the 'userId' of the friend from the parameters
    // list. NOTE: The 'userId' should always be first in the URL followed by
    // the friends 'userId', and they should be separated by a '&'
    const parameters = req.params.id.split("&");

    // First find the current user in the DinnerTime database
    User.findOne({_id: parameters[0]})
        // Once the current user is found, insert their new friend's information
        // into the user's 'friends' array
        .then(response => {
            response.friends.push(parameters[1]);

            // Save the new entry in the 'friends' list
            response.save()
                .then(() => res.status(200).json('Friend added'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Use this endpoint to extract a specific user's 'friends' list
router.get('/getFriends/:id', checkAuth, (req, res, next) => {
    // Extract the 'userId' from the parameters
    const userId = req.params.id;

    // Find the specific user and return their 'friends' list
    User.findOne({_id: userId})
        .populate('friends', 'username')
        .then(response => res.status(200).json(response.friends))
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpoint will delete a friend from the user's friends list
router.delete('/deleteFriend/:id', checkAuth, (req, res, next) => {
    // Extract the 'userId' and the 'friendsId' from the parameters list.
    // NOTE: The 'userId' should always be first in the URL followed by the
    // 'friendsId', and they should be separated by a '&'
    const parameters = req.params.id.split("&")

    // Find the specific user whose friend is to be removed
    User.findOne({username: parameters[0]})
        .then(response => {
            // Once the user is found, go into the friends array and remove the
            // friend
            response.friends.pop(parameters[1]);

            // Make sure the changes to the database are saved to reflect the
            // new state
            response.save()
                .then(() => res.json('Friend Removed'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpoint is used to add an 'upcomingEvent' to the user's account
router.put('/addupcomingEvent/:id', checkAuth, (req, res, next) => {
    // Extract the 'userId' and the 'eventId' from the parameters list.
    // NOTE: The 'userId' should always be first in the URL followed by the
    // 'eventId', and they should be separated by a '&'
    const parameters = req.params.id.split("&");

    // Find the user using the 'userId'
    User.findOne({_id: parameters[0]})
        .then(response => {
            // Add the 'upcomingEvent'
            response.upcomingEvents.push(parameters[1]);

            // Save the changes to the 'DinnerTime' database
            response.save()
                .then(() => res.status(200).json('Upcoming Event added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpoint will return all of the upcoming events for a specific user
router.get('/getupcomingEvents/:id', checkAuth, (req, res, next) => {
    // Extract the user's 'id' from the paramters
    const userId = req.params.id;

    // Find the specific user's 'upcomingEvents', populate the events info
    // from the 'events' collection and return it in a json package
    User.findOne({_id: userId})
        .populate('upcomingEvents')
        .then(response => res.status(200).json(response.upcomingEvents))
        .catch(err => res.staus(400).json('Error: ' + err));
});

// Use this endpoint to delete an event from from the user's 'upcomingEvent'
router.delete('/deleteupcomingEvent/:id', checkAuth, (req, res, next) => {
    // Extract the 'userId' and the 'eventId' from the parameters list.
    // NOTE: The 'userId' should always be first in the URL followed by the
    // 'eventId', and they should be separated by a '&'
    const parameters = req.params.id.split("&");

    // Find the user using the 'userId'
    User.findOne({_id: parameters[0]})
        .then(response => {
            // Remove the specific upcomingEvent
            response.upcomingEvents.pop(parameters[1]);

            // Save the changes to the 'DinnerTime' database
            response.save()
                .then(() => res.status(200).json('Upcoming Event Removed'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// This endpoint will simply delete a user from the DinnerTime database. This
// endpoint also checks authorization using 'checkAuth'
router.delete('/deleteUser', checkAuth, (req, res, next) => {
    // Simply find the current user's account via their username and delete
    // their account
    User.findOneAndRemove(req.body.username)
        .then(() => res.json('User removed from database'))
        .catch(err => res.json('Error: ' + err));
});

module.exports = router;
