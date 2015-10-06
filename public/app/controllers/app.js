//ngMap dependency for Angular maps directives
angular.module('myApp', ['routerRoutes', 'ngMap', 'ui.bootstrap.datetimepicker', 'ngTagsInput', 'eventsService', 'sharedService'])

.controller('mainController', function($scope, Events, sharedData) {
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
})

.controller('createController', function($scope, Events, sharedData) {
    var vm = this;
    vm.markerPos = "(37.853843, -122.278776)"
    vm.event = {};

    $scope.$on('mapInitialized', function(evt, map) {
        vm.map = map;
        vm.centerObj = sharedData.get();
        console.log(vm.centerObj);
        if (Object.keys(vm.centerObj).length) {
            vm.map.setCenter(vm.centerObj);
            
        } else {
            vm.centerObj = vm.map.getCenter();
        }
        vm.center = [vm.centerObj.lat , vm.centerObj.lng];
        vm.map.markers[0].setPosition(vm.centerObj);
        vm.markerPos = vm.map.getCenter().toString();
    });

    vm.updatePos = function() {
        vm.markerPos = vm.map.markers[0].getPosition().toString();
        vm.event.lat = vm.map.markers[0].getPosition().lat();
        vm.event.lng = vm.map.markers[0].getPosition().lng();
    }

    vm.postEvent = function() {
        var stylesArr = [];
        for (i = 0; i < vm.event.styles.length; i++) {
            stylesArr[i] = vm.event.styles[i].text;
        }
        var kindArr = [];
        for (i = 0; i < vm.event.kind.length; i++) {
            kindArr[i] = vm.event.kind[i].text;
        }
        vm.event.styles = stylesArr;
        vm.event.kind = kindArr;
        vm.event.lat = vm.map.markers[0].getPosition().lat();
        vm.event.lng = vm.map.markers[0].getPosition().lng();
        console.log(vm.event);
        Events.create(vm.event);
    }

    vm.enterPlace = function() {
        vm.place = this.getPlace();
        vm.placeLoc = vm.place.geometry.location
        vm.map.setCenter(vm.placeLoc);
        vm.map.markers[0].setPosition(vm.placeLoc);
        vm.center = [vm.placeLoc.lat, vm.placeLoc.lng];
        console.log(vm.map.markers[0].getPosition().toString());
        vm.event.lat = vm.map.markers[0].getPosition().lat();
        vm.event.lng = vm.map.markers[0].getPosition().lng();
    }
});
