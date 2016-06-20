(function () {
    angular
        .module("Project")
        .controller("BusinessDetailController", BusinessDetailController);

    function BusinessDetailController(ProjectService, $routeParams) {
        var vm = this;
        var projectId = $routeParams.projectId;

        function init() {
            ProjectService
                .findBusinessById(projectId)
                .then(
                    function (response) {
                        vm.proposal = response.data;
                    }
                );
        }
        init();
    }
})();
