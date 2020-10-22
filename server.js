// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require('./routes/api');
const MONGODB_URI = 'mongodb+srv://ben:ben!@#$%^@cluster0.9qtop.mongodb.net/Cluster0?retryWrites=true&w=majority';
// Step 2
mongoose.connect(MONGODB_URI || 'mongodb+srv://ben:ben!@#$%^@cluster0.9qtop.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({

title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    
    
    }
    

});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));
