angular.module('routerRoutes', ['ui.router'])

// configure our routes
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
        url: '/',
    	templateUrl: 'app/views/pages/home.html',
    	controller: 'mainController',
    	controllerAs: 'main'
    })

    .state('create', {
        url: '/create',
        templateUrl: 'app/views/pages/create.html',
        controller: 'createController',
        controllerAs: 'create'
    })

    .state('event', {
        url: '/event/:eventId',
        templateUrl: 'app/views/pages/event.html',
        controller: 'eventController',
        controllerAs: 'event'
    });

    $locationProvider.html5Mode(true);
});
