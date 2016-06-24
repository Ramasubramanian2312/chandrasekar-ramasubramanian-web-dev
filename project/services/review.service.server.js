module.exports = function (app, models) {

    var reviewModel = models.reviewModel;

    app.post("/rest/review", createReview);
    //app.get("/rest/business", getBusinesses);
    app.get("/rest/review/:reviewId", findReviewById);
    //app.get("/rest/user/:userId/business", findAllBusinessesForUser);
    app.put("/rest/review/:reviewId", updateReview);
    app.delete("/rest/review/:reviewId", deleteReview);

    function createReview(req, res) {
        var review = req.body;

        reviewModel
            .createReview(review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

/*    function getBusinesses(req, res) {
        var businessId = req.query['businessId'];

        findBusinessByBusinessId(businessId, res);
    }

    function findBusinessByBusinessId(businessId, res) {
        businessModel
            .findBusinessByBusinessId(businessId)
            .then(
                function (business) {
                    res.json(business);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }*/

    function findReviewById(req, res) {
        var id = req.params.reviewId;
        reviewModel
            .findReviewById(id)
            .then(
                function (review) {
                    res.send(review);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

/*    function findAllBusinessesForUser(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user.businesses);
                }
            );
    }*/

    function updateReview(req, res) {
        var id = req.params.reviewId;
        var newReview = req.body;

        reviewModel
            .updateReview(id, newReview)
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

    function deleteReview(req, res) {
        var id = req.params.reviewId;

        reviewModel
            .deleteReview(id)
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
