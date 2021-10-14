//Node js uses Common JS
//CommonJS modules = require / sharing files inside its application.
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

//Since we don't return anything just use require.
require('./models/User');
require('./services/passport');

//Connecting to mongoDB with mongoose
mongoose.connect(keys.mongoURI);
//Generates a single application
//App object to use route handlers and settings.
const app = express();

//Call the approutes from authRoutes with app as argument since used inside.
/* const authRoutes = require('./routes/authRoutes');
authRoutes(app); 
No need of using a variable we call the function required with the app parameter.
*/
require('./routes/authRoutes')(app);
//Dynamically figure out the port to listen to.
//Look at the underline environment to check what port to use otherwise listen to default port.
const PORT = process.env.PORT || 5000;
//App listens to the specified port.
app.listen(PORT);

//http://localhost:5000/
//Heroku link
//https://lit-scrubland-55947.herokuapp.com/
//Deployment target
//https://git.heroku.com/lit-scrubland-55947.git

