module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
    }

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateuser);
    app.delete("/api/user/:userId", deleteUser);

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

    function updateuser(req, res) {
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

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime()+"";
        users.push(user);
        res.send(user);
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

    function findUserByCredentials(username, password, res) {
        for(var i in users) {
            if(users[i].username === username && users[i].password === password) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
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
};
