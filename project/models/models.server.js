module.exports = function () {
    var models = {
        //userModel: require("./user/user.model.server")()
        businessModel: require("./business/business.model.server")(),
        reviewModel: require("./review/review.model.server")(),
        followerModel: require("./follower/follower.model.server")()
    };
    
    return models;
};
