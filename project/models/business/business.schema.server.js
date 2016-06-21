module.exports = function () {
    var mongoose =  require("mongoose");

    var BusinessSchema = mongoose.Schema({
        businessId: {type: String, required: true},
        name: String,
        phone: String,
        imageUrl: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.business"});

    return BusinessSchema;
};