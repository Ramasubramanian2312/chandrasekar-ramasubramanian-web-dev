(function () {
    angular
        .module("Project")
        .controller("ProfileDisplayController", ProfileDisplayController);

    function ProfileDisplayController($location, $routeParams, UserService, BusinessService, FollowService, $rootScope) {
        var vm = this;
        var profileUser;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;

        function init() {
            var username = $routeParams.username;
            vm.currentUser = $rootScope.currentUser;
            
            if(vm.currentUser) {
                var id = $rootScope.currentUser._id;
            }
            
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    if(!vm.user) {
                        $location.url("/");
                    }
                    vm.currentUser = $rootScope.currentUser;
                });

            UserService
                .findUserByUsername(username)
                .then(
                    function (response) {
                        vm.profileUser = response.data;
                    }
                );
            // Finding followers
            FollowService
                .findAllFollowersForUser(username)
                .then(
                    function (response) {
                        var followers = response.data;
                        if(followers.length > 0) {
                            var usernameList = [];
                            for(var i=0; i < followers.length; i++) {
                                usernameList.push(followers[i]._follower);
                            }
                            if(usernameList.indexOf(vm.currentUser.username) >= 0) {
                                vm.unfollow = true;
                            }
                            UserService
                                .findAllUsersWithUsername(usernameList)
                                .then(
                                    function (res) {
                                        vm.followers = res.data;
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

            // Finding followings
            FollowService
                .findAllFollowingsForUser(username)
                .then(
                    function (response) {
                        var followings = response.data;
                        if(followings.length > 0) {
                            var usernameList = [];
                            for(var i=0; i < followings.length; i++) {
                                usernameList.push(followings[i].username);
                            }
                            UserService
                                .findAllUsersWithUsername(usernameList)
                                .then(
                                    function (res) {
                                        vm.followings = res.data;
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
                        init();
                    },
                    function (err) {
                        console.log(err);
                        init();
                    }
                );
        }
        
        function unfollowUser(currentUser, profileUser) {
            FollowService
                .deleteFollowerByUsernames(currentUser.username, profileUser.username)
                .then(
                    function (response) {
                        vm.unfollow = false;
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