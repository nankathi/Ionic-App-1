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

FPApp.controller("FPCtrl",["$scope","$sce","$ionicLoading","$ionicListDelegate","FPsvc",FPCtrl]);

function FPCtrl($scope,$sce,$ionicLoading,$ionicListDelegate,FPsvc){
    
    $ionicLoading.show({template: "Loading blogs..."});
    
    $scope.blogs = [];
    
    $scope.params = {};
    
    $scope.$on("FPApp.blogs",function(_,result){
        result.posts.forEach(function(b){
            $scope.blogs.push({
                name:b.author.name,
                avatar_URL: b.author.avatar_URL,
                title: $sce.trustAsHtml(b.title),
                URL : b.URL,
                excerpt: $sce.trustAsHtml(b.excerpt),
                featured_image : b.featured_image
            });
        });
        
        $scope.params.before = result.date_range.oldest;
        $scope.$broadcast("scroll.infiniteScrollComplete");
        $scope.$broadcast("scroll.refreshComplete");
        $ionicLoading.hide(); 
    });
     
    //Infinite scroll
    $scope.loadMore = function(){
        FPsvc.loadBlogs($scope.params);
    } 
    
    $scope.reload = function(){
        $scope.blogs =[];
        $scope.params = {};
        FPsvc.loadBlogs();
    }
    
    $scope.show = function($index){
        cordova.InAppBrowser.open($scope.blogs[$index].URL,'_blank','location=no');
        console.log("show: " + $scope.blogs[$index].URL);
    }
    
    $scope.share = function($index){
        $ionicListDelegate.closeOptionButtons();
        console.log("Share: " + $scope.blogs[$index].URL);
    }
}

function FPsvc($http,$rootScope){
 this.loadBlogs = function(params){
    $http.get("https://public-api.wordpress.com/rest/v1/freshly-pressed/",{params:params})
         .success(function(result){
            $rootScope.$broadcast("FPApp.blogs",result);
         });
    }
}

