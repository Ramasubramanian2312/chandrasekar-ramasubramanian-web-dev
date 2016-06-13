module.exports = function (app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        
        pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    console.log(page);
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
        
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    console.log(page);
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;

        pageModel
            .updatePage(id, newPage)
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

    function deletePage(req, res) {
        var id = req.params.pageId;
        
        pageModel
            .deletePage(id)
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