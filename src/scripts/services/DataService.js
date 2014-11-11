'use strict';

angular.module('locationData', ['ngResource'])
  .factory('locationData', ['$resource', '$http', function ($resource, $http) {

    /**
     * @property __data {array} Unmodified source data
     * @property data {array} Contains the raw data as retrieved from the API
     * @property filters {obj} key/value storage of currently applied filters
     * @property markers {array} Cache of data converted to leaflet marker format
     */


    var __data__ = [];
    var data = [];
    var markers = [];

    var filters = {};

    /**
     * Private method that's used recursively to apply filtering to a set of data
     * @param data {array} the data to filter
     * @param key {string} the key to filter on
     * @param value {string} The value to filter on
     */
    var filterData = function (sourceData, key, value) {
      var newData = [];

      angular.forEach(sourceData, function (dataItem) {

        var ps = key.split("."),
          tmpPath = dataItem;

        for (var i = 0; i < ps.length; i++) {
          if (tmpPath) {
            if (tmpPath[ps[i]] !== undefined && tmpPath[ps[i]] !== null) {
              tmpPath = tmpPath[ps[i]];
            } else {
              tmpPath = null;
            }
          } else {
            tmpPath = null;
          }
        }

        if (tmpPath) {
          if (tmpPath.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
            newData.push(dataItem);
          }
        }
      }, this);

      return newData;
    };

    /**
     * Sets a filter against the data collection
     * @param key
     * @param value
     */
    var setFilter = function (key, value) {

      if (value === null || value === undefined || value === "") {
        if (filters[key]) {
          delete filters[key];
        }
      } else {
        filters[key] = value;
      }

      var filteredData = [];
      angular.copy(__data__, filteredData);

      angular.forEach(filters, function (filterTerm, filterKey) {
        filteredData = filterData(filteredData, filterKey, filterTerm);
      }, this);

      if (!angular.equals(this.data, filteredData)) {
        angular.copy(filteredData, this.data);
        this.updateMarkers();
      }
    };

    /**
     * rebuilds the markers data set
     */
    var updateMarkers = function () {

      var tmpMarkers = [];
      angular.forEach(this.data, function (location) {
        if (location.geometry.coordinates[0] !== 0
          && location.geometry.coordinates[1] !== 0
          && location.properties.countryname) {

          // Format popup string
          var type = '';
          var iconType = location.properties.map_icon.replace('.png', '').split('-');
          angular.forEach(iconType, function (t, j) {
            type += t.charAt(0).toUpperCase() + t.slice(1) + ' ';
          });

          var popup = '<div align="left"><b>' + location.properties.countryname + '</b>';
          popup += '<br/>Location: ' + location.properties.name;
          popup += '<br/>Type: ' + type.slice(0, -1) + '</div>';

          // Push onto array of markers
          tmpMarkers.push({
            layer: 'locations',
            uuid: location.properties.uuid,
            countryname: location.properties.countryname,
            name: location.properties.name,
            geolevel: location.properties.geolevel,
            lng: location.geometry.coordinates[0],
            lat: location.geometry.coordinates[1],
            message: popup,
            focus: false,
            icon: {
              iconSize: [18, 18],
              iconUrl: 'assets/icons/' + location.properties.map_icon
            }
          });
        }
      });

      angular.copy(tmpMarkers, this.markers);
    };

    /**
     * Retrieves the currently applied filters
     * @returns {*}
     */
    var getFilters = function () {
      return filters;
    };

    /**
     * This section will eventually be replaced with logic to handle interacting with a concrete service
     * or WebSockets interface
     */

    $resource('data/geolevels.json', {}, {
      'get': {
        method: 'GET',
        isArray: true
      }
    }).get({}, function (responseData) {
      angular.copy(responseData, __data__);
      angular.copy(responseData, data);
      updateMarkers.apply({
        setFilter: setFilter,
        getFilters: getFilters,
        markers: markers,
        data: data,
        __data__: __data__,
        updateMarkers: updateMarkers,
        getData: getData,
        getMarkers: getMarkers
      });
    });

    /**
     * data accessor, required in order to watch for changes in data
     * @returns {Array}
     */
    var getData = function () {
      return data;
    };

    /**
     * Markers accessor, required in order to watch for changes in markers collection
     * @returns {Array}
     */
    var getMarkers = function () {
      return markers;
    };

    // Returns a singleton object for use by the different view components
    return {
      setFilter: setFilter,
      getFilters: getFilters,
      markers: markers,
      data: data,
      __data__: __data__,
      updateMarkers: updateMarkers,
      getData: getData,
      getMarkers: getMarkers
    };

  }]);
