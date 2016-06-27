(function () {
    angular
        .module("Project")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;
        
        function init() {
            vm.currentUser = $rootScope.currentUser;
        }

        init();

        function login(username, password) {
            if(username && password) {
                UserService
                    .login(username, password)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user) {
                                $location.url("/user/");
                            } else {
                                vm.error = "User not found";
                            }
                        },
                        function (err) {
                            vm.error = "User not found";
                        }
                    );
            }
        }
    }
})();
