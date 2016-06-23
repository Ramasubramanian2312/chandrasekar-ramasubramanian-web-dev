(function () {
    angular
        .module("Project")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, BusinessService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        function init() {
            vm.currentUser = $rootScope.currentUser;
            console.log(vm.currentUser);
            
            if(vm.currentUser) {
                var id = $rootScope.currentUser._id;
            }
            
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    vm.currentUser = $rootScope.currentUser;
                });
        }
        init();

        function unregister() {
            UserService
                .deleteUser(vm.currentUser._id)
                .then(
                    function () {
                        $location.url("/login");
                    },
                    function () {
                        vm.error = "Unable to remove user";
                    }
                );
        }

        function updateUser(newUser) {
            UserService
                .updateUser(vm.currentUser._id, newUser)
                .then(
                    function (response) {
                        vm.success = "Your Profile was saved.";
                    },
                    function (error) {
                        vm.error = "Error updating profile";
                    });
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