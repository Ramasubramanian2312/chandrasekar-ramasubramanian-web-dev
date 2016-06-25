(function () {
    angular
        .module("Project")
        .controller("ProfileDisplayController", ProfileDisplayController);

    function ProfileDisplayController($location, $routeParams, UserService, BusinessService, $rootScope) {
        var vm = this;
        vm.followUser = followUser;

        function init() {
            var username = $routeParams.username;
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

            UserService
                .findUserByUsername(username)
                .then(function (response) {
                    vm.profileUser = response.data;
                });
        }
        init();
        
        function followUser(currentUser, profileUser) {
            
        }

        
    }
})();