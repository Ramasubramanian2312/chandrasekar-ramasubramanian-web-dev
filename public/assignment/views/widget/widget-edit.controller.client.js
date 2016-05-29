(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.wgid));
            console.log(vm.widget.widgetType);
        }
        init();
        
        function updateWidget(widget) {
            var result = WidgetService.updateWidget(vm.wid, widget);
            if(result) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
            }
            else {
                vm.error = "Unable to update widget";
            }
        }
    }
})();