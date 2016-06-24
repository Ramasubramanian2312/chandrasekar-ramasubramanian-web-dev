(function () {
    angular
        .module("Project")
        .service("BusinessService", BusinessService);

    function BusinessService($http) {
        var api = {
            findApiBusinessById: findApiBusinessById,
            findApiAllBusinessByTerm: findApiAllBusinessByTerm,
            findApiHighestRatedBusinesses: findApiHighestRatedBusinesses,
            findApiAllBusinessByCategory: findApiAllBusinessByCategory,
            createBusiness: createBusiness,
            findBusinessById: findBusinessById,
            registerBusiness: registerBusiness,
            findBusinessByBusinessId: findBusinessByBusinessId,
            findAllBusinessesForUser: findAllBusinessesForUser,
            updateBusiness: updateBusiness
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
        
        function findApiAllBusinessByCategory(category) {
            var url = "/rest/yelp/searchByCategory?category="+category;
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
        
        function findBusinessById(businessId) {
            var url = "/rest/business/"+businessId;
            return $http.get(url);
        }
        
        function registerBusiness(business, userId) {
            var url = "/rest/user/"+userId+"/registerBusiness";
            return $http.post(url, business);
        }
        
        function findAllBusinessesForUser(userID) {
            var url = "/rest/user/"+userID+"/business";
            return $http.get(url);
        }

        function updateBusiness(businessId, business) {
            var url = "/rest/business/"+businessId;
            return $http.put(url, business);
        }
    }
})();
