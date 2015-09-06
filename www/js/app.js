(function() {
  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  var app = angular.module('listr', ['ionic']);

  var listController = app.controller('ListController', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.active_list = {
      "name": "Negative Thinking",
      "children": [
        { "name": "Anger", "hasChildren": false },
        { "name": "Jealousy", "hasChildren": false },
        { "name": "Greed", "hasChildren": false },
        { "name": "Pride", "hasChildren": false },
        { "name": "Ignorance", "hasChildren": false },
      ]
    };

    $scope.url_list = $stateParams.listID ? $stateParams.listID : "Root Lists";
    // console.log('url_list:\t', $scope.url_list);
  }]);


  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'partials/list-display.html',
      controller: 'ListController'
    });

    $stateProvider.state('lists-root', {
      url: '/lists',
      templateUrl: 'partials/list-display.html',
      controller: 'ListController'
    });

    $stateProvider.state('lists-display', {
      url: '/lists/:listID',
      templateUrl: 'partials/list-display.html',
      controller: 'ListController'
    });
  }]);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

})();
