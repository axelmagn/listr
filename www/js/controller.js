(function() {
  var ctrl = angular.module('listr-ctrl', ['listr-srvc']);

  var listController = ctrl.controller('ListController', ['$scope', '$stateParams', '$log', 'lists', 
                                       function($scope, $stateParams, $log, lists) {
    var listID = $stateParams.listID ? $stateParams.listID : null;
    $scope.pageTitle = "LOADING";
    lists.get(listID).then(function(list) {
      // $log.debug("List:\t", list);
      $scope.active_list = list;
      $scope.pageTitle = $scope.active_list.name;
    }, function(err) {
      $log.error("Could not retrieve list ", listID, ":\t", err);
    });
    // console.log('url_list:\t', $scope.url_list);
  }]);
})();
