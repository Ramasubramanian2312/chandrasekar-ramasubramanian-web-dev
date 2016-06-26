module.exports = function () {

    var mongoose = require("mongoose");
    var FollowerSchema = require("./follower.schema.server")();
    var Follower = mongoose.model("ProjectFollower", FollowerSchema);

    var api = {
        createFollower: createFollower,
        findAllFollowersForUser: findAllFollowersForUser,
        findAllFollowingsForUser: findAllFollowingsForUser,
        updateFollower: updateFollower,
        deleteFollowerByUsernames: deleteFollowerByUsernames,
        deleteFollower: deleteFollower
    };
    return api;

    function createFollower(follower) {
        return Follower.create(follower);
    }

    function findAllFollowersForUser(username) {
        return Follower.find({username: username});
    }

    function findAllFollowingsForUser(username) {
        return Follower.find({_follower: username});
    }

    function updateFollower(id, follower) {
        delete follower._id;
        return Follower
            .update({_id: id}, {
                $set: follower
            });
    }

    function deleteFollowerByUsernames(username, follower) {
       return Follower
            .remove({username: username, _follower: follower});
    }

    function deleteFollower(id) {
        return Follower.remove({_id: id});
    }
}
