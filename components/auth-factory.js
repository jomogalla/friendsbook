(function(){
	'use strict';

	angular
		.module('app')
		.factory('Auth', Auth);

	Auth.$inject = ["$firebaseAuth"];
	function Auth($firebaseAuth){
		var ref = new Firebase("https://blistering-torch-1950.firebaseio.com");
		return $firebaseAuth(ref);
	}
})();