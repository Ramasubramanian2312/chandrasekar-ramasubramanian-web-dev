(function () {
    angular
        .module("Project")
        .controller("BusinessListController", BusinessListController);
    
    function BusinessListController($location, BusinessService) {
        var vm = this;
        vm.findApiAllBusinessByTerm = findApiAllBusinessByTerm;
        vm.findApiBusinessById = findApiBusinessById;

        function init() {
            BusinessService
                .findApiHighestRatedBusinesses()
                .then(
                    function (res) {
                        vm.data = res.data;
                    }
                );
        }

        init();
        
        function findApiAllBusinessByTerm(searchTerm) {
            BusinessService
                .findApiAllBusinessByTerm(searchTerm)
                .then(
                    function (res) {
                        vm.data = res.data;
                    },
                    function (error) {
                        vm.error = "Sorry. There are no search results available.";
                    }
                )
        }

        function findApiBusinessById(businessId) {
            BusinessService
                .findApiBusinessById(businessId)
                .then(
                    function (res) {
                        vm.data = res.data;
                        $location.url("/business/"+businessId);
                    },
                    function (err) {
                        vm.error = "Sorry! We could not find a business matching the Id";
                    }
                )
        }

/*
        function search() {
            ProjectService
                .search()
                .then(
                    function (response) {
                        console.log(response.data);
                        vm.data = response.data;
                    }
                );
        }
        
        function searchProjectById(projectId) {
            $location.url("/business/"+projectId);
        }*/
    }
})();
