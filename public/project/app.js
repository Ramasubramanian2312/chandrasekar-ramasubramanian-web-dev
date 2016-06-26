(function () {
    angular
        .module("Project", ["ngRoute", "ngRating"])
        .controller("MainController", MainController);
    
    function MainController($rootScope, $location, UserService) {
        var vm = this;
        vm.logout = logout;

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
