(function() {
  var ctrl = angular.module('listr-ctrl', ['listr-srvc']);

  var listController = ctrl.controller('ListController', ['$scope', '$stateParams', 'lists', 
                                       function($scope, $stateParams, lists) {
    $scope.url_list = $stateParams.listID ? $stateParams.listID : "root";
    $scope.active_list = lists.get($scope.url_list);
    // console.log('url_list:\t', $scope.url_list);
  }]);
})();
