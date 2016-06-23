(function () {
    angular
        .module("Project")
        .controller("BusinessDetailController", BusinessDetailController);

    function BusinessDetailController(BusinessService, UserService, $routeParams, $rootScope, $location) {
        var vm = this;
        vm.logout = logout;
        var businessId = $routeParams.businessId;
        vm.likeBusiness = likeBusiness;

        function init() {
            vm.currentUser = $rootScope.currentUser;
            console.log(vm.currentUser);
            
            BusinessService
                .findApiBusinessById(businessId)
                .then(
                    function (res) {
                        vm.data = res.data;
                    }
                );
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }
        
        function likeBusiness(business) {
            var currentUser = $rootScope.currentUser;
            
            if(currentUser) {
                var newBusiness = {
                    _id: business.id,
                    imageUrl: business.image_url,
                    name: business.name,
                    phone: business.phone,
                    ratingUrl: business.rating_img_url
                };

                /*BusinessService
                    .registerBusiness(newBusiness, currentUser._id)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user) {
                                console.log(user);
                            } else {
                                vm.error = "Business not added to user's favourite list";
                            }
                        },
                        function (err) {
                            vm.error = "Business not added to user's favourite list";
                        }
                    );*/

                BusinessService
                    .findBusinessById(business.id)
                    .then(
                        function (response) {
                            var business = response.data;
                            if(!business) {
                                BusinessService
                                    .createBusiness(newBusiness)
                                    .then(
                                        function (res) {
                                            console.log(res.data);
                                        },
                                        function (err) {
                                            console.log(err);
                                        }
                                    );
                            }
                        },
                        function (error) {
                            vm.error = "Error finding business with id";
                        }
                    );
                
                UserService
                    .findUserById(currentUser._id)
                    .then(
                        function (res) {
                            var user = res.data;
                            user.businesses.push(newBusiness);
                            UserService
                                .updateUser(user._id, user)
                                .then(
                                    function (stats) {
                                        console.log(stats);
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );
                        },
                        function (err) {
                            console.log(err);
                        }
                    )

            } else {
                $location.url("/login");
            }

        }
    }
})();
