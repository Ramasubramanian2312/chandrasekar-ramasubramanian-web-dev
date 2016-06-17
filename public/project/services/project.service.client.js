(function () {
    angular
        .module("Project")
        .service("ProjectService", ProjectService);

    function ProjectService($http) {
        var api = {
            searchProjects: searchProjects,
            findProjectById: findProjectById
        }

        return api;

        var apiKey = "8vec5mn5udnx";

        function searchProjects(searchTerm) {
            var key = "DONORSCHOOSE";
            // var secret = "e49e05da6e0ed56a";
            var urlBase = "https://api.donorschoose.org/common/json_feed.html?keywords=TEXT&APIKey=API_KEY&callback=JSON_CALLBACK";

            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);

            return $http.jsonp(url);
        }

        function findProjectById(projectId) {
            var urlBase = "https://api.donorschoose.org/common/json_feed.html?id=PROJECT_ID&APIKey=API_KEY&callback=JSON_CALLBACK";

            var url = urlBase
                        .replace("API_KEY", apiKey)
                        .replace("PROJECT_ID", projectId);

            return $http.jsonp(url);
        }
    }

})();
