angular.module('myApp', ['routerRoutes', 'ngMap', 'ui.bootstrap','ui.bootstrap.datetimepicker', 'ngTagsInput', 'eventsService', 'sharedService']).controller('mainController', function($scope, Events, sharedData) {
	var vm = this;

	$scope.$on('mapInitialized', function(evt, map) {
		vm.map = map; // expose map object
	});

    Events.all()
        .success(function(data) {
            vm.list = data;
        });

   	vm.center = [37.853843, -122.278776];


	vm.getCenter = function() {
		console.log(vm.map.getCenter());
        return {lat: vm.map.getCenter().lat(), lng: vm.map.getCenter().lng()}
    }

	vm.passCenter = function() {
		sharedData.set(vm.getCenter());
	}

    vm.enterPlace = function() {
        vm.place = this.getPlace();
        vm.placeLoc = vm.place.geometry.location
        vm.map.setCenter(vm.placeLoc);
    }

    vm.showInfo = function(evt, id) {
        console.log(id);
        vm.selectedMarker = vm.list[id];
        $scope.showInfoWindow.apply(this, [evt, 'bar-info-window']);
    }
});