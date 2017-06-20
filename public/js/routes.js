angular.module('myApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
$urlRouterProvider.otherwise("/");

    $stateProvider
    .state('main',  {
        url: '/',
        abstract: true,
        defaultChild: 'main.home',
        views: {
            'header' : {
                templateUrl: '../views/header.html',
                controller: 'headerController'
            }
        }
    })
    .state('main.home', {
        url: '',
        views: {
            'container@' : {
                templateUrl: '../views/home.html',
                controller: 'mainController'
            }
        }
    })
    .state('main.login', {
        url: '/login',
        views: {
            'container@' : {
                templateUrl: '../views/login.html',
                controller: 'loginController'
            }
        }
    })

    .state('main.create', {
        url: 'create',
        views: {
            'container@' : {
                templateUrl: '../views/create.html',
                controller: 'createController'
            }
        }
    })

    .state('main.event', {
        url: 'event/:eventId',
        views: {
            'container@' : {
                templateUrl: '../views/event.html',
                controller: 'eventController'
            }
        }
    });

    // $locationProvider.html5Mode(true);
}]);
