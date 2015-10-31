angular.module('eventsService', ['routerRoutes'])

.factory('Events', function($http) {

    var myFactory = {};

    myFactory.all = function() {
        return $http.get('/events');
    };

    myFactory.get = function(id) {
    	return $http.get('/events/' + id);
    };

    myFactory.create = function(newEvent) {
    	return $http.post('/events', newEvent).success(function() {
            return $location.path('/');
        }) ;
    };

    return myFactory;

});
