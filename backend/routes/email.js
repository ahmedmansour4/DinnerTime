const router = require('express').Router();

// Bring in the 'User' schema to be able to query the 'User' collection
const User = require('../models/user.model');

// Bring in all the middleware to help send the confirmation email to the user
const sendEmail = require('./email.send');
const msgs = require('../middleware/email.msgs');
const templates = require('../middleware/email.template');

// This endpoint will send a email to the user upon creation of an account
router.post('/', (req, res, next) => {
    // Extract the email from the body of the request
    const email = req.body.email;

    // Find the user in the DinnerTime database
    User.findOne({email: email})
        .then(user => {
            // Collect info for the confirmation email if the user is in the
            // DinnerTime database and the email has not been confirmed
            if (user && !user.emailConfirmed)
            {
                // Send a conirmation email to the users email with the format
                // specified in 'email.template.js'. Then return a Confirmation
                // message
                sendEmail(user.email, templates.confirm(user._id))
                    .then(() => res.status(200).json({msg: msgs.confirm}));
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

module.exports = router;
