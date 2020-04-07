const router = require('express').Router();

// Pull in the middleware that will be used to check the authorization of the
// user
const checkAuth = require('../middleware/check-auth');

// Pull in the 'Event' and 'User' schemas
let Event = require('../models/event.model');
let User = require('../models/user.model');

// This endpoint will return all of the events within the DinnerTime database
router.get('/', checkAuth, (req, res, next) => {
    // Use the 'Event' model to query the database and find all events within
    // the database
    Event.find()
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' +  err));
});

// Use this endpoint to create and add an event to the DinnerTime database
router.post('/addEvent/', checkAuth, (req, res, next) => {
    // Extract the all of the event info from the body of the request
    const eventOwnerUsername = req.body.eventOwnerUsername;
    const description = req.body.description;
    const restaurant = req.body.restaurant;
    const attendees = req.body.attendees;
    const timeOfEvent = req.body.timeOfEvent;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);

    // Create a new event using the 'Event' model schema
    const newEvent = new Event({
        eventOwnerUsername,
        description,
        restaurant,
        attendees,
        timeOfEvent,
        duration,
        date,
    });

    // Finally save the new event to the database
    newEvent.save()
        .then(() => res.status(200).json('Event Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/addAttendee/:id', (req, res, next) => {
    const parameters = req.params.id.spli("&");

    Event.findOne({_id: parameters[1]})
        .then(response => {
            response.attendees.push(parameters[0]);

            response.save()
                .then(() => res.status(200).json('Attendee added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Use this endpoint to update a desired event
router.post('/updateEvent/:id', checkAuth, (req, res, next) => {
    // Extract the eventId from the the url
    const eventId = req.params.id;

    // Find the event that we want to update using the 'eventId'
    Event.findOne({_id: eventId})
        .then(response => {
            // If the length of the array is less than 1, then the event does
            // not exist or no longer exists within the database
            if (response.length < 1){
                return res.status(500).json('Did not find Event');
            } else {
                if (req.body.description) {
                    response.description = req.body.description;
                }

                if (req.body.restaurant) {
                    response.restaurant = req.body.restaurant;
                }

                if (req.body.attendees) {
                    response.attendees = req.body.attendees;
                }

                if (req.body.timOfEvent) {
                    response.timeOfEvent = req.body.duration;
                }

                if (req.body.duration) {
                    response.duration = req.body.duration;
                }

                if (Date.parse(req.body.date)) {
                    response.date = Date.parse(req.body.date);
                }

                // Save the updated event to the database
                response.save()
                    .then(() => res.status(200).json('Event updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Use this endpoint to find an event with a specific 'eventId'
router.get('/findEvent/:id', checkAuth, (req, res, next) => {
    // Query the database for the event
    Event.findById(req.params.id)
        .populate('attendees', 'name')
        // Once the event is found, return it in a json package
        .then(response => res.status(200).json(response))
        .catch(err => res.staus(400).json('Error: ' + err));
});

// This endpoint will delete an event from the DinnerTime database
router.delete('/deleteEvent/:id', checkAuth, (req, res, next) => {
    // Extract the 'eventId' from the url
    const eventId = req.params.id;

    // Simply find by the 'eventId' and remove it from the database
    Event.findByIdAndRemove(eventId)
        .then(() => res.status(200).json('Event Removed'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
