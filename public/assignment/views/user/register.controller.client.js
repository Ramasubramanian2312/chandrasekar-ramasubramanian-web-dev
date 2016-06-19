(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser (username, password, verifypassword) {
            if(username && password && verifypassword){
                if(password === verifypassword) {
                    var newUser = {
                        username: username,
                        password: password
                    };
                    UserService
                        .register(username, password)
                        .then(
                            function (response) {
                                var user = response.data;
                                if(user) {
                                    $location.url("/user/");
                                } else {
                                    vm.error = "User not created";
                                }
                            },
                            function (err) {
                                vm.error = "User already exists";
                            }
                        );
                } else {
                    vm.error = "Passwords do not match";
                }
            }
        }
    }
})();
