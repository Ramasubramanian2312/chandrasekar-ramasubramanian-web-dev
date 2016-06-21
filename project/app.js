module.exports = function (app, userModel, passport) {
    var models = require("./models/models.server")();

    require("./services/user.service.server")(app, userModel, passport);
    require("./services/business.service.server")(app, models);
};
