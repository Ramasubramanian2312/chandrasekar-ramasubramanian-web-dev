(function () {
    angular
        .module("MyDirectives", [])
        .directive("todos", todos);

    function todos() {
        function linker(scope, element, attributes) {
            $(element)
                .find("tbody")
                .sortable({
                    axis: 'y'
                });
        }
        return {
            templateUrl: "todos.html",
            scope: {
                data: "="
            },
            link: linker
        }
    }
})();
