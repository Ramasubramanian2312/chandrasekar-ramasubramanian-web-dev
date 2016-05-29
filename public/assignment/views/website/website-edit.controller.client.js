(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        
        function init() {
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.wid));
        }
        init();
        
        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.uid+"/website");
            }
            else {
                vm.error = "Unable to delete Website";
            }
        }

        function updateWebsite(website) {
            var result = WebsiteService.updateWebsite(vm.wid, website);
            if(result) {
                $location.url("/user/"+vm.uid+"/website");
            }
            else {
                vm.error = "Unable to edit Website";
            }
        }
    }
})();