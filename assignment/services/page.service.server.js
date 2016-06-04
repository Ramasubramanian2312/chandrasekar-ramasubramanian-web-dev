module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var page = req.body;
        page._id = (new Date()).getTime()+"";
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                res.send(pages[p]);
                return;
            }
        }
        res.send({});
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;
        for(var p in pages) {
            if(pages[p]._id === id) {
                pages[p].name = newPage.name;
                pages[p].title = newPage.title;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === id) {
                pages.splice(p, 1);
                res.send(200)
                return;
            }
        }
        res.send(400);
    }
};