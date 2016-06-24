(function () {
    angular
        .module("Project")
        .service("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            createReview: createReview,
            findReviewById: findReviewById,
            updateReview: updateReview,
            deleteReview: deleteReview
        };
        return api;
        
        function createReview(review) {
            var url = "/rest/review";
            return $http.post(url, review);
        }
        
        function findReviewById(reviewId) {
            var url = "/rest/review/"+reviewId;
            return $http.get(url);
        }

        function updateReview(reviewId, review) {
            var url = "/rest/review/"+reviewId;
            return $http.put(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/rest/review/"+reviewId;
            return $http.delete(url);
        }
    }
})();
