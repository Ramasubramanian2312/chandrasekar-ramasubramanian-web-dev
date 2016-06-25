/*var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;*/
/*var FacebookStrategy = require('passport-facebook').Strategy;*/
var bcrypt = require("bcrypt-nodejs");

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (app, userModel, passport) {

    // var userModel = models.userModel;
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/rest/uploads", upload.single('myFile'), uploadImage);
/*    app.get("/projectAuth/facebook", passport.authenticate('projectFacebook'));
    app.get('/projectAuth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));*/
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));
    app.post("/rest/user", createUser);
    app.post("/rest/register", register);
    app.post("/rest/login", passport.authenticate('project'), login);
    app.post("/rest/logout", logout);
    app.get("/rest/loggedIn", loggedIn);
    app.get("/rest/user", getUsers);
    app.post("/rest/getAllUsers", findAllUsersWithUsername);
    app.get("/rest/user/:userId", findUserById);
    app.put("/rest/user/:userId", updateUser);
    app.delete("/rest/user/:userId", deleteUser);

/*    passport.use('localProject', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);*/

/*    var facebookConfig = {
        clientID     : process.env.PROJECT_FACEBOOK_CLIENT_ID,
        clientSecret : process.env.PROJECT_FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.PROJECT_FACEBOOK_CALLBACK_URL
    };*/

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };


    //passport.use('projectFacebook', new FacebookStrategy(facebookConfig, facebookLogin));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    
    function uploadImage(req, res) {
        var userId      = req.body.userId;
        var width         = req.body.width;
        var myFile        = req.file;

        if(myFile == null) {
            res.redirect("/project/#/user/");
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var newUser = {
            url: "/uploads/" +filename
        };

        userModel
            .updateUser(userId, newUser)
            .then(
                function (stats) {
                    console.log(stats);
                    res.redirect("/project/#/user/");
                },
                function (error) {
                    res.status(404).send(error);
                }
            );

    }
    
/*    function localStrategy(username, password, done) {
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
    }*/

/*    function facebookLogin(token, refreshToken, profile, done) {
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
    }*/

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
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
    
    function findAllUsersWithUsername(req, res) {
        var usernameList = req.body;
        
        userModel
            .findAllUsersWithUsername(usernameList)
            .then(
                function (users) {
                    res.json(users)
                },
                function (err) {
                    res.status(404).send(error);
                }
            )
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
