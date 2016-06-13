module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


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
                    res.statusCode(404).send(error);
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if(username && password) {
            findUserByCredentials(username, password, res);
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
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
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
                    res.statusCode(404).send(error);
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
                    res.statusCode(404).send(error);
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
                    res.statusCode(404).send(error);
                }
            );
    }
};
