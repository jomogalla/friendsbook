(function(){
	'use strict';

	angular
		.module('app')
		.factory('Groups', Groups);

	Groups.$inject = ['$firebaseArray', '$rootScope', 'Auth'];
	function Groups($firebaseArray, $rootScope, Auth){
		var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/groups");
		return $firebaseArray(ref);
	}

})();