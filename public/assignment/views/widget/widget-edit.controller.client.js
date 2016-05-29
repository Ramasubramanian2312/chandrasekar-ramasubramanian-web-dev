(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.widgetId));
            console.log(vm.widget.widgetType);
        }
        init();
        
        function updateWidget(widget) {
            var result = WidgetService.updateWidget(vm.widgetId, widget);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else {
                vm.error = "Unable to update widget";
            }
        }

        function deleteWidget(widgetId) {
            var result = WidgetService.deleteWidget(widgetId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else {
                vm.error = "Unable to delete widget";
            }
        }
    }
})();