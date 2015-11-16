angular.module('myApp').controller('createController', function($scope, Events, sharedData) {
    var vm = this;
    vm.markerPos = "(37.853843, -122.278776)"
    vm.event = {
       startDate: null,
       startTime: null,
       endDate: null,
       endTime: null
    };

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
    
    $scope.status = {
        opened: false,
        opened2: false
    };

    $scope.open = function($event) {
        $scope.status.opened = true;
    }
    $scope.open2 = function($event) {
        $scope.status.opened2 = true;
    }

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    }

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
        vm.event.start = vm.event.startTime;
        vm.event.end = vm.event.endTime;
        vm.event.lat = vm.map.markers[0].getPosition().lat();
        vm.event.lng = vm.map.markers[0].getPosition().lng();
        timeSplice(vm.event, function(time) {
          vm.event.start = time;
          alert(vm.event.start);
          Events.create(vm.event);
        });
        console.log("returned");
    }

    vm.enterPlace = function() {
        vm.place = this.getPlace();
        vm.placeLoc = vm.place.geometry.location
        console.log(vm.placeLoc.lat());
        console.log(vm.placeLoc.lng());
        vm.map.setCenter(vm.placeLoc);
        vm.map.markers[0].setPosition(vm.placeLoc);
        vm.center = [vm.placeLoc.lat(), vm.placeLoc.lng()];
        console.log(vm.map.markers[0].getPosition().toString());
        if (!vm.map.markers[0].getPosition().equals(vm.placeLoc)) {
            for (i = 0; i < vm.map.markers.length; i++) {
                vm.map.markers[i].setPosition(vm.placeLoc);
            }
            vm.event.lat = vm.placeLoc.lat();
            vm.event.lng = vm.placeLoc.lng();
        } else {
            vm.event.lat = vm.map.markers[0].getPosition().lat();
            vm.event.lng = vm.map.markers[0].getPosition().lng();
        }
    }
});

function timeSplice(eventObj, cb) {
  var t = eventObj.startTime;
  var d = eventObj.startDate;
  
  var time = "";
  
  var arrTime = t.toISOString().split('T');
  var arrDate = d.toISOString().split('T');
  
  time = arrDate[0] + "T" + arrTime[1];
  
  if (time != "") {
    cb(time);
  }
}
