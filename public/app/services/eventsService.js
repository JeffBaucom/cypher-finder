angular.module('eventsService', [])

.factory('Events', function($http) {

    var myFactory = {};

    myFactory.all = function() {
        return $http.get('/events');
    };

    myFactory.get = function(id) {
    	return $http.get('/events/' + id);
    };

    myFactory.create = function(newEvent) {
    	return $http.post('/events', newEvent);
    };

    return myFactory;

});
