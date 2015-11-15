angular.module('myApp').controller('eventController', function($scope, Events, $stateParams) {
    var vm = this;

    Events.get($stateParams.eventId)
        .success(function(data) {
            vm.event = data;
        });
});