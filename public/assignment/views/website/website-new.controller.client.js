(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description, websiteForm) {
            if(websiteForm.$invalid) {
                vm.error = "This form has errors";
                vm.nameError = "Website should have a name";
            } else {
                var website = {
                    name: name,
                    description: description
                }
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(function (response) {
                        var newWebsite = response.data;
                        if(newWebsite._id) {
                            $location.url("/user/"+vm.userId+"/website");
                        }
                        else {
                            vm.error = "Unable to create website";
                        }
                    });
            }
        }
    }
})();