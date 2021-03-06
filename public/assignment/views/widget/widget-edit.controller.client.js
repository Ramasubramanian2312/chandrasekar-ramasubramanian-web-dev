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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                    if(vm.widget.size) {
                        vm.widget.size = vm.widget.size + "";
                    }
                });
        }
        init();
        
        function updateWidget(widget, widgetForm) {
            if(widgetForm.$invalid) {
                vm.error = "This form has errors";
                vm.nameError = "Widget should have a name";
            }
            else {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                .then(
                    function (response) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    },
                    function (error) {
                        vm.error = "Unable to update widget";
                    }
                );
            }
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(
                    function (response) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    },
                    function (error) {
                        vm.error = "Unable to delete widget"; 
                    }
                );
        }
    }
})();