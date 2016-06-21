(function () {
    angular
        .module("Project")
        .controller("BusinessDetailController", BusinessDetailController);

    function BusinessDetailController(BusinessService, UserService, $routeParams, $rootScope, $location) {
        var vm = this;
        var businessId = $routeParams.businessId;
        var currentUser = $rootScope.currentUser;
        vm.likeBusiness = likeBusiness;

        function init() {
            BusinessService
                .findApiBusinessById(businessId)
                .then(
                    function (res) {
                        vm.data = res.data;
                    }
                );
        }
        init();
        
        function likeBusiness(business) {
            if(currentUser) {
                var newBusiness = {
                    businessId: business.id,
                    name: business.name,
                    phone: business.phone,
                    imageUrl: business.imageUrl
                };

                var id;

                BusinessService
                    .registerBusiness(newBusiness)
                    .then(
                        function (response) {
                            var business = response.data;
                            if(business) {
                                id = business._id;
                                console.log(id);
                                /*UserService
                                    .findUserById(currentUser._id)
                                    .then(
                                        function (user) {
                                            user.businesses.push(business);
                                            UserService
                                                .update
                                            userModel.save({});
                                        },
                                        function (err) {
                                            vm.error = "User not found to add like.";
                                        }
                                    )*/
                            } else {
                                vm.error = "Business domain not created";
                            }
                        },
                        function (err) {
                            vm.error = "Business already exists";
                        }
                    );

            } else {
                $location.url("/login");
            }

        }
    }
})();
