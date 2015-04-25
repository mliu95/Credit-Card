angular.module("Test", ['ngCreditCard'])
  .controller("TestCtrl", ['$scope', function($scope) {
    $scope.cvc = "1234"
  }]);
