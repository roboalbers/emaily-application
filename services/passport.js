const passport = require('passport');
//Only need the Strategy inside passport google oauth20.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//Mongoose used to communicate with MongoDB
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

//Pull a model class from mongoose, with only one argument provided, if two arguments we push something.
const User = mongoose.model('users');

//passport.use is a generic register - tells passport to handle a service.
//Initiate authentication - pass configuration inside the strategy/
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback' // route for user to be send to
		},
		//Callback function we call it accessToken and log it, this will be shown when a user tries to login.
		(accessToken, refreshToken, profile, done) => {
			//Query data in mongoose to check if user is present in the db.
			//Check records after googleId - asyncronous query returns a promise.
			User.findOne({ googleId: profile.id })
				//chain
				//existingUser is a mongoose model instance (one record). check if existingUser
				.then((existingUser) => {
					if (existingUser) {
						//We have a record with the given profile ID
					} else {
						//We don't have a user record with this ID, make a new record.
						//Pass user in callback - this is a user that exists or a new user.
						//Haven't saved anything to the DB yet. we use .save();
						new User({ googleId: profile.id }).save();
					}
				})
				.done
			/*	
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile', profile); 
			*/
		}
	)
);