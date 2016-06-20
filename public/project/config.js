(function () {
    angular
        .module("Project")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/search", {
                templateUrl: "views/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/search/project/:projectId", {
                templateUrl: "views/project/project-detail.view.client.html",
                controller: "ProjectDetailController",
                controllerAs: "model"
            })
            .when("/project/:projectId", {
                templateUrl: "views/project.view.client.html",
                controller: "ProjectController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });

        function checkLoggedIn(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
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
    }
})();
