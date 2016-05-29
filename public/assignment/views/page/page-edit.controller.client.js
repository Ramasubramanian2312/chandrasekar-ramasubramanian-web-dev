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
            vm.page = angular.copy(PageService.findPageById(vm.pageId));
            console.log(vm.page);
        }
        init();

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else {
                vm.error = "Unable to delete page";
            }
        }

        function updatePage(page) {
            var result = PageService.updatePage(vm.pageId, page);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else {
                vm.error = "Unable to edit page";
            }
        }

    }
})();