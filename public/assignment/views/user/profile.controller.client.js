(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.userId;
        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = angular.copy(response.data);
                });
        }
        init();

        function updateUser(newUser) {
            var result = UserService.updateUser(id, newUser);
            if(result) {
                vm.success = "Success! Your Profile was saved.";
            }
            else {
                vm.error = "Error updating profile";
            }
        }
    }
})();
