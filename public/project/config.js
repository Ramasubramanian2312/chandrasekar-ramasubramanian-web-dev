(function () {
    angular
        .module("Project")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkForLogin
                }
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkForLogin
                }
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkForLogin
                }
            })
            .when("/index1", {
                templateUrl: "index1.html"
            })
            .when("/user/", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/admin/", {
                templateUrl: "views/user/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkForAdminLogin
                }
            })
            .when("/user/:username", {
                templateUrl: "views/user/profile-display.view.client.html",
                controller: "ProfileDisplayController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkForLogin
                }
            })
            .when("/search/:category", {
                templateUrl: "views/business/business-list.view.client.html",
                controller: "BusinessListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkForLogin
                }
            })
            .when("/searchTerm/:searchTerm", {
                templateUrl: "views/business/business-list.view.client.html",
                controller: "BusinessListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkForLogin
                }
            })
            .when("/business/:businessId", {
                templateUrl: "views/business/business-detail.view.client.html",
                controller: "BusinessDetailController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkForLogin
                }
            })
            .otherwise({
                redirectTo: "/"
            });

        function checkLoggedIn(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        //console.log(user);
                        if(user == '0'){
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }

        function checkForLogin(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            $rootScope.currentUser = null;
                        } else {
                            $rootScope.currentUser = user;
                        }
                        deferred.resolve();
                    },
                    function (err) {
                        $location.url("/");
                    }
                );

            return deferred.promise;
        }

        function checkForAdminLogin(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        //console.log(user);
                        if(user == '0'){
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            if(user.role === 'admin') {
                                deferred.resolve();
                            }
                            else {
                                deferred.reject();
                                $location.url("/");
                            }
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }
    }
})();
