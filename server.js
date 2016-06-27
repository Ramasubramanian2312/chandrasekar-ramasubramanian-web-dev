var express = require('express');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var assignmentUserModel = require("./assignment/models/user/user.model.server")();
var projectUserModel = require("./project/models/user/user.model.server")();
var securityService = require("./security/security.js")(assignmentUserModel, projectUserModel);
var passport = securityService.getPassport();

var assignment = require("./assignment/app.js");
assignment(app, assignmentUserModel, passport);

var project = require("./project/app.js");
project(app, projectUserModel, passport);

require("./experiments/todos")(app);

app.listen(port, ipaddress);
