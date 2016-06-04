module.exports = function (app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        website._id = (new Date()).getTime()+"";
        websites.push(website);
        res.send(website);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                res.send(websites[w]);
                return;
            }
        }
        res.send({});
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;
        for(var w in websites) {
            if(websites[w]._id === id) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === id) {
                websites.splice(w, 1);
                res.send(200)
                return;
            }
        }
        res.send(400);
    }
};
