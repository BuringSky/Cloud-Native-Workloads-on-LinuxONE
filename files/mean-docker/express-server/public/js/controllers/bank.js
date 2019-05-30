angular.module('bankController', [])

    .controller('bankUserController', ['$scope', '$http', 'Services', function ($scope, $http, Services) {
        $scope.formData = {};
        $scope.state = window.location.search;
        $scope.userData = {};
        $scope.loading = true;
        var tempList = $scope.state.split("&")
        formData.name = tempList[0].split("=")[1]
        formData.password = tempList[1].split("=")[1]

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.login = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.name != undefined && $scope.formData.password != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Services.login($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.userData = data;
                        if ($scope.userData.length !== 0) {
                            window.location.href = "http://baidu.com";
                            $scope.state = "登录成功"
                        } else
                            $scope.state = "登录失败"
                    });

            }

        };
    }]);