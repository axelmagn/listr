(function() {
  var srvc = angular.module('listr-srvc', []);

  var CONFIG_URL = '/js/config.json';

  // service for retrieving and storing lists
  srvc.factory('lists', [function() {
    var listService = {};

    var dummyList = {
      "name": "Negative Thinking",
      "slug": "negative_thinking",
      "children": [
        { "name": "Anger", "hasChildren": false },
        { "name": "Jealousy", "hasChildren": false },
        { "name": "Greed", "hasChildren": false },
        { "name": "Pride", "hasChildren": false },
        { "name": "Ignorance", "hasChildren": false },
      ]
    };

    // method to retrieve a list
    listService.get = function(listID) {
      return dummyList;
    };

    return listService;
  }]);


  srvc.factory('config', ['$http', function($http) {
    var cfg = {};

    /**
     * Get the JSON configuration object for this app.
     * Returns a future of the response object
     * @returns {future}
     */
    cfg.get = function() {
      return $http.get(CONFIG_URL);
    };
  }]);

})();
