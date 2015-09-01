// Ionic Starter App


/*
   var ListItem = function(name, description) {
   this.type = "ListItem";
   this.name = name;
   this.description = description;
   this.children = [];
   }


   ListItem.prototype.push = function(child) {
   if(child.type !== "ListItem") {
   throw new Error("Wrong Child Type");
   }
   this.children.push(child);
   }
   */

var ListItem = function(name, description) {
  var type = "ListItem";
  var name = name;
  var description = description;
  var children = [];
  return {
    "push": function(child) {
      if(child.type !== "ListItem") {
        throw new Error("Wrong Child Type");
      }
      children.push(child);
    }
  }
};

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('listr', ['ionic'])

.controller('ListController', function() {
  this.rootList = new ListItem("The Five Negative Thinkings", "TODO");
  this.rootList.push(new ListItem("Anger", "TODO"));
  this.rootList.push(new ListItem("Jealousy", "TODO"));
  this.rootList.push(new ListItem("Greed", "TODO"));
  this.rootList.push(new ListItem("Pride", "TODO"));
  this.rootList.push(new ListItem("Ignorance", "TODO"));

})

.run(function($ionicPlatform) {
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
