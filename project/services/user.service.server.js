var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, models) {

    var userModel = models.userModel;

    app.get("/projectAuth/facebook", passport.authenticate('projectFacebook'));
    app.get('/projectAuth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));
    app.post("/rest/user", createUser);
    app.post("/rest/register", register);
    app.post("/rest/login", passport.authenticate('localProject'), login);
    app.post("/rest/logout", logout);
    app.get("/rest/loggedIn", loggedIn);
    app.get("/rest/user", getUsers);
    app.get("/rest/user/:userId", findUserById);
    app.put("/rest/user/:userId", updateUser);
    app.delete("/rest/user/:userId", deleteUser);

    passport.use('localProject', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.PROJECT_FACEBOOK_CLIENT_ID,
        clientSecret : process.env.PROJECT_FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.PROJECT_FACEBOOK_CALLBACK_URL
    };


    passport.use('projectFacebook', new FacebookStrategy(facebookConfig, facebookLogin));

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (error) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function (user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
        //res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send('0');
        }
    }

    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function (user) {
                    console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        res.status(400).send("Username already in use");
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user) {
                        req.login(user, function (err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if(username && password) {
            findUserByCredentials(username, password, req, res);
        }
        else if(username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function  findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }
}
