(function(){
	'use strict';

	angular
		.module('app')
		.factory('People', People);

	People.$inject = ['$firebaseObject', '$rootScope', 'Auth'];
	function People($firebaseObject, $rootScope, Auth){
		var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/people");
		return $firebaseObject(ref);
	}

})();