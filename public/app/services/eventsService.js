angular.module('eventsService', ['routerRoutes'])

.factory('Events', function($http, $location) {

    var myFactory = {};

    myFactory.all = function() {
        return $http.get('/events');
    };

    myFactory.get = function(id) {
    	return $http.get('/events/' + id);
    };

    myFactory.create = function(newEvent) {
    	$http({
            method: 'POST',
            url: '/events',
            data: newEvent,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (data) {
                $location.path('/');
            });
    };

    return myFactory;

});
