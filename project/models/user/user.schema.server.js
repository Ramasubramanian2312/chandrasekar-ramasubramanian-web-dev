module.exports = function () {
    var mongoose =  require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        type: {type: String, default: 'customer'},
        password: String,
        firstName: String,
        facebook: {
            token: String,
            id: String,
            displayName: String
        },
        lastName: String,
        email: String,
        phone: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.user"});

    return UserSchema;
};