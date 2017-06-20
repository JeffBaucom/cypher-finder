//ngMap dependency for Angular maps directives
angular.module('myApp', 
	[ 
	'ui.router',
	'ngMap',
	'ngMaterial',
	'ui.bootstrap',
	'ui.bootstrap.datetimepicker',
	'ngTagsInput'
	]);

angular.module('myApp')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('indigo');
})
.constant("moment", moment)

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);