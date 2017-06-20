angular.module('myApp')
    .factory('sharedData', sharedData);
    sharedData.$inject = ['$http', '$location'];
function sharedData() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

};
