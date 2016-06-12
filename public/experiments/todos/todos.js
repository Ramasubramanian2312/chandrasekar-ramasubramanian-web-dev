(function () {
    angular
        .module("MyDirectives", [])
        .directive("todos", todos);

    function todos() {
        function linker(scope, element, attributes) {
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("tbody")
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function (event ,ui) {
                        endIndex = ui.item.index();
                    }
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
