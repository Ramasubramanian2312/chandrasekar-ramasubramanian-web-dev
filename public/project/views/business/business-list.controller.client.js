(function () {
    angular
        .module("Project")
        .controller("BusinessListController", BusinessListController);
    
    function BusinessListController($location, BusinessService) {
        var vm = this;
        vm.findAllBusinessByTerm = findAllBusinessByTerm;
        vm.findBusinessById = findBusinessById;

        function init() {
            BusinessService
                .findHighestRatedBusinesses()
                .then(
                    function (res) {
                        vm.data = res.data;
                    }
                );
        }

        init();
        
        function findAllBusinessByTerm(searchTerm) {
            BusinessService
                .findAllBusinessByTerm(searchTerm)
                .then(
                    function (res) {
                        vm.data = res.data;
                    },
                    function (error) {
                        vm.error = "Sorry. There are no search results available.";
                    }
                )
        }

        function findBusinessById(businessId) {
            BusinessService
                .findBusinessById(businessId)
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
