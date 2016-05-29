(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var website = {
                name: name,
                description: description
            }
            var newWebsite = WebsiteService.createWebsite(vm.uid, website);
            if(newWebsite) {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {
                vm.error = "Unable to create website";
            }
        }

    }
})();