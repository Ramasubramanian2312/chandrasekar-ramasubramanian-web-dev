(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(name, description) {
            var page = {
                name: name,
                description: description
            }
            var newPage = PageService.createPage(vm.wid, page);
            if(newPage) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            }
            else {
                vm.error = "Unable to create page";
            }
        }

    }
})();