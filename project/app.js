module.exports = function (app, userModel, passport) {
    var models = require("./models/models.server")();

    require("./services/user.service.server")(app, userModel, passport);
    require("./services/business.service.server")(app, models, userModel);
    require("./services/review.service.server")(app, models);
    require("./services/follower.service.server")(app, models);
};
