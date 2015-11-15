angular.module('myApp').controller('eventController', [$scope, Events, $stateParams, function($scope, Events, $stateParams) {
    var vm = this;

    Events.get($stateParams.eventId)
        .success(function(data) {
            vm.event = data;
        });
}]);