(function () {
    angular
        .module("SupportAClassroom")
        .controller("ProjectDetailController", ProjectDetailController);

    function ProjectDetailController(ProjectService, $routeParams) {
        var vm = this;
        var projectId = $routeParams.projectId;

        function init() {
            ProjectService
                .findProjectById(projectId)
                .then(
                    function (response) {
                        vm.proposal = response.data;
                    }
                );
        }
        init();
    }
})();
