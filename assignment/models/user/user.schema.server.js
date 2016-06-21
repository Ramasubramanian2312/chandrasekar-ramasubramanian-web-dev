module.exports = function () {
    var mongoose =  require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        type: {type: String, default: 'developer'},
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
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.user"});

    return UserSchema;
};