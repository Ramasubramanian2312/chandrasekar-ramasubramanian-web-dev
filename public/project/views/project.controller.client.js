(function () {
    angular
        .module("Project")
        .controller("ProjectController", ProjectController);
    
    function ProjectController($location, $routeParams, SearchService) {
        var vm = this;
        var projectId = $routeParams.projectId;
        
        function init() {
            SearchService
                .findProjectById(projectId)
                .then(
                    function (project) {
                        console.log("Retrieving project details for project id " + projectId);
                        vm.project = project;
                    },
                    function (error) {
                        console.log("Unable to retrieve details for project " + projectId);
                        vm.error = "Unable to retrieve details for project " + projectId;
                    }
                );
        }
        
        init();
    }
})();
