module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        findUserByGoogleId: findUserByGoogleId,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsersWithUsername: findAllUsersWithUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findAllUsersWithUsername(usernameList) {
        return User.find({'username': {$in : usernameList}})
    }

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId}, {
                $set: user
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
}
