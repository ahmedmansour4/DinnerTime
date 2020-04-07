const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// The schema for Events in MongoDB database
const eventSchema = new Schema({
    eventOwnerUsername: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    restaurant: {
        type: String,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    timeOfEvent: {
        type: String
    },
    duration: {
        type: Number
    },
    date: {
        type: Date,
        required: true
    }
}, {
    // Automatically creates fields for when it was created and when it was
    // modified
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
