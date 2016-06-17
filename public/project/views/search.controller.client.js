(function () {
    angular
        .module("Project")
        .controller("SearchController", SearchController);
    
    function SearchController($location, SearchService) {
        var vm = this;
        
        vm.searchProjects = searchProjects;
        vm.searchProjectById = searchProjectById;
        
        function searchProjects(searchTerm) {
            SearchService
                .searchProjects(searchTerm)
                .then(
                    function (res) {
                        vm.data = res.data;
                    },
                    function (error) {
                        vm.error = "Search criteria entered does not match any projects";
                    }
                )
        }
        
        function searchProjectById(projectId) {
            $location.url("/project/"+projectId);
        }
    }
})();
