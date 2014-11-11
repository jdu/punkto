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
  .module('GridCtrl', [
    'locationData',
    'ui.grid'
  ])
  .controller('GridCtrl', ['$scope', 'locationData', function ($scope, locationData) {

    // App main
    $scope.filters = {
      "uuid": null,
      "countryname": null,
      name: null
    }

    $scope.data = locationData.data;

    // Set grid height
    $scope.gridOptions = {
      enableFiltering: true,
      data: $scope.data,
      columnDefs: [
        {
          field: 'properties.uuid',
          filter: {
            term: $scope.filters.uuid,
            condition: function (searchTerm, cellValue) {
              return true;
            }
          }
        },
        {
          field: 'properties.countryname',
          filter: {
            term: $scope.filters.countryname,
            condition: function (searchTerm, cellValue) {
              return true;
            }
          }
        },
        {
          field: 'properties.name',
          filter: {
            term: $scope.filters.name,
            condition: function (searchTerm, cellValue) {
              return true;
            }
          }
        }
      ],
      onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;

        $scope.gridApi.core.on.filterChanged($scope, function () {
          angular.forEach(this.grid.columns, function (column) {
            locationData.setFilter(column.field, column.filters[0].term);
          });

          $scope.gridOptions.data = locationData.data;
        });

      }
    };

  }]);
