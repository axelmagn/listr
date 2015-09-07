(function() {
  var srvc = angular.module('listr-srvc', ['pouchdb']);

  srvc.constant('config', {
    "resources": {
      "pouchdb": {
        "lists": "listr"
      }
    }
  });

  srvc.constant('designDoc', {
    _id: '_design/listr',
    views: {
      children: {
        map: function(doc) {
          if(doc.type === "list_item") {
            emit(doc.parent);
          };
        }.toString()
      }
    }
  });

  srvc.constant('dummyDocs', [
    {_id: 'negative_thinking', type: "list_item", name: "Negative Thinking", parent: null },
    {_id: 'anger', type: "list_item", name: "Anger", parent: 'negative_thinking' },
    {_id: 'jealousy', type: "list_item", name: "Jealousy", parent: 'negative_thinking' },
    {_id: 'greed', type: "list_item", name: "Greed", parent: 'negative_thinking' },
    {_id: 'pride', type: "list_item", name: "Pride", parent: 'negative_thinking' },
    {_id: 'ignorance', type: "list_item", name: "Ignorance", parent: 'negative_thinking' },
  ]);

  srvc.constant('rootItem', { name: "Lists" });


  srvc.factory('listrPouchDB', ['config', 'designDoc', 'dummyDocs', 'pouchDB', '$log', 
               function(config, designDoc, dummyDocs, pouchDB, $log) {
    // get or create lists database
    var dbname = config.resources.pouchdb.lists;
    if(!_.isString(dbname)) {
      throw new Error("Received a pouchdb dbname that isn't a string:\t", dbname);
    }
    var db = pouchDB(dbname);

    // save the design document to the database
    // TODO: handle DB that has already been initialized
    db.put(designDoc).then(function() {
      $log.info('Saved Design Doc to PouchDB');
    }).catch(function(err) {
      $log.error('Failed Saving Design Doc to PouchDB:\t', err);
    });

    // save dummy data
    db.bulkDocs(dummyDocs).then(function() {
      $log.info('Saved Dummy Docs to PouchDB');
    }).catch(function(err) {
      $log.error('Failed Saving Dummy Docs to PouchDB:\t', err);
    });


    return db;
  }]);


  // service for retrieving and storing lists
  srvc.factory('lists', ['$log', 'listrPouchDB', 'rootItem', function($log, listrPouchDB, rootItem) {
    var listService = {};

    var db = listrPouchDB;

    /** 
     * method to retrieve a list
     * @return {future}
     */
    listService.get = function(listID) {

      // if listID is null, get root lists
      if(listID === null) {
        var item = rootItem;
        // get list children from ID
        return db.query('listr/children', {
          include_docs: true,
          key: listID
        }).then(function(children) {
          item.children = _.pluck(children.rows, 'doc');
          // $log.debug("Children:\t", children);
          // $log.debug("Root Item:\t", item);
          return item;
        });
      }

      // get list from ID
      return db.get(listID).
        then(function(item) {
          // get list children from ID
          return db.query('listr/children', {
            include_docs: true,
            key: listID
          }).then(function(children) {
            item.children = _.pluck(children.rows, 'doc');
            // $log.debug("Children:\t", children);
            // $log.debug("Item:\t", item);
            return item;
          });
        });
    };

    return listService;
  }]);



})();

