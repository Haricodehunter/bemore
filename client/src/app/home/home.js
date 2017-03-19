(function() {
  'use strict';

var app = angular.module('home', ['ngMessages']);
  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.home', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'src/app/home/home.tpl.html',
            controller: 'HomeCtrl as home',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      });
  }

  /**
   * @name  HomeCtrl
   * @description Controller
   */
app.controller("HomeCtrl", ['$scope','$rootScope', '$filter', '$timeout', '$http',
'$location',function($scope, $rootScope, $filter, $timeout, $http, $location){
  $scope.tripdata= [];
  $scope.departure;
  $scope.searchResult=[];
  $scope.arrivals;
  $scope.selectedDeparture;
  $scope.selectedArrival;
  $http.get('response.json').
    success(function(data, status, headers, config) {
      $scope.tripdata = data;
       console.log($scope.tripdata);  
        }).
    error(function(data, status, headers, config) {
      // log error
    });
    
    $scope.searchCall = function(trip){
    
             console.log(trip);
             if(trip.selectedradio=="cheapest"){
                 $scope.cheapestDeal(trip);
             }else{
                  $scope.fastestDeal(trip);
             }
    }
  
     $scope.cheapestDeal = function(trip){
      
            $scope.searchResult = $scope.tripdata.deals.filter(function(deals){
               
              return deals.arrival == trip.selectedArrival.arrival && deals.departure == trip.selectedDeparture.departure;
            }).sort(function(a, b){
              console.log(a.cost);
          return (a.cost-(a.cost*a.discount/100)) - (b.cost - (b.cost*b.discount/100));
        });

        
        
    
     }
    
     $scope.fastestDeal =function(trip){
       
           $scope.searchResult = $scope.tripdata.deals.filter(function(deals){
               
              return deals.arrival == trip.selectedArrival.arrival && deals.departure == trip.selectedDeparture.departure;
            }).sort(function(a, b){
          return ((a.duration.h*60)+a.duration.m) - ((b.duration.h*60)+b.duration.m);
        });
       
     }


     
  }]);

  
    app.config(config);
    
})();
