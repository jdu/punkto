'use strict';

/**
 * @ngdoc overview
 * @name Punkto
 * @description
 * # GridModule
 *
 * Map module of the application.
 */

angular
  .module('PunktoCtrl', ['GridCtrl', 'MapCtrl', 'locationData'])
  .controller('PunktoCtrl', ['$scope', '$http', '$filter', 'locationData', function ($scope, $http, $filter, locationData) {

    // Logic that deals with things like rendering a header, etc.. will go here.
    // Map and Grid components are siloed to their own Controllers and share the locationData service between them in order to
    // allow for a single data set to be used.

  }])
;
