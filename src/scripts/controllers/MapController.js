'use strict';

/**
 * @ngdoc overview
 * @name Punkto
 * @description
 * # MapModule
 *
 * Map module of the application.
 */

angular
  .module('MapCtrl', [
    'leaflet-directive',
    'locationData'
  ])
  .directive('leaflet', function () {
    return function (scope, element, attrs) {
      attrs.height = window.innerHeight;
    }
  })
  .controller('MapCtrl', ['$scope', 'leafletData', 'locationData', '$timeout', function ($scope, leaflet, locationData, $timeout) {


    $scope.markers = locationData.markers;

    // Defaults
    angular.extend($scope, {
      defaults: {
        minZoom: 4,
        zoomControl: false,
        scrollWheelZoom: false
      },
      center: {
        lat: 0,
        lng: 0,
        zoom: 3
      },
      events: {
        map: {
          enable: ['zoomend'],
          logic: 'emit'
        }
      },
      layers: {
        baselayers: {
          osm: {
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
          }
        },
        overlays: {
          locations: {
            name: 'Locations',
            type: 'group',
            visible: true
          }
        }
      }
    });

    /**
     * Integrates changes to the locationData service into the map control
     */
    $scope.$watchCollection(locationData.getMarkers, function () {
      $scope.markers = locationData.getMarkers();

      // This needs to be delayed so it doesn;t swamp the UI with
      // too many painting events and bog the browser down.
      if ($scope.markers.length > 1) {
        leaflet.getMap().then(function (map) {
          map.fitBounds(getBounds($scope.markers));
        });
      } else if ($scope.markers.length == 1) {
        leaflet.getMap().then(function (map) {
          map.setView([$scope.markers[0].lat, $scope.markers[0].lng], 10);
        });
      }
    });

    /**
     * Get the bounding box for a given group of locations
     * @param markers
     * @returns {L.LatLngBounds}
     */
    var getBounds = function (markers) {
      var latlngs = [];

      angular.forEach(markers, function (m) {
        this.push([m.lat, m.lng]);
      }, latlngs);

      return new L.LatLngBounds(latlngs);
    };

    // Add zoom control to bottom left
    leaflet.getMap().then(function (map) {
      new L.Control.Zoom({position: 'bottomright'}).addTo(map);
    });

  }]);
