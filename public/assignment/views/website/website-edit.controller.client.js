(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {
                vm.error = "Unable to delete Website";
            }
        }

        function updateWebsite(name, description) {
            var website = {
                name: name,
                description: description
            }
            var result = WebsiteService.updateWebsite(vm.websiteId, website);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            }
            else {
                vm.error = "Unable to edit Website";
            }
        }

    }
})();