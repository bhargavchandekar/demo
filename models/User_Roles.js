const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User_RolesSchema = new Schema({
    UserID : {type: Schema.ObjectId},
    Roles : [{type: String}],
    CreatedOn: {type: Date}
}, {collection: 'User_Roles'}, {versionKey: false});

let User_Roles = mongoose.model('User_Roles', User_RolesSchema);
module.exports = User_Roles;

