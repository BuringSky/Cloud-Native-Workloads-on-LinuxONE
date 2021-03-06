angular.module('bankController', [])

    .controller('bankUserController', ['$scope', '$http', 'Services', function ($scope, $http, Services) {
        $scope.formData = {};
        $scope.state = window.location.search;
        $scope.existUser = false
        $scope.userData = {};
        $scope.loading = true;
        $scope.products = [{
            id: 1,
            name: '北京'
        }, {
            id: 2,
            name: '上海'
        }, {
            id: 3,
            name: '广州'
        }]
        var tempList = $scope.state.split("&")
        $scope.formData.name = tempList[0].split("=")[1]
        $scope.formData.password = tempList[1].split("=")[1]
        Services.login($scope.formData)
            .success(function (data) {
                $scope.loading = false;
                $scope.userData = data[0];
                if ($scope.userData.length !== 0) {
                    $scope.existUser = true
                } else
                    $scope.existUser = false
            });

        $scope.deposit = function () {
            if ($scope.formData.name != undefined && $scope.formData.password != undefined && $scope.formData.amount != undefined && $scope.formData.name != "" && $scope.formData.password != "") {
                $scope.loading = true;
                Services.deposit($scope.formData)
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.userData = data[0];
                        $scope.formData.amount = 0
                    });
            }
        };

        $scope.withdraw = function () {
            if ($scope.formData.name != undefined && $scope.formData.password != undefined && $scope.formData.amount != undefined) {
                $scope.loading = true;
                Services.withdraw($scope.formData)
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.userData = data[0];
                        $scope.formData.amount = 0
                    });
            }
        };

        $scope.transfer = function () {
            if ($scope.formData.name != undefined && $scope.formData.password != undefined && $scope.formData.amount != undefined && $scope.formData.name != "" && $scope.formData.password != "" && $scope.formData.receiver != undefined && $scope.formData.receiver !== "") {
                $scope.loading = true;
                Services.transfer($scope.formData)
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.userData = data[0];
                        $scope.formData.amount = 0
                        $scope.formData.receiver = ""
                    });
            }
        };

        $scope.buy = function () {
            if ($scope.formData.name != undefined && $scope.formData.password != undefined && $scope.formData.amount != undefined && $scope.formData.name != "" && $scope.formData.password != "" && $scope.formData.product != undefined && $scope.formData.product !== "") {
                $scope.loading = true;
                Services.buy($scope.formData)
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.userData = data[0];
                        $scope.formData.amount = 0
                        $scope.formData.product = ""
                    });
            }
        };
    }]);