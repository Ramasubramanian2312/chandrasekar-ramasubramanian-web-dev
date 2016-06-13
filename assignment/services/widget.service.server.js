module.exports = function (app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/page/:pageId/widget", reorderWidgets);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var userId      = req.body.userId;
        var pageId      = req.body.pageId;
        var websiteId      = req.body.websiteId;
        var width         = req.body.width;
        var myFile        = req.file;

        if(myFile == null) {
            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var newWidget = {
            url: "/uploads/" +filename
        }

        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function (stats) {
                    console.log(stats);
                    res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/" + widgetId);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    console.log(widget);
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var newWidget = req.body;

        widgetModel
            .updateWidget(id, newWidget)
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
    
    function reorderWidgets(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        var pageId = req.params.pageId;
        console.log([start, end]);
        
        widgetModel
            .reorderWidgets(pageId, start, end)
            .then(
                function (res) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;

        widgetModel
            .deleteWidget(id)
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
