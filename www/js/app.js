// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic'])

//.run(function($ionicPlatform) {
  //$ionicPlatform.ready(function() {
    //if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      //cordova.plugins.Keyboard.disableScroll(true);
    //}
    //if(window.StatusBar) {
      //StatusBar.styleDefault();
    //}
  //});
//})
//***************************************************************************************************************
var FPApp = angular.module("FPApp",["ionic"]);

FPApp.service("FPsvc",["$http","$rootScope",FPsvc]);

FPApp.controller("FPCtrl",["$scope","FPsvc",FPCtrl]);
function FPCtrl($scope,FPsvc)
{
    $scope.blogs = [];
    $scope.$on("FPApp.blogs",function(_,result){
        result.posts.forEach(function(b){
            $scope.blogs.push({
                name:b.author.name,
                avatar_URL: b.author.avatar_URL,
                title: b.title,
                URL : b.URL,
                excerpt: b.excerpt,
                featured_image : b.featured_image
            });
        });
    });
    
    FPsvc.loadBlogs();
}

function FPsvc($http,$rootScope){
 this.loadBlogs = function(){
    $http.get("https://public-api.wordpress.com/rest/v1/freshly-pressed/")
         .success(function(result){
            $rootScope.$broadcast("FPApp.blogs",result);
         });
 }
}

