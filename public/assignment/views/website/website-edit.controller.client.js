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
        
        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(
                    function (response) {
                        console.log(response.data);
                        vm.website = response.data;
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }
        init();
        
        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(
                    function (response) {
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function (error) {
                        vm.error = "Unable to delete Website";
                    }
                );
        }

        function updateWebsite(website) {
            if(website.name) {
                WebsiteService
                    .updateWebsite(vm.websiteId, website)
                    .then(
                        function (response) {
                            $location.url("/user/"+vm.userId+"/website");
                        },
                        function (error) {
                            vm.error = "Unable to edit Website";
                        }
                    );
            }
            else {
                vm.error = "Website name cannot be blank"
            }
        }
    }
})();