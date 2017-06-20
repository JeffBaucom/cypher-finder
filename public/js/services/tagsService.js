angular.module('myApp')
    .factory('Tags', Tags);
    Tags.$inject = ['$http', '$location'];
function Tags($http, $location) {

    var myFactory = {};

    myFactory.getStyles = function() {
        return $http.get('/tags/styles');
    };
    
    myFactory.getKinds = function() {
        return $http.get('/tags/kinds');
    };

    myFactory.createStyle = function(newStyle) {
    	$http({
            method: 'POST',
            url: '/tags/styles',
            data: newStyle,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
                }
            });
    };
    
        myFactory.createKind = function(newKind) {
    	$http({
            method: 'POST',
            url: '/tags/kinds',
            data: newKind,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
                }
            });
    };

    return myFactory;

};