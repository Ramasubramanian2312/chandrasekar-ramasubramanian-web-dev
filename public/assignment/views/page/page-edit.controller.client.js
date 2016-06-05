(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                });
        }
        init();

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(
                    function (response) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function (error) {
                        vm.error = "Unable to delete page";
                    }
                );
        }

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(
                    function (reponse) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function (error) {
                        vm.error = "Unable to edit page";
                    }
                );
        }
    }
})();