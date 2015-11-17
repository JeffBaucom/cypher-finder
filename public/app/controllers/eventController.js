angular.module('myApp').controller('eventController', function($scope, Events, $stateParams) {

    Events.get($stateParams.eventId)
        .success(function(data) {
            $scope.event = data;
        });
});