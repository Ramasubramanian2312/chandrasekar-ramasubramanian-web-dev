(function () {
    angular
        .module("Project")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            register: register,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            findAllUsersWithUsername: findAllUsersWithUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;
        
        function createUser(user) {
            return $http.post("/rest/user", user);
        }

        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/rest/register", user);
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/rest/login", user);
        }

        function logout() {
            return $http.post("/rest/logout");
        }
        
        function loggedIn() {
            return $http.get("/rest/loggedIn");
        }

        function findUserById(userId) {
            var url = "/rest/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/rest/user?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/rest/user?username="+username+"&password="+password;
            return $http.get(url);
        }
        
        function findAllUsersWithUsername(userNameList) {
            var url = "/rest/getAllUsers";
            return $http.post(url, userNameList);
        }

        function updateUser(userId, user) {
            var url = "/rest/user/"+userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/rest/user/"+userId;
            return $http.delete(url);
        }
    }
})();
