(function () {
    angular
        .module("Project")
        .service("BusinessService", BusinessService);

    function BusinessService($http) {
        var api = {
/*            search: search,
            searchProjects: searchProjects,*/
            findBusinessById: findBusinessById,
            findAllBusinessByTerm: findAllBusinessByTerm
        }

        return api;

/*        var apiKey = "8vec5mn5udnx";

        function searchProjects(searchTerm) {
            var key = "DONORSCHOOSE";
            // var secret = "e49e05da6e0ed56a";
            var urlBase = "https://api.donorschoose.org/common/json_feed.html?keywords=TEXT&APIKey=API_KEY&callback=JSON_CALLBACK";

            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);

            return $http.jsonp(url);
        }

        function search() {
            return $http.get("/yelp/search");
        }*/

        function findBusinessById(businessId) {
            var url = "/yelp/api/business/"+businessId;
            return $http.get(url);
        }
        
        function findAllBusinessByTerm(searchTerm) {
            var url = "/yelp/api/searchByTerm?term="+searchTerm;
            return $http.get(url);
        }
    }

})();
