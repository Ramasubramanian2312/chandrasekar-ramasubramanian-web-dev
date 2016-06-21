module.exports = function () {
    var models = {
        //userModel: require("./user/user.model.server")()
        businessModel: require("./business/business.model.server")()
    };
    
    return models;
};
