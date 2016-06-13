(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", WamSortable);
    
    function WamSortable() {
        function linker(scope, element, attributes) {
            var myScope = scope;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find(".widget-list")
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event ,ui) {
                        endIndex = ui.item.index();
                        console.log(myScope);
                        myScope.callback({start: startIndex, end: endIndex});
                    }
                });
        }
        
        return {
            templateUrl: "views/widget/widgets.view.client.html",
            scope: {
                model: "=data",
                callback: "&"
            },
            link: linker
        }
    }
})();
