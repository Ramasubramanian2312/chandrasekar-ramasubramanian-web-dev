(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidgets = reorderWidgets;

        function init() {
            console.log("Init");
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                });
        }
        init();

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function reorderWidgets(start, end) {
            WidgetService
                .reorderWidgets(vm.pageId, start, end)
                .then(init);
        }
    }
    
})();