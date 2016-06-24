module.exports = function () {
    var models = {
        //userModel: require("./user/user.model.server")()
        businessModel: require("./business/business.model.server")(),
        reviewModel: require("./review/review.model.server")()
    };
    
    return models;
};
