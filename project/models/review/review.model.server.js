module.exports = function () {

    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server")();
    var Review = mongoose.model("ProjectReview", ReviewSchema);

    var api = {
        createReview: createReview,
        //findBusinessByBusinessId: findBusinessByBusinessId,
        findReviewById: findReviewById,
        updateReview: updateReview,
        deleteReview: deleteReview
    };
    return api;

    function createReview(review) {
        return Review.create(review);
    }

/*    function findBusinessByBusinessId(businessId) {
        return Business.findOne({businessId: businessId});
    }*/

    function findReviewById(reviewId) {
        return Review.findById(reviewId);
    }

    function updateReview(id, review) {
        delete review._id;
        return Review
            .update({_id: id}, {
                $set: review
            });
    }

    function deleteReview(id) {
        return Review.remove({_id: id});
    }
}
