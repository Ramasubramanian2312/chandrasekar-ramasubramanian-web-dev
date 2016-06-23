(function () {
    angular
        .module("Project")
        .controller("BusinessDetailController", BusinessDetailController);

    function BusinessDetailController(BusinessService, UserService, $routeParams, $rootScope, $location) {
        var vm = this;
        vm.logout = logout;
        var businessId = $routeParams.businessId;
        vm.likeBusiness = likeBusiness;
        vm.dislikeBusiness = dislikeBusiness;

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

            if(vm.currentUser) {
                UserService
                    .findUserById(vm.currentUser._id)
                    .then(
                        function (res) {
                            var user = res.data;
                            var businessArray = user.businesses;
                            vm.liked = search(businessId, businessArray);
                            console.log(vm.liked);
                        },
                        function (err) {
                            vm.error = "User not found";
                        }
                    )
            }
        }

        function search(businessId, businessArray) {
            for (var i=0; i < businessArray.length; i++) {
                if (businessArray[i]._id === businessId) {
                    return true;
                }
            }
            return false;
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
                                        vm.liked = true;
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

        function dislikeBusiness(businessId) {
            console.log(businessId);
            var currentUser = $rootScope.currentUser;

            if(currentUser) {
                UserService
                    .findUserById(currentUser._id)
                    .then(
                        function (res) {
                            var user = res.data;
                            user.businesses.splice(user.businesses.indexOf(businessId, 1));

                            UserService
                                .updateUser(user._id, user)
                                .then(
                                    function (stats) {
                                        vm.liked = false;
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

        function removeElement(businessId, businessArray) {
            for(var i=0; i< businessArray.length; i++) {
                if(businessArray[i]._id === businessId) {
                    return businessArray.splice(i, 1);
                }
            }
        }
    }
})();
