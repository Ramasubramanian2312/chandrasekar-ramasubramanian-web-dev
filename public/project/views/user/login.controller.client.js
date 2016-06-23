(function () {
    angular
        .module("Project")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        
        function init() {
            vm.currentUser = $rootScope.currentUser;
            console.log(vm.currentUser);
        }

        init();

        function login(username, password) {
            if(username && password) {
                UserService
                    .login(username, password)
                    .then(
                        function (response) {
                            console.log(response);
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
