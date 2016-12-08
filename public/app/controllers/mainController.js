angular.module('myApp').controller('mainController', function($scope, Events, sharedData) {
	$scope.$on('mapInitialized', function(evt, map) {
		$scope.map = map; // expose map object
    $scope.locateUser();
	});

  // Events.all()
  //     .success(function(data) {
  //         $scope.events = data;
  //     });

  var calculateDistance = function(bounds) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2Rad(bounds.west-bounds.east);  // deg2Rad below
    var dLon = deg2Rad(bounds.south-bounds.north); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2Rad(bounds.east)) * Math.cos(deg2Rad(bounds.west)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d*500;

    function deg2Rad(deg) {
      return deg * (Math.PI/180);
    }
  };

  $scope.locateUser = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        $scope.$apply(function(){
          $scope.center = [position.coords.latitude, position.coords.longitude];
        });
        if (!position) {
          $scope.center = [37.853843, -122.278776];
        }
      });
    } else {
      $scope.center = [37.853843, -122.278776];
    }
  };

  $scope.mapDragged = function() {
    distance = calculateDistance($scope.map.getBounds().toJSON());
    console.log(distance)
    Events.lookup({lat: $scope.map.getCenter().lat(), lon: $scope.map.getCenter().lng(), radius: distance})
      .then(function(data) {
        console.log(data);
      $scope.events = data;
    });
  };
    

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
        $scope.placeLoc = $scope.place.geometry.location;
        $scope.map.setCenter($scope.placeLoc);
    }

    $scope.showInfo = function(evt, id) {
        console.log(id);
        $scope.selectedMarker = $scope.events[id];
        $scope.showInfoWindow.apply(this, [evt, 'bar-info-window']);
    }
});