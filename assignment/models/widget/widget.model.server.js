module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidgets: reorderWidgets
    };
    return api;
    
    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                }
            );
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }
    
    function updateWidget(widgetId, widget) {
        console.log(widget);
        delete widget._id;
        return Widget
            .update({_id: widgetId}, {
                $set: widget
            });
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidgets(pageId, start, end) {
        var start = parseInt(start);
        var end = parseInt(end);

        console.log(pageId);

        return Widget
            .find({_page: pageId},
                function (err, widgets) {
                widgets.forEach(function (widget) {
                    if(start > end) {
                        if(widget.order >= end && widget.order < start) {
                            widget.order++;
                            widget.save(function () {
                            });
                        } else if (widget.order === start) {
                            widget.order = end;
                            widget.save(function () {
                            });
                        }
                    }
                    else {
                        if(widget.order === start) {
                            widget.order = end;
                            widget.save(function () {
                            });
                        } else if(widget.order > start && widget.order <= end) {
                            widget.order--;
                            widget.save(function () {
                            });
                        }
                    }
                });
            });
    }
}
