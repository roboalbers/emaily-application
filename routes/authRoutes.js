const passport = require('passport');

//Export this function to use app in index.js
module.exports = app => {
	//Routing to redirect to authenticate
	//Tell express to involve passport on this route
	app.get('/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	//The GoogleStrategy has internal usage of the string 'google' which uses methods we don't see.
	app.get('/auth/google/callback', passport.authenticate('google'));
}

/* //App represent the express server
Test route
app.get('/', (req, res) => {
	res.send({ bye: 'buddy new' });
}); */