module.exports = function () {
    var mongoose =  require("mongoose");

    var BusinessSchema = mongoose.Schema({
        _id: {type: String, required: true},
        name: String,
        phone: String,
        imageUrl: String,
        ratingUrl: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.business"});

    return BusinessSchema;
};