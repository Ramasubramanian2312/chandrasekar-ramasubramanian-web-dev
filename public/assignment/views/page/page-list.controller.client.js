(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.wid = $routeParams.wid;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.userId);
        }
        init();
    }
})();