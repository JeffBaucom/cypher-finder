angular.module('myApp').controller('eventController', function($scope, Events, $stateParams, moment) {

    Events.get($stateParams.eventId)
        .then(function(response) {
            $scope.event = response.data;
            $scope.event.start = moment(response.data.start).format("dddd, MMMM Do YYYY, h:mm a zz");
            $scope.event.end = moment(response.data.end).format("dddd, MMMM Do YYYY, h:mm a zz");
        }, function(err) {
        	console.log(err);
        });
});