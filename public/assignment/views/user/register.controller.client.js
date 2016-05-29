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
                    }
                    var user = UserService.createUser(newUser);
                    if(user) {
                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = "User not created";
                    }
                } else {
                    vm.error = "Passwords do not match";
                }
            }
            else {
                vm.error = "Username/password cannot be blank"
            }
        }
    }
})();
