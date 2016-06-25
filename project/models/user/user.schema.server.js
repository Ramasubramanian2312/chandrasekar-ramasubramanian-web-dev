module.exports = function () {
    var mongoose =  require("mongoose");
    var BusinessSchema = require("../business/business.schema.server")();

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        type: {type: String, default: 'customer'},
        role: {type: String, default: 'user'},
        password: String,
        firstName: String,
        google: {
            token: String,
            id: String,
            displayName: String
        },
        businesses: [BusinessSchema],
        lastName: String,
        email: String,
        phone: String,
        company: String,
        url: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.user"});

    return UserSchema;
};