(function () {
    angular
        .module("Project")
        .controller("HomeController", HomeController);

    function HomeController($location, BusinessService, UserService, $rootScope) {
        var vm = this;
        vm.logout = logout;
        vm.findApiAllBusinessByCategory = findApiAllBusinessByCategory;
        vm.findApiAllBusinessByTerm = findApiAllBusinessByTerm;
        
        
        function init() {
            vm.currentUser = $rootScope.currentUser;
            console.log(vm.currentUser);
        }
        
        init();

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

        function findApiAllBusinessByTerm(searchTerm) {
            BusinessService
                .findApiAllBusinessByTerm(searchTerm)
                .then(
                    function (res) {
                        vm.data = res.data;
                        $location.url("/searchTerm/"+searchTerm);
                    },
                    function (error) {
                        vm.error = "Sorry. There are no search results available.";
                    }
                )
        }

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
    }
})();