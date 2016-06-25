module.exports = function (app, models) {

    var followerModel = models.followerModel;

    app.post("/rest/follower", createFollower);
    app.get("/rest/follower/:username", findAllFollowersForUser);
    app.put("/rest/follower/:followerId", updateFollower);
    app.delete("/rest/follower/:followerId", deleteFollower);

    function createFollower(req, res) {
        var follower = req.body;

        console.log(follower);

        followerModel
            .createFollower(follower)
            .then(
                function (follower) {
                    res.json(follower);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function findAllFollowersForUser(req, res) {
        var username = req.params.username;
        followerModel
            .findAllFollowersForUser(username)
            .then(
                function (followers) {
                    res.json(followers);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateFollower(req, res) {
        var id = req.params.followerId;
        var newFollower = req.body;

        followerModel
            .updateFollower(id, newFollower)
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

    function deleteFollower(req, res) {
        var id = req.params.followerId;

        followerModel
            .deleteFollower(id)
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
};
