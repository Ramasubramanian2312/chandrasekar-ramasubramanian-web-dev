module.exports = function (app) {
    require("./services/user.service.server")(app);
    require("./services/business.service.server")(app);
};
