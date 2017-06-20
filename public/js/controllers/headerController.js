(function() {
	'use strict';

	angular.module('myApp')
		.controller('headerController', headerController);

		headerController.$inject = ['$scope'];

		function headerController($scope) {
			$scope.currentNavItem = '';
		}
})();