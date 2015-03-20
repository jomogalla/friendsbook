(function(){
	'use strict';

	angular
		.module('app')
		.factory('Profile', Profile);

	Profile.$inject = ['$firebaseObject'];
	function Profile($firebaseObject){
		return function(userid){
			var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/people/" + userid);

      		return $firebaseObject(ref);
		}
	}
})();