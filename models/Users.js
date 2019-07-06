const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    FirstName : {type: String},
    MiddleName : {type: String},
    LastName : {type: String},
    UserName: {type: String},
    CreatedOn: {type: Date}
}, {collection: 'Users'}, {versionKey: false});

let Users = mongoose.model('Users', UsersSchema);
module.exports = Users;

