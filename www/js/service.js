(function() {
  var srvc = angular.module('listr-srvc', ['pouchdb']);


  // service for retrieving and storing lists
  srvc.factory('lists', ['config', 'pouchDB', function(config, pouchDB) {
    var listService = {};

    var cfg = config.get();
    var dbname = cfg.resources.pouchdb.lists;
    if(!_.isString(dbname)) {
      throw new Error("Received a pouchdb dbname that isn't a string:\t", dbname);
    }
    var db = pouchDB(dbname);

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


  /**
   * Service for retrieving app config
   */
  srvc.factory('config', ['$http', function($http) {
    var CONFIG_URL = '/js/config.json';
    var cfg = {};
    var data;

    $http.get(CONFIG_URL).then(function(response) {
      data = response.data;
    });

    /**
     * Get the lazy-loaded JSON configuration object for this app.
     * @returns {Object}
     */
    cfg.get = function() {
      return data;
    };

    return cfg;
  }]);

})();

