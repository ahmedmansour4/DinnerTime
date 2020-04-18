const express = require('express');
// This allows us to acess something outside of our server from our server
const cors = require('cors');
const mongoose = require('mongoose');
const path = require(“path”);
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MiddleWare
app.use(cors());
app.use(express.json()); // Allows us to parse JSON
app.use(express.static(path.join(__dirname, “client/build”)));
// Setup connection to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Establish connection to the MongoDB database
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Import the files into these variables
const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');

// Use these files
app.use('/events', eventRouter);
app.use('/users', userRouter);

// This will start the server on a certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
