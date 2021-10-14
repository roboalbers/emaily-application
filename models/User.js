const mongoose = require('mongoose');
//condense variable - destructuring
//const Schema = mongoose.Schema;
//As above, mongoose has a property called Schema - destruct it which means we are telling that we name a variable Schema to be used as mongoose.Schema.
const { Schema } = mongoose;

const userSchema = new Schema({
	//Properties inside database
	googleId: String
});

//users is the collection
//userSchema is the created entry
mongoose.model('users', userSchema);