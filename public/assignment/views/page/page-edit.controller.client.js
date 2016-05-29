(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.deletePage = deletePage;

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            }
            else {
                vm.error = "Unable to delete page";
            }
        }

    }
})();