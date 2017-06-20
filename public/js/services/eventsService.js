angular.module('myApp')
    .factory('Events', Events);
    Events.$inject = ['$http', '$location'];

    function Events($http, $location) {

        var myFactory = {};

        myFactory.all = function() {
            return $http.get('/events');
        };

        myFactory.get = function(id) {
        	return $http.get('/events/' + id);
        };

        myFactory.create = function(newEvent) {
        	return $http({
                method: 'POST',
                url: '/events',
                data: newEvent,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function (response) {
                    return response.data;
                });
        };

        myFactory.lookup = function(coords) {
            return $http({
                method: 'POST',
                url: '/events/lookup',
                data: coords,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                    }
                }).then(function successCallback(response) {
                    console.log(response.data);
                    return response.data;
                });
            };

        return myFactory;

};
