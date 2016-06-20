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
            .when("/search", {
                templateUrl: "views/business/business-list.view.client.html",
                controller: "BusinessListController",
                controllerAs: "model"
            })
/*            .when("/search/business/:projectId", {
                templateUrl: "views/business/business-detail.view.client.html",
                controller: "ProjectDetailController",
                controllerAs: "model"
            })
            .when("/business/:businessId", {
                templateUrl: "views/business.view.client.html",
                controller: "ProjectController",
                controllerAs: "model"
            })*/
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
