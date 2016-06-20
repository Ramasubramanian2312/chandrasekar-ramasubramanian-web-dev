module.exports = function (app) {
    var merge = require('merge');
    var Yelp = require('yelp');

    var yelp = new Yelp({
        consumer_key: process.env.YELP_CONSUMER_KEY,
        consumer_secret: process.env.YELP_CONSUMER_SECRET,
        token: process.env.YELP_TOKEN,
        token_secret: process.env.YELP_TOKEN_SECRET,
    });

    app.get("/yelp/api/searchByTerm/", findAllBusinessByTerm);
    app.get("/yelp/api/business/:businessId", findBusinessById);

    function findBusinessById(req, res) {
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
    
    function findAllBusinessByTerm(req, res) {
        var searchTerm = req.query.term;

        var parameters = {
            term: searchTerm,
            location: 'Boston',
            limit: 10
        };

        yelp
            .search(parameters)
            .then(
                function (data) {
                    res.send(data);
                },
                function (err) {
                    res.status(400).send(error);
                }
            );
    }
};
