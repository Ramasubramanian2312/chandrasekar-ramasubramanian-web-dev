(function () {
    angular
        .module("Project")
        .controller("BusinessDetailController", BusinessDetailController);

    function BusinessDetailController(BusinessService, $routeParams) {
        var vm = this;
        var businessId = $routeParams.businessId;

        function init() {
            BusinessService
                .findBusinessById(businessId)
                .then(
                    function (res) {
                        vm.data = res.data;
                    }
                );
        }
        init();
    }
})();
