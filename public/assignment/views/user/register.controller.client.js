(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, RegisterService) {
        var vm = this;
        vm.registerUser = registerUser

        function registerUser (username, password) {
            
        }
    }
})();
