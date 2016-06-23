(function () {
    angular
        .module("Project")
        .controller("BusinessListController", BusinessListController);
    
    function BusinessListController($location, BusinessService, $routeParams, $rootScope) {
        var vm = this;
        vm.logout = logout;
        vm.findApiAllBusinessByTerm = findApiAllBusinessByTerm;
        vm.findApiBusinessById = findApiBusinessById;
        vm.findApiAllBusinessByCategory = findApiAllBusinessByCategory;

        var category = $routeParams.category;
        var searchTerm = $routeParams.searchTerm;
        console.log(category);

        function init() {
            vm.currentUser = $rootScope.currentUser;
            console.log(vm.currentUser);
            
            if(category) {
                BusinessService
                    .findApiAllBusinessByCategory(category)
                    .then(
                        function (res) {
                            vm.data = res.data;
                        }
                    );
            }
            
            if(searchTerm) {
                BusinessService
                    .findApiAllBusinessByTerm(searchTerm)
                    .then(
                        function (res) {
                            vm.data = res.data;
                        }
                    );
            }
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }
        
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

        function findApiAllBusinessByCategory(category) {
            BusinessService
                .findApiAllBusinessByCategory(category)
                .then(
                    function (res) {
                        vm.data = res.data;
                        $location.url("/search/"+category);
                    },
                    function (error) {
                        vm.error = "Sorry. There are no search results available.";
                    }
                )
        }
    }
})();
