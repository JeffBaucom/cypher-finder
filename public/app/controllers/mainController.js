angular.module('myApp', ['routerRoutes', 'ngMap', 'ui.bootstrap','ui.bootstrap.datetimepicker', 'ngTagsInput', 'eventsService', 'sharedService']).controller('mainController', function($scope, Events, sharedData) {
	$scope.$on('mapInitialized', function(evt, map) {
		$scope.map = map; // expose map object
	});

  Events.all()
      .success(function(data) {
          $scope.list = data;
      });

 	$scope.center = [37.853843, -122.278776];

  //$scope.filter()

	$scope.getCenter = function() {
		console.log($scope.map.getCenter());
        return {lat: $scope.map.getCenter().lat(), lng: $scope.map.getCenter().lng()}
    }

	$scope.passCenter = function() {
		sharedData.set($scope.getCenter());
	}

    $scope.enterPlace = function() {
        $scope.place = this.getPlace();
        $scope.placeLoc = $scope.place.geometry.location
        $scope.map.setCenter($scope.placeLoc);
    }

    $scope.showInfo = function(evt, id) {
        console.log(id);
        $scope.selectedMarker = $scope.list[id];
        $scope.showInfoWindow.apply(this, [evt, 'bar-info-window']);
    }
});