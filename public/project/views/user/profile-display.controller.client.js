(function () {
    angular
        .module("Project")
        .controller("ProfileDisplayController", ProfileDisplayController);

    function ProfileDisplayController($location, $routeParams, UserService, BusinessService, FollowService, $rootScope) {
        var vm = this;
        var profileUser;
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
                .then(
                    function (response) {
                        vm.profileUser = response.data;
                    }
                );

            console.log(username);

            FollowService
                .findAllFollowersForUser(username)
                .then(
                    function (response) {
                        var followers = response.data;
                        console.log(followers);
                        if(followers.length > 0) {
                            var usernameList = [];
                            for(var i=0; i < followers.length; i++) {
                                usernameList.push(followers[i]._follower);
                            }
                            console.log(usernameList);
                            UserService
                                .findAllUsersWithUsername(usernameList)
                                .then(
                                    function (res) {
                                        vm.followers = res.data;
                                        console.log(vm.followers);
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                )
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
        init();
        
        function followUser(currentUser, profileUser) {
            var newFollower = {
                username: profileUser.username,
                _follower: currentUser.username
            };
            FollowService
                .createFollower(newFollower)
                .then(
                    function (response) {
                        console.log(response.data);
                        init();
                    },
                    function (err) {
                        console.log(err);
                        init();
                    }
                );
        }

        
    }
})();