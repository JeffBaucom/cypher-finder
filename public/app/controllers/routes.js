angular.module('routerRoutes', ['ngRoute'])

// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
    	templateUrl: 'app/views/pages/home.html',
    	controller: 'mainController',
    	controllerAs: 'main'
    })

    .when('/create', {
        templateUrl: 'app/views/pages/create.html',
        controller: 'createController',
        controllerAs: 'create'
    })

    .when('/event', {
        templateUrl: 'app/views/pages/event.html',
        controller: 'eventController',
        controllerAs: 'event'
    });

    $locationProvider.html5Mode(true);
});
