(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.createWidget = createWidget;
        
        function createWidget(widgetType) {
            var widget = {
                widgetType: widgetType
            }
            var newWidget = WidgetService.createWidget(vm.pid, widget);
            if(newWidget) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
            }
        }

    }
})();