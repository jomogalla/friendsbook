(function(){
	'use strict';

	angular
		.module('app')
		.factory('Relationships', Relationships);

	Relationships.$inject = ['$firebaseArray'];
	function Relationships($firebaseArray){
		var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/relationships");
		return $firebaseArray(ref);
	}

})();