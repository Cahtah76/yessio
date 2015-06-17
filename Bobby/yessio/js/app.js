Parse.initialize("x4a9eMrkBBJwkd8vQpnHS4esqhfsJgWpMwc8qr75", "MFTvdHxvrODxR5JBuKfpHdL1bdtG59K9B1hPiNrK");
 
var app = angular.module('yessio', ['ngRoute'])

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'js/home/home.html',
      }).
      when('/future-employees', {
        templateUrl: 'js/future employees/future-employees.html',
      }).
      when('/dashboardMbl', {
        templateUrl: 'js/dashboard/dashboard.html',
      }).
      when('/daily-agent-dashboardMbl', {
        templateUrl: 'js/daily agent dashboard/daily-agent-dashboard.html',
      }).
      when('/dashboardGpl', {
        templateUrl: 'js/dashboard/dashboardGpl.html',
      }).
      when('/daily-agent-dashboardGpl', {
        templateUrl: 'js/daily agent dashboard/daily-agent-dashboardGpl.html',
      }).      
      when('/message-board', {
        templateUrl: 'js/message board/index.html',
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

app.controller('loginCtrl',['$scope','$location', function($scope, $location) {
  var user = Parse.User.current();
  $scope.currentUser = user;


  $scope.logIn = function(form) {
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to log in: " + error.code + " " + error.message);
      }
    });
      console.log(user.attributes.product);
  };

  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
    $location.replace(); 
    $location.path('/home');
  };
}]);

Parse.initialize("x4a9eMrkBBJwkd8vQpnHS4esqhfsJgWpMwc8qr75", "MFTvdHxvrODxR5JBuKfpHdL1bdtG59K9B1hPiNrK");

var app = angular.module('yessio');

app.controller('mainCtrl', function($scope, parseService){
  //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.
  $scope.getParseData = function(){
    parseService.getData().then(function(results){
      $scope.messages = results
    })
  }

  setInterval(function(){
    $scope.getParseData();
  }, 1000)
  //The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to 
  //your controllers $scope as messages ($scope.messages)

$scope.postData = function(){
  parseService.postData($scope.message)
}

  //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
  //pass that text to the postData method on the parseService object which will then post it to the parse backend.

$scope.formatDate = function(dateString){
  return new Date(dateString).toLocaleString();
}


  //uncomment this code when your getParseData function is finished
  //This goes and gets new data every second, which mimicking a chat room experience.
  // setInterval(function(){
  //   $scope.getParseData();
  // }, 1000)

  
})