const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    username: String,
    password: String,
});

const Users = mongoose.model('users', userSchema, "users")

module.exports = Users;