// nGCreditCard, an Angular module that provides one directive to capture credit card input
// For help on getting started, look in the example folder

'use strict';

angular.module("ngCreditCard", [])
    .controller("CardController", ['$scope', function($scope) {
        if($scope.imageDirectory[$scope.imageDirectory.length-1] != "/")
            $scope.dir = $scope.imageDirectory + "/";
        else
            $scope.dir = $scope.imageDirectory;
        $scope.updateNumber = function() {
            var formattedCard = angular.copy($scope.card).split("");
            for(var i=1;i<4;i++) {
                if(4*i+i-1<formattedCard.length && formattedCard[4*i+i-1] != " ") {
                    formattedCard.splice(4*i+i-1,0," ");
                }
            }
            $scope.card = formattedCard.slice(0,19).join("");
            var ccf2 = $scope.card.substring(0,2);
            var ccf3 = $scope.card.substring(0,3); 
            var ccf4 = $scope.card.substring(0,4);
            if($scope.card.substring(0,1) == "4") 
                $scope.cc_name = "visa";
            else if(ccf2 == "51" || ccf2 == "52" || ccf2 == "53" || ccf2 == "54" || ccf2 == "55") 
                $scope.cc_name = "mastercard";
            else if(ccf2 == "34" || ccf2 == "37")
                $scope.cc_name = "americanexpress";
            else if(ccf4 == "6011")
                $scope.cc_name = "discover";
            else
                $scope.cc_name = "";
        }
    }])
    .directive("ngCreditCard", function() {
        return {
            require: [],
            restrict: 'E',
            controller: 'CardController',
            scope: {
                'card': '=card',
                'cvc': '=cvc',
                'cardHolderName': '=cardHolderName',
                'expMonth': '=expMonth',
                'expYear': '=expYear',
                'imageDirectory': '@imageDirectory'
            },
            template:
                "<div class='creditcard' ng-class='cc_name'>" +
                "<img ng-src='{{dir}}visa.png' ng-show=\"cc_name && cc_name == 'visa'\" class='creditcard-logo visa' />" +
                "<img ng-src='{{dir}}mastercard.png' ng-show=\"cc_name && cc_name == 'mastercard'\" class='creditcard-logo mastercard' />" +
                "<img ng-src='{{dir}}americanexpress.png' ng-show=\"cc_name && cc_name == 'americanexpress'\" class='creditcard-logo americanexpress' />" +
                "<img ng-src='{{dir}}discover.png' ng-show=\"cc_name && cc_name == 'discover'\" class='creditcard-logo discover' />" +
                "<input ng-model='card' ng-change='updateNumber()' class='creditcard-number' type='text' placeholder='&#9679;&#9679;&#9679;&#9679;&nbsp;&#9679;&#9679;&#9679;&#9679;&nbsp;&#9679;&#9679;&#9679;&#9679;&nbsp;&#9679;&#9679;&#9679;&#9679;&nbsp;' maxlength='19' />" +
                "<input ng-model='cvc' class='creditcard-cvc' type='text' placeholder='CVC' maxlength='4' />" +
                "<input ng-model='cardHolderName' class='creditcard-name' type='text' placeholder='John Smith' />" +
                "<input ng-model='expMonth' class='creditcard-exp-month' type='text' placeholder='MM' />" +
                "<input ng-model='expYear' class='creditcard-exp-year' type='text' placeholder='YYYY' maxlength='4' />" +
                "</div>"
        }
    })
