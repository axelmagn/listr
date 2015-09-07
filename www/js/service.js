(function() {
  var srvc = angular.module('listr-srvc', ['pouchdb']);

  srvc.constant('config', {
    "resources": {
      "pouchdb": {
        "lists": "listr"
      }
    }
  });


  // service for retrieving and storing lists
  srvc.factory('lists', ['config', 'pouchDB', function(config, pouchDB) {
    var listService = {};

    // get or create lists database
    var dbname = config.resources.pouchdb.lists;
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



})();

