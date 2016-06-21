(function () {
    angular
        .module("Project")
        .service("BusinessService", BusinessService);

    function BusinessService($http) {
        var api = {
            findApiBusinessById: findApiBusinessById,
            findApiAllBusinessByTerm: findApiAllBusinessByTerm,
            findApiHighestRatedBusinesses: findApiHighestRatedBusinesses,
            createBusiness: createBusiness,
            registerBusiness: registerBusiness,
            findBusinessByBusinessId: findBusinessByBusinessId
        };
        return api;

        function findApiBusinessById(businessId) {
            var url = "/rest/yelp/business/"+businessId;
            return $http.get(url);
        }
        
        function findApiAllBusinessByTerm(searchTerm) {
            var url = "/rest/yelp/searchByTerm?term="+searchTerm;
            return $http.get(url);
        }
        
        function findApiHighestRatedBusinesses() {
            var url = "/rest/yelp/searchHighestRated";
            return $http.get(url);
        }
        
        function findBusinessByBusinessId(businessId) {
            var url = "/rest/business/?businessId="+businessId;
            return $http.get(url);
        }
        
        function createBusiness(business) {
            var url = "/rest/business";
            return $http.post(url, business);
        }
        
        function registerBusiness(business) {
            var url = "/rest/registerBusiness";
            return $http.post(url, business);
        }
    }
})();
