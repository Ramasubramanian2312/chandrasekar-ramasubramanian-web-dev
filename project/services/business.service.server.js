module.exports = function (app, models) {

    var businessModel = models.businessModel;
    var Yelp = require('yelp');

    var yelp = new Yelp({
        consumer_key: process.env.YELP_CONSUMER_KEY,
        consumer_secret: process.env.YELP_CONSUMER_SECRET,
        token: process.env.YELP_TOKEN,
        token_secret: process.env.YELP_TOKEN_SECRET,
    });

    app.post("/rest/business", createBusiness);
    app.post("/rest/registerBusiness", registerBusiness);
    app.get("/rest/business", getBusinesses);
    app.get("/rest/business/:businessId", findBusinessById);
    app.put("/rest/business/:businessId", updateBusiness);
    app.delete("/rest/business/:businessId", deleteBusiness);

    // Services to interact with the Yelp API.
    app.get("/rest/yelp/searchHighestRated", findApiHighestRatedBusinesses);
    app.get("/rest/yelp/searchByTerm", findApiAllBusinessByTerm);
    app.get("/rest/yelp/business/:businessId", findApiBusinessById);

    function createBusiness(req, res) {
        var business = req.body;

        businessModel
            .createBusiness(business)
            .then(
                function (business) {
                    res.json(business);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }
    
    function registerBusiness(req, res) {
        var businessId = req.body.businessId;

        businessModel
            .findBusinessByBusinessId(businessId)
            .then(
                function (business) {
                    if(business) {
                        res.json(business);
                    } else {
                        return businessModel
                            .createBusiness(req.body);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (business) {
                    if(business) {
                        res.json(business);
                    } else {
                        res.status(400).send(err);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getBusinesses(req, res) {
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
    }

    function findBusinessById(req, res) {
        var id = req.params.businessId;
        businessModel
            .findBusinessById(id)
            .then(
                function (business) {
                    res.send(business);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function updateBusiness(req, res) {
        var id = req.params.businessId;
        var newBusiness = req.body;

        businessModel
            .updateBusiness(id, newBusiness)
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

    function deleteBusiness(req, res) {
        var id = req.params.businessId;

        businessModel
            .deleteBusiness(id)
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

    // API Service implementations.
    function findApiHighestRatedBusinesses(req, res) {
        yelp
            .search({location: 'Boston', sort: 2, limit: 15})
            .then(
                function (data) {
                    res.send(data);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    
    function findApiAllBusinessByTerm(req, res) {
        var searchTerm = req.query.term;

        var parameters = {
            term: searchTerm,
            location: 'Boston',
            limit: 15
        };

        yelp
            .search(parameters)
            .then(
                function (data) {
                    res.send(data);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findApiBusinessById(req, res) {
        var businessId = req.params.businessId;

        yelp
            .business(businessId)
            .then(
                function(business) {
                    console.log(business);
                    res.send(business);
                },
                function(err) {
                    res.status(400).send(error);
                }
            );
    }
};
