(function(){
	'use strict';

	angular
		.module('app')
		.factory('Members', Members);

	Members.$inject = ['$firebaseObject'];
	function Members($firebaseObject){
		var ref = new Firebase("https://blistering-torch-1950.firebaseio.com/members");

		var Members = {
			// DONE
			$everyone: function(groupKey){
				return $firebaseObject(ref.child(groupKey));
			},
			$add: function(groupKey, uid){
				return ref.child(groupKey).child(uid).set(false);
			},
			// REMOVE THEM COMPLETELLLYL, not just falsifying them
			$remove: function(groupKey, uid){
				return ref.child(groupKey).child(uid).set(false);
			},
		}
		return Members;
	}
})();