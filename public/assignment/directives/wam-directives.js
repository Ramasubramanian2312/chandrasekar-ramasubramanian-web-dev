(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", WamSortable);
    
    function WamSortable() {
        function linker(scope, element, attributes) {
            $(element)
                .find(".widget-list")
                .sortable({
                    axis: 'y'
                });
        }
        
        return {
            templateUrl: "directives/widgets.view.client.html",
            scope: {
                model: "=data"
            },
            link: linker
        }
    }
})();
