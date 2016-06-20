module.exports = function (app) {

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime()+"";
        users.push(user);
        res.send(user);
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
        for(var i in users) {
            if(users[i].username === username) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByCredentials(username, password, res) {
        for(var i in users) {
            if(users[i].username === username && users[i].password === password) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function  findUserById(req, res) {
        var id = req.params.userId;
        for(var i in users) {
            if(users[i]._id === id) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for(var i in users) {
            if(users[i]._id === id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for(var i in users) {
            if(users[i]._id === id) {
                users.splice(i, 1);
                res.send(200)
                return;
            }
        }
        res.send(400);
    }
};
