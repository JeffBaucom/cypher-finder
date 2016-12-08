angular.module('myApp').controller('createController', function($scope, $state, Events, Tags, sharedData) {

    $scope.markerPos = "(37.853843, -122.278776)";
    $scope.event = {
       startDate: null,
       startTime: null,
       endDate: null,
       endTime: null
    };
    
    $scope.stylesToAdd = [];
    $scope.kindsToAdd = [];

    $scope.$on('mapInitialized', function(evt, map) {
        $scope.map = map;
        $scope.centerObj = sharedData.get();
        console.log($scope.centerObj);
        if (Object.keys($scope.centerObj).length) {
            $scope.map.setCenter($scope.centerObj);
            
        } else {
            $scope.centerObj = $scope.map.getCenter();
        }
        $scope.center = [$scope.centerObj.lat , $scope.centerObj.lng];
        $scope.map.markers[0].setPosition($scope.centerObj);
        $scope.markerPos = $scope.map.getCenter().toString();
    });
    
    $scope.$on('$stateChangeSuccess', function () {
        $scope.styles = Tags.getStyles();
        $scope.kinds = Tags.getKinds();
    });

    

     $scope.loadStyles = function(query) {
        console.log()
        return $scope.styles;
     };
     
     $scope.loadKinds = function(query) {
        return $scope.kinds;
     };
    
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

    $scope.updatePos = function() {
        $scope.markerPos = $scope.map.markers[0].getPosition().toString();
        $scope.event.lat = $scope.map.markers[0].getPosition().lat();
        $scope.event.lng = $scope.map.markers[0].getPosition().lng();
    }

    $scope.postEvent = function() {
        var stylesArr = [];
        for (i = 0; i < $scope.event.styles.length; i++) {
            stylesArr[i] = $scope.event.styles[i].text;
            Tags.createStyle({text: $scope.event.styles[i].text});
        }
        var kindArr = [];
        for (i = 0; i < $scope.event.kind.length; i++) {
            kindArr[i] = $scope.event.kind[i].text;
            Tags.createKind({text: $scope.event.styles[i].text});
        }
        $scope.event.styles = stylesArr;
        $scope.event.kind = kindArr;
        $scope.event.start = $scope.event.startTime;
        $scope.event.end = $scope.event.endTime;
        $scope.event.lat = $scope.map.markers[0].getPosition().lat();
        $scope.event.lng = $scope.map.markers[0].getPosition().lng();
        timeSplice($scope.event, function(time) {
          $scope.event.start = time;
          //alert($scope.event.start);
          Events.create($scope.event);
        });
        $state.go('main');
    };

    $scope.enterPlace = function() {
        $scope.place = this.getPlace();
        $scope.placeLoc = $scope.place.geometry.location
        console.log($scope.placeLoc.lat());
        console.log($scope.placeLoc.lng());
        $scope.map.setCenter($scope.placeLoc);
        $scope.map.markers[0].setPosition($scope.placeLoc);
        $scope.center = [$scope.placeLoc.lat(), $scope.placeLoc.lng()];
        console.log($scope.map.markers[0].getPosition().toString());
        if (!$scope.map.markers[0].getPosition().equals($scope.placeLoc)) {
            for (var i = 0; i < $scope.map.markers.length; i++) {
                $scope.map.markers[i].setPosition($scope.placeLoc);
            }
            $scope.event.lat = $scope.placeLoc.lat();
            $scope.event.lng = $scope.placeLoc.lng();
        } else {
            $scope.event.lat = $scope.map.markers[0].getPosition().lat();
            $scope.event.lng = $scope.map.markers[0].getPosition().lng();
        }
    }
    
    // $scope.filterNewTags = function (newStyles, newKinds) {
    //     var bool = false;
    //     console.log(newStyles);
    //     console.log(newKinds);
    //     for (var i = 0; i < newStyles.length; i++) {
    //         for (var j = 0; j < $scope.styles.length; j++) {
    //             if (newStyles[i].text == $scope.styles[j].text) {
    //                 bool = true;
    //             }
    //         }
    //         if (!bool) {
    //             $scope.stylesToAdd.push({text: newStyles[i]});
    //         }
    //         bool = false;
    //     }
    //     for (var i = 0; i < newKinds.length; i++) {
    //         for (var j = 0; j < $scope.kinds.length; j++) {
    //             if (newKinds[i].text == $scope.kinds[j].text) {
    //                 bool = true;
    //             }
    //         }
    //         if (!bool) {
    //             $scope.kindsToAdd.push({text: newKinds[i]});
    //         }
    //         bool = false;
    //     }
    // };
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
};

