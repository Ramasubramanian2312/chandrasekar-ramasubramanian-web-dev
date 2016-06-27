(function () {
    angular
        .module("Project")
        .controller("AdminController", AdminController)
        .filter('reverse', function() {
            return function(items) {
                return items.slice().reverse();
            };
        });

    function AdminController($location, UserService, $rootScope, $http) {
        var vm = this;
        vm.logout = logout;
        vm.createUser = createUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.populate = populate;

        function init() {
            vm.currentUser = $rootScope.currentUser;
            findAllUsers();
        }

        init();

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

        function createUser(user) {
            vm.user = "";
            var obj = {
                username: user.username,
                password: user.password,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastname,
                email: user.email,
                phone: user.phone
            };
            $http.post("/rest/register", obj)
                .then(
                    findAllUsers,
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function deleteUser(user) {
            if(user.role != 'admin') {
                $http.delete("/rest/user/" + user._id)
                    .then(
                        findAllUsers,
                        function(err) {
                            vm.error = err;
                        }
                    );
            }
            else {
                vm.error = "Cannot delete admin";
            }
        }

        function updateUser(user) {
            delete user.password
            $http.put("/rest/user/" + user._id, user)
                .then(
                    function (res) {
                        vm.user = {};
                        findAllUsers();
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function populate(user) {
            vm.user = angular.copy(user);
        }

        function findAllUsers() {
            $http.get("/rest/user")
                .then(
                    function(response) {
                        vm.users = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();
