(function () {
    angular
        .module("SupportAClassroom")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
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
            .when("/user/:userId", {
            templateUrl: "views/user/profile.view.client.html",
            controller: "ProfileController",
            controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();
