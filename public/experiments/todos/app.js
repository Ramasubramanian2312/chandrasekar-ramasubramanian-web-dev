(function () {
    angular
        .module("TodoApp", ["MyDirectives"])
        .controller("TodosController", TodoController);

    function TodoController($http) {
        var vm = this;

        $http.get("/api/todos")
            .then(function (response) {
                vm.data = response.data;
            });
    }
})();
