const mongoose = require('mongoose');
const Schema = mongoose.Schema,

ObjectId = Schema.ObjectId;
//nur = Schema.nur;
const myuser = new Schema({
user_name :String,
user_email :String,
user_mobile :String
});
module.exports = mongoose.model('users', myuser);