(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

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
    }
})();
