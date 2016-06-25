(function () {
    angular
        .module("Project")
        .service("FollowService", FollowService);

    function FollowService($http) {
        var api = {
            createFollower: createFollower,
            findAllFollowersForUser: findAllFollowersForUser,
            updateFollower: updateFollower,
            deleteFollower: deleteFollower
        };
        return api;
        
        function createFollower(follower) {
            var url = "/rest/follower";
            return $http.post(url, follower);
        }
        
        function findAllFollowersForUser(username) {
            var url = "/rest/follower/"+username;
            return $http.get(url);
        }

        function updateFollower(followerId, follower) {
            var url = "/rest/follower/"+followerId;
            return $http.put(url, follower);
        }

        function deleteFollower(followerId) {
            var url = "/rest/follower/"+followerId;
            return $http.delete(url);
        }
    }
})();
