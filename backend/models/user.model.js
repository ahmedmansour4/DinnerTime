const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
    restaurantName: {
        type: String,
        required: true
    },
    restaurantAddress: {
        type: String,
        required: true
    },
    restaurantPhone: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0
    },
    websiteUrl: {
        type: String,
        default: ''
    }
});

// The Schema for user accounts in the MongoDB database
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Trims whitespace off the end
        minlength: 3 // Requires a minimum lenght of 3 characters
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },

    favorites: [favoritesSchema],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    upcomingEvents: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, {
    // Automatically create fields for when it was created and when it was
    // modified
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
