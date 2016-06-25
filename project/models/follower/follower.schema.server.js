module.exports = function () {
    var mongoose =  require("mongoose");

    var ReviewSchema = mongoose.Schema({
        username: {type: String, required: true},
        content: String,
        rating: Number,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.review"});

    return ReviewSchema;
};